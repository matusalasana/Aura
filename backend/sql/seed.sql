-- Seed script wrapped in a transaction for safety
BEGIN;

WITH inserted_users AS (
  INSERT INTO users (first_name, last_name, email, password, role, currency)
  VALUES 
    -- Vendors (Owner IDs)
    ('Abebe', 'Bekele', 'abebe@store.com', '$2b$10$xyz...hashedpassword...', 'VENDOR', 'ETB'),
    ('Sara', 'Tesfaye', 'sara@boutique.com', '$2b$10$xyz...hashedpassword...', 'VENDOR', 'ETB'),
    -- Customers
    ('John', 'Doe', 'john@example.com', '$2b$10$xyz...hashedpassword...', 'CUSTOMER', 'ETB'),
    ('Elena', 'Russo', 'elena@example.com', '$2b$10$xyz...hashedpassword...', 'CUSTOMER', 'USD')
  RETURNING id, email
),

inserted_vendors AS (
  INSERT INTO vendors (store_name, description, logo, banner, owner_id)
  VALUES 
    (
      'Habesha Tech & Goods', 
      'Your one-stop shop for local tech accessories and goods.', 
      'https://api.dicebear.com/7.x/initials/svg?seed=HT', 
      'https://images.unsplash.com/photo-1468436139062-f60a71c5c892', 
      (SELECT id FROM inserted_users WHERE email = 'abebe@store.com')
    ),
    (
      'Sara Traditional Fashion', 
      'Authentic cultural clothing and modern adaptations.', 
      'https://api.dicebear.com/7.x/initials/svg?seed=SF', 
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8', 
      (SELECT id FROM inserted_users WHERE email = 'sara@boutique.com')
    )
  RETURNING id, store_name
),

inserted_categories AS (
  INSERT INTO categories (name, image_url)
  VALUES 
    ('Electronics', 'https://images.unsplash.com/photo-1498049794561-7780e7231661'),
    ('Clothing & Apparel', 'https://images.unsplash.com/photo-1483985988355-763728e1935b'),
    ('Home & Living', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a')
  RETURNING id, name
),

inserted_products AS (
  INSERT INTO products (title, description, price, stock, vendor_id, category_id, sizes, colors, images)
  VALUES 
    -- Tech Vendor Products
    (
      'Wireless Ergonomic Mouse', 
      'High precision 2.4G wireless mouse with adjustable DPI.', 
      1200.00, 
      45, 
      (SELECT id FROM inserted_vendors WHERE store_name = 'Habesha Tech & Goods'),
      (SELECT id FROM inserted_categories WHERE name = 'Electronics'),
      '{}', 
      '{"Black", "Space Gray"}', 
      '{"https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"}'
    ),
    (
      'Mechanical Gaming Keyboard', 
      'RGB Backlit mechanical keyboard with blue switches.', 
      3500.00, 
      12, 
      (SELECT id FROM inserted_vendors WHERE store_name = 'Habesha Tech & Goods'),
      (SELECT id FROM inserted_categories WHERE name = 'Electronics'),
      '{}', 
      '{"Black"}', 
      '{"https://images.unsplash.com/photo-1587829741301-dc798b83add3"}'
    ),
    -- Fashion Vendor Products
    (
      'Traditional Habesha Kemis', 
      'Handwoven elegant cultural dress with unique tilet patterns.', 
      8500.00, 
      5, 
      (SELECT id FROM inserted_vendors WHERE store_name = 'Sara Traditional Fashion'),
      (SELECT id FROM inserted_categories WHERE name = 'Clothing & Apparel'),
      '{"M", "L", "XL"}', 
      '{"White/Gold", "White/Blue"}', 
      '{"https://images.unsplash.com/photo-1542291026-7eec264c27ff"}'
    )
  RETURNING id, title, price, vendor_id
),

inserted_carts AS (
  INSERT INTO carts (user_id)
  VALUES 
    ((SELECT id FROM inserted_users WHERE email = 'john@example.com')),
    ((SELECT id FROM inserted_users WHERE email = 'elena@example.com'))
  RETURNING id, user_id
),

inserted_cart_items AS (
  INSERT INTO cart_items (cart_id, product_id, quantity, size, color)
  VALUES 
    (
      (SELECT id FROM inserted_carts WHERE user_id = (SELECT id FROM inserted_users WHERE email = 'john@example.com')),
      (SELECT id FROM inserted_products WHERE title = 'Wireless Ergonomic Mouse'),
      1,
      NULL,
      'Space Gray'
    ),
    (
      (SELECT id FROM inserted_carts WHERE user_id = (SELECT id FROM inserted_users WHERE email = 'john@example.com')),
      (SELECT id FROM inserted_products WHERE title = 'Mechanical Gaming Keyboard'),
      1,
      NULL,
      'Black'
    )
),

inserted_orders AS (
  INSERT INTO orders (order_number, user_id, total_amount, status, shipping_address)
  VALUES 
    (
      'ORD-2026-0001', 
      (SELECT id FROM inserted_users WHERE email = 'elena@example.com'), 
      8500.00, 
      'COMPLETED', 
      '123 Bole Road, Addis Ababa, Ethiopia'
    )
  RETURNING id, user_id
)

INSERT INTO order_items (order_id, product_id, vendor_id, quantity, price, size, color)
VALUES 
  (
    (SELECT id FROM inserted_orders LIMIT 1),
    (SELECT id FROM inserted_products WHERE title = 'Traditional Habesha Kemis'),
    (SELECT vendor_id FROM inserted_products WHERE title = 'Traditional Habesha Kemis'),
    1,
    8500.00,
    'M',
    'White/Gold'
  );

-- Separate insertion for Reviews to ensure products/users are fully committed in the chain
INSERT INTO reviews (user_id, product_id, rating, comment)
VALUES 
  (
    (SELECT id FROM users WHERE email = 'elena@example.com'),
    (SELECT id FROM products WHERE title = 'Traditional Habesha Kemis'),
    5,
    'Absolutely stunning dress! The stitching and detail on the tilet are incredible.'
  );

COMMIT;
