const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const seedProducts = [
  {
    name: 'Nike Air Max 90',
    description: 'Classic and timeless Nike Air Max 90 with premium comfort and style.',
    category: 'men',
    price: 129.99,
    discount: 10,
    sku: 'NIKE-AM90-001',
    sizes: [
      { size: '7', stock: 10 },
      { size: '8', stock: 15 },
      { size: '9', stock: 20 },
      { size: '10', stock: 18 },
      { size: '11', stock: 12 },
      { size: '12', stock: 8 },
    ],
    colors: ['White', 'Black', 'Blue', 'Red'],
    rating: 4.8,
    featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        alt: 'Nike Air Max 90 Front',
      },
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        alt: 'Nike Air Max 90 Side',
      },
    ],
    tags: ['running', 'casual', 'classic'],
  },
  {
    name: 'Nike Zoom Pegasus',
    description: 'Responsive cushioning and a lightweight feel for everyday running.',
    category: 'men',
    price: 99.99,
    discount: 15,
    sku: 'NIKE-ZP-001',
    sizes: [
      { size: '7', stock: 12 },
      { size: '8', stock: 14 },
      { size: '9', stock: 18 },
      { size: '10', stock: 16 },
      { size: '11', stock: 10 },
      { size: '12', stock: 6 },
    ],
    colors: ['Black', 'White', 'Gray'],
    rating: 4.6,
    featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        alt: 'Nike Zoom Pegasus Front',
      },
    ],
    tags: ['running', 'performance'],
  },
  {
    name: 'Nike Revolution 6',
    description: 'Lightweight cushioning that lasts. An effortless everyday shoe.',
    category: 'kids',
    price: 59.99,
    discount: 20,
    sku: 'NIKE-REV6-001',
    sizes: [
      { size: '1', stock: 8 },
      { size: '2', stock: 10 },
      { size: '3', stock: 12 },
      { size: '4', stock: 11 },
      { size: '5', stock: 9 },
    ],
    colors: ['White', 'Pink', 'Blue'],
    rating: 4.4,
    featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        alt: 'Nike Revolution 6',
      },
    ],
    tags: ['kids', 'casual', 'comfortable'],
  },
  {
    name: 'Nike Court Legacy',
    description: 'Tennis-inspired design with modern comfort technology.',
    category: 'women',
    price: 89.99,
    discount: 0,
    sku: 'NIKE-CL-001',
    sizes: [
      { size: '5', stock: 9 },
      { size: '6', stock: 14 },
      { size: '7', stock: 16 },
      { size: '8', stock: 12 },
      { size: '9', stock: 8 },
    ],
    colors: ['White', 'Black', 'Gold'],
    rating: 4.5,
    featured: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        alt: 'Nike Court Legacy',
      },
    ],
    tags: ['women', 'tennis', 'stylish'],
  },
  {
    name: 'Nike Dri-FIT T-Shirt',
    description: 'Breathable and sweat-wicking performance T-shirt for active lifestyles.',
    category: 'accessories',
    price: 29.99,
    discount: 25,
    sku: 'NIKE-DFT-001',
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 12 },
    ],
    colors: ['Black', 'White', 'Gray', 'Blue'],
    rating: 4.7,
    featured: false,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        alt: 'Nike Dri-FIT T-Shirt',
      },
    ],
    tags: ['accessories', 'apparel', 'performance'],
  },
  {
    name: 'Nike Therma Training Pants',
    description: 'Warm and supportive training pants with Nike Therma technology.',
    category: 'accessories',
    price: 79.99,
    discount: 10,
    sku: 'NIKE-TTP-001',
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 10 },
    ],
    colors: ['Black', 'Gray'],
    rating: 4.6,
    featured: false,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506629082632-401ba14e2e30?w=500',
        alt: 'Nike Therma Training Pants',
      },
    ],
    tags: ['accessories', 'apparel', 'training'],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nike-ecommerce');
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const created = await Product.insertMany(seedProducts);
    console.log(`✅ Seeded ${created.length} products`);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
