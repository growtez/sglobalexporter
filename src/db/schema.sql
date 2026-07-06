/*
==========================================================
Shahinur Global Exporter
Master Database Schema (Supabase/PostgreSQL)

Fully Idempotent & Safe to run multiple times.
Roles: Admin and Customer only.
No Activity Logging.
(Fixed: Proper Order of Operations)
==========================================================
*/

-- ==========================================
-- 1. CLEANUP (Removing unused/old features)
-- ==========================================
DROP FUNCTION IF EXISTS public.is_manager();
DROP TRIGGER IF EXISTS trg_log_products ON products;
DROP FUNCTION IF EXISTS public.log_activity_trigger();
DROP TABLE IF EXISTS activity_logs CASCADE;

-- ==========================================
-- 2. EXTENSIONS
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 3. ENUMS
-- ==========================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='order_status') THEN
        CREATE TYPE order_status AS ENUM ('pending','processing','shipped','delivered','cancelled');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='inquiry_status') THEN
        CREATE TYPE inquiry_status AS ENUM ('pending','reviewed','quoted','closed');
    END IF;
END $$;

-- ==========================================
-- 4. TABLES (Base Definitions MUST come before functions)
-- ==========================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS allowed_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY
);

-- ==========================================
-- 5. ALTER TABLES (Schema Evolution)
-- ==========================================

-- Profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS billing_address TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT timezone('utc', now());
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc', now());
ALTER TABLE profiles DROP COLUMN IF EXISTS role;

-- Allowed Users (Admin only)
ALTER TABLE allowed_users ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE allowed_users DROP CONSTRAINT IF EXISTS allowed_users_role_check;
ALTER TABLE allowed_users ADD CONSTRAINT allowed_users_role_check CHECK (role = 'admin');
ALTER TABLE allowed_users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE allowed_users ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
ALTER TABLE allowed_users ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

-- Products
ALTER TABLE products ADD COLUMN IF NOT EXISTS name TEXT NOT NULL DEFAULT 'Unnamed Product';
ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS origin TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS price_per_kg DECIMAL(10,2) NOT NULL DEFAULT 0.00;
ALTER TABLE products ADD COLUMN IF NOT EXISTS min_order_kg INTEGER DEFAULT 1;
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock_kg INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT timezone('utc', now());
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc', now());

-- Inquiries
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES products(id);
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS requested_kg INTEGER NOT NULL DEFAULT 1;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS destination_country TEXT NOT NULL DEFAULT 'Unknown';
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS status inquiry_status DEFAULT 'pending';
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT timezone('utc', now());

-- Orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES profiles(id) ON DELETE SET NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status order_status DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT UNIQUE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT UNIQUE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_address TEXT NOT NULL DEFAULT 'N/A';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT timezone('utc', now());

-- Order Items
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS order_id UUID REFERENCES orders(id) ON DELETE CASCADE;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES products(id);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS quantity_kg INTEGER NOT NULL DEFAULT 1;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS price_at_time DECIMAL(10,2) NOT NULL DEFAULT 0.00;

-- Site Settings
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS value JSONB;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- ==========================================
-- 6. FUNCTIONS (Now safely after tables)
-- ==========================================

-- Authorization Function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM allowed_users 
        WHERE user_id = auth.uid() AND role = 'admin' AND is_active = true
    );
$$;

-- Trigger Functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id)
    VALUES (NEW.id)
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

-- ==========================================
-- 7. INDEXES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_user_id ON inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_allowed_users_role ON allowed_users(role);

-- ==========================================
-- 8. TRIGGERS
-- ==========================================
DO $$ 
BEGIN
    -- Profiles Updated At
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='trg_profiles_updated_at') THEN
        CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Products Updated At
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='trg_products_updated_at') THEN
        CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON products
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Auth User Created
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname='on_auth_user_created') THEN
        CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    END IF;
END $$;

-- ==========================================
-- 9. ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE allowed_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 10. POLICIES
-- ==========================================

-- Clean up any residual manager policies if ran previously
DROP POLICY IF EXISTS "Managers manage products" ON products;
DROP POLICY IF EXISTS "Managers can view all inquiries" ON inquiries;
DROP POLICY IF EXISTS "Managers can view all orders" ON orders;

DO $$
BEGIN
    -- Profiles
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Users can view own profile') THEN
        CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Users can update own profile') THEN
        CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
    END IF;

    -- Allowed Users (Admins only)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admins manage allowed_users') THEN
        CREATE POLICY "Admins manage allowed_users" ON allowed_users FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Users can read own role') THEN
        CREATE POLICY "Users can read own role" ON allowed_users FOR SELECT USING (auth.uid() = user_id);
    END IF;

    -- Products
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Anyone can view active products') THEN
        CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admins manage products') THEN
        CREATE POLICY "Admins manage products" ON products FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
    END IF;

    -- Inquiries
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Users can manage own inquiries') THEN
        CREATE POLICY "Users can manage own inquiries" ON inquiries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admins can view all inquiries') THEN
        CREATE POLICY "Admins can view all inquiries" ON inquiries FOR SELECT USING (public.is_admin());
    END IF;

    -- Orders & Items
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Users can manage own orders') THEN
        CREATE POLICY "Users can manage own orders" ON orders FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Users can view own order items') THEN
        CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (order_id IN (SELECT id FROM orders WHERE user_id = auth.uid()));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admins can view all orders') THEN
        CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (public.is_admin());
    END IF;

END $$;

-- ==========================================
-- 11. SEED DATA (First Admin)
-- ==========================================
/*
To seed your first admin, uncomment the block below and replace the UUID 
with the actual auth.users.id of the account you registered via Supabase Auth.

INSERT INTO allowed_users (user_id, role, is_active)
VALUES ('00000000-0000-0000-0000-000000000000', 'admin', true)
ON CONFLICT (user_id) DO UPDATE 
SET role = 'admin', is_active = true;
*/

-- ==========================================
-- 12. STORAGE BUCKET & POLICIES (Supabase Storage)
-- ==========================================
/*
The following SQL sets up the 'product-images' storage bucket and its policies.
Note: You can also run this directly in the Supabase SQL Editor.
*/

-- 1. Create the bucket (requires storage schema privileges, standard in Supabase)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Drop existing policies to prevent conflicts if re-run
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete images" ON storage.objects;

-- 3. Create RLS Policies for Storage
-- Anyone can view product images (since bucket is public)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

-- Only authenticated admin users can upload new images
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'product-images'
    AND public.is_admin()
);

-- Only authenticated admin users can update existing images
CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'product-images'
    AND public.is_admin()
);

-- Only authenticated admin users can delete images
CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'product-images'
    AND public.is_admin()
);