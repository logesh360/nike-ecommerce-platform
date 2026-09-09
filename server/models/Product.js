const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['men', 'women', 'kids', 'accessories'],
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  originalPrice: Number,
  discount: {
    type: Number,
    default: 0
  },
  images: [{
    url: String,
    alt: String
  }],
  sizes: [{
    size: String,
    stock: Number
  }],
  colors: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: String,
    comment: String,
    rating: Number,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  sku: {
    type: String,
    unique: true,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  nikeProductId: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
