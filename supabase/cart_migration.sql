-- Create the cart_items table
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    name TEXT NOT NULL,
    price_per_kg NUMERIC NOT NULL,
    quantity_kg NUMERIC NOT NULL,
    image_url TEXT NOT NULL,
    slug TEXT,
    unit TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure a user can only have one row per product_id to prevent duplicates
    -- If they add the same product again, we just update the quantity
    UNIQUE(user_id, product_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own cart items
CREATE POLICY "Users can view their own cart items"
ON cart_items FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own cart items
CREATE POLICY "Users can insert their own cart items"
ON cart_items FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own cart items
CREATE POLICY "Users can update their own cart items"
ON cart_items FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own cart items
CREATE POLICY "Users can delete their own cart items"
ON cart_items FOR DELETE
USING (auth.uid() = user_id);
