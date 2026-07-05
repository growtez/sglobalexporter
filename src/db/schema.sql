-- Create custom ENUM types for statuses
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE inquiry_status AS ENUM ('pending', 'reviewed', 'quoted', 'closed');
CREATE TYPE user_role AS ENUM ('customer', 'admin');

-- 1. Profiles Table (Extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'customer',
  full_name TEXT,
  company_name TEXT,
  phone_number TEXT,
  billing_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  origin TEXT, -- e.g., 'Assam, India'
  category TEXT, -- e.g., 'Tea', 'Rice'
  price_per_kg DECIMAL(10, 2) NOT NULL,
  min_order_kg INTEGER DEFAULT 1,
  stock_kg INTEGER DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Inquiries Table (For B2B / Custom Quotes)
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  requested_kg INTEGER NOT NULL,
  destination_country TEXT NOT NULL,
  message TEXT,
  status inquiry_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Orders Table (For Direct Razorpay Checkouts)
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status order_status DEFAULT 'pending',
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT UNIQUE,
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Order Items Table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity_kg INTEGER NOT NULL,
  price_at_time DECIMAL(10, 2) NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read/update their own profile.
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Products: Anyone can read active products. Admins can do anything (handled via Supabase service role or admin check).
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);

-- Inquiries: Users can create and view their own inquiries.
CREATE POLICY "Users can insert own inquiries" ON inquiries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own inquiries" ON inquiries FOR SELECT USING (auth.uid() = user_id);

-- Orders: Users can view their own orders.
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items: Users can view items attached to their own orders.
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
);