# Nike eCommerce Platform 🏀

A **full-stack Nike shoe brand eCommerce website** with real data integration, exclusive Nike-branded animations, and complete functionality.

🚀 **Live Preview**: [GitHub Repository](https://github.com/logesh360/nike-ecommerce-platform)

---

## ✨ Key Features

### 🛍️ Shopping Experience
- ✅ Browse Nike product catalog with filtering & search
- ✅ Detailed product pages with images, ratings, and reviews
- ✅ Dynamic shopping cart with real-time updates
- ✅ Size and color selection for each product
- ✅ Wishlist functionality
- ✅ Complete checkout process

### 💳 Payment & Orders
- ✅ Stripe payment integration
- ✅ Multiple payment methods (Credit Card, PayPal, Apple Pay)
- ✅ Order history and tracking
- ✅ Order status updates (pending → processing → shipped → delivered)
- ✅ Real-time inventory management

### 👤 User Management
- ✅ User registration & authentication with JWT
- ✅ Secure password hashing with bcryptjs
- ✅ User profile management
- ✅ Address and shipping information
- ✅ Order history
- ✅ Wishlist management

### 👨‍💼 Admin Dashboard
- ✅ Product management (Create, Read, Update, Delete)
- ✅ Inventory management
- ✅ Order management
- ✅ User management
- ✅ Sales analytics

### 🎨 Nike Brand Animations
- ✅ Hero section fade-in animations
- ✅ Product card hover effects with lift animations
- ✅ Image zoom effects on hover
- ✅ Smooth page transitions
- ✅ Staggered content reveals
- ✅ Swoosh animations
- ✅ Responsive animations on mobile

### 📱 Responsive Design
- ✅ Mobile-first approach
- ✅ Tablet optimized
- ✅ Desktop enhanced experience
- ✅ Touch-friendly interface

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|----------|
| **React 18** | UI Library |
| **Vite** | Build Tool & Dev Server |
| **Redux Toolkit** | State Management |
| **React Router v6** | Client-side Routing |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Axios** | HTTP Client |
| **Stripe.js** | Payment Integration |
| **React Hot Toast** | Notifications |
| **React Icons** | Icon Library |

### Backend
| Technology | Purpose |
|------------|----------|
| **Node.js** | Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB** | NoSQL Database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication |
| **bcryptjs** | Password Hashing |
| **Stripe API** | Payment Processing |
| **Nodemailer** | Email Service |
| **CORS** | Cross-Origin Requests |
| **Express Validator** | Input Validation |

### DevOps
| Technology | Purpose |
|------------|----------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container Orchestration |
| **Nginx** | Reverse Proxy & Static Files |

---

## 📁 Project Structure

```
nike-ecommerce-platform/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── pages/                   # Page Components
│   │   │   ├── Home.jsx             # Hero & Featured Products
│   │   │   ├── Products.jsx         # Product Catalog
│   │   │   ├── ProductDetail.jsx    # Product Details
│   │   │   ├── Cart.jsx             # Shopping Cart
│   │   │   ├── Checkout.jsx         # Checkout Page
│   │   │   ├── Auth.jsx             # Login/Register
│   │   │   ├── Profile.jsx          # User Profile
│   │   │   └── Admin.jsx            # Admin Dashboard
│   │   ├── components/              # Reusable Components
│   │   │   ├── Navigation.jsx       # Top Navigation
│   │   │   ├── Footer.jsx           # Footer
│   │   │   └── ProductCard.jsx      # Product Card
│   │   ├── store/                   # Redux Store
│   │   │   └── index.js             # Store Configuration
│   │   ├── services/                # API Services
│   │   │   └── api.js               # Axios Instance & Endpoints
│   │   ├── App.jsx                  # Main App Component
│   │   ├── main.jsx                 # Entry Point
│   │   └── index.css                # Global Styles
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Express Backend
│   ├── models/                      # Mongoose Schemas
│   │   ├── User.js                  # User Schema
│   │   ├── Product.js               # Product Schema
│   │   └── Order.js                 # Order Schema
│   ├── routes/                      # API Routes
│   │   ├── auth.js                  # Authentication Routes
│   │   ├── products.js              # Product Routes
│   │   ├── users.js                 # User Routes
│   │   ├── cart.js                  # Cart Routes
│   │   ├── orders.js                # Order Routes
│   │   └── payments.js              # Payment Routes
│   ├── middleware/                  # Custom Middleware
│   │   └── auth.js                  # JWT Authentication
│   ├── scripts/                     # Utility Scripts
│   │   └── seed.js                  # Database Seeding
│   ├── .env.example                 # Environment Template
│   ├── server.js                    # Server Entry Point
│   └── package.json
│
├── docker-compose.yml               # Docker Compose Configuration
├── Dockerfile                       # Docker Image Configuration
├── nginx.conf                       # Nginx Configuration
├── DEVELOPMENT.md                   # Development Guide
├── API.md                           # API Documentation
├── README.md                        # This File
└── package.json                     # Root Package Configuration
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB v4.4+
- npm or yarn
- Git

### Installation Steps

#### 1. Clone Repository
```bash
git clone https://github.com/logesh360/nike-ecommerce-platform.git
cd nike-ecommerce-platform
```

#### 2. Install Dependencies
```bash
npm install
cd server && npm install
cd ../client && npm install
```

#### 3. Setup Environment Variables
```bash
# Server (.env)
cd server
cp .env.example .env
# Edit .env with your configuration

# Client (.env.local)
cd ../client
echo "VITE_API_URL=http://localhost:5000" > .env.local
```

#### 4. Seed Database
```bash
cd server
node scripts/seed.js
```

#### 5. Start Development Servers
```bash
cd ..
npm run dev
```

**Access Points:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API: http://localhost:5000/api

---

## 🐳 Docker Deployment

### Quick Deploy
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f server

# Stop services
docker-compose down
```

**Services Started:**
- MongoDB: localhost:27017
- Backend: localhost:5000
- Frontend: localhost:80 (via Nginx)

---

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
GET    /api/auth/me                Get current user (Protected)
```

### Products
```
GET    /api/products               Get all products
GET    /api/products/:id           Get product details
POST   /api/products               Create product (Admin)
PUT    /api/products/:id           Update product (Admin)
DELETE /api/products/:id           Delete product (Admin)
```

### Users
```
GET    /api/users/profile          Get user profile (Protected)
PUT    /api/users/profile          Update profile (Protected)
POST   /api/users/wishlist/:id     Add to wishlist (Protected)
DELETE /api/users/wishlist/:id     Remove from wishlist (Protected)
```

### Orders
```
POST   /api/orders                 Create order (Protected)
GET    /api/orders/user/orders     Get user orders (Protected)
GET    /api/orders/:id             Get order details (Protected)
```

### Payments
```
POST   /api/payments/create-payment-intent    Create Stripe intent (Protected)
POST   /api/payments/confirm-payment          Confirm payment (Protected)
```

👉 **Full API Documentation**: See [API.md](./API.md)

---

## 🎨 Nike Brand Animations

### Featured Animations

#### 1. **Hero Section**
- Fade-in heading with staggered animation
- Smooth text reveal from top
- Button hover scale effect

#### 2. **Product Cards**
- Hover lift animation (translateY)
- Image zoom on hover (scale 1.1)
- Discount badge fade-in
- Smooth color transitions

#### 3. **Navigation**
- Slide-down menu animation
- Mobile menu transitions
- Cart badge bounce animation

#### 4. **Checkout**
- Form field animations
- Order summary slide-in
- Button hover effects

#### 5. **Custom Keyframes**
- `slideDown`: Top to bottom entrance
- `fadeInUp`: Bottom to top fade
- `scaleIn`: Scale from 0.95 to 1
- `swoosh`: Left to right sweep

---

## 📋 Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  role: String ("user" | "admin"),
  avatar: String (URL),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  wishlist: [ObjectId] (Product references),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  name: String (required),
  description: String (required),
  category: String ("men" | "women" | "kids" | "accessories"),
  price: Number (required),
  originalPrice: Number,
  discount: Number,
  images: [
    { url: String, alt: String }
  ],
  sizes: [
    { size: String, stock: Number }
  ],
  colors: [String],
  rating: Number (0-5),
  reviews: [
    {
      user: String,
      comment: String,
      rating: Number,
      createdAt: Date
    }
  ],
  sku: String (unique, required),
  featured: Boolean,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  user: ObjectId (User reference),
  items: [
    {
      product: ObjectId,
      quantity: Number,
      price: Number,
      size: String,
      color: String
    }
  ],
  totalAmount: Number (required),
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: String ("credit-card" | "paypal" | "apple-pay"),
  paymentStatus: String ("pending" | "completed" | "failed" | "refunded"),
  orderStatus: String ("pending" | "processing" | "shipped" | "delivered" | "cancelled"),
  trackingNumber: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing

### Test Credentials

**Regular User:**
```
Email: test@nike.com
Password: Test@123
```

**Admin User:**
```
Email: admin@nike.com
Password: Admin@123
```

### Sample Products Included
- Nike Air Max 90 (Men)
- Nike Zoom Pegasus (Men)
- Nike Revolution 6 (Kids)
- Nike Court Legacy (Women)
- Nike Dri-FIT T-Shirt (Accessories)
- Nike Therma Training Pants (Accessories)

---

## 🔐 Security Features

✅ **Password Security**
- Bcrypt hashing with salt rounds
- Minimum password length validation

✅ **Authentication**
- JWT token-based authentication
- Token expiration (7 days default)
- Secure header validation

✅ **Authorization**
- Role-based access control (User/Admin)
- Protected API endpoints
- Request validation middleware

✅ **Data Protection**
- Input validation with express-validator
- MongoDB injection prevention
- CORS configuration
- Secure error handling

---

## 📊 Performance Optimizations

- **Lazy Loading**: React components loaded on demand
- **Code Splitting**: Vite's automatic code splitting
- **Image Optimization**: Lazy loading images
- **Caching**: Redis-ready architecture
- **API Pagination**: Product listing pagination
- **Compression**: Gzip compression via Nginx

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Ensure MongoDB is running
mongod

# Or start with Docker
docker run -d -p 27017:27017 mongo:latest
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📖 Documentation

- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Complete development guide
- **[API.md](./API.md)** - Full API documentation
- **[README.md](./README.md)** - Project overview

---

## 🔄 Future Enhancements

- [ ] Product reviews and ratings system
- [ ] Advanced search with filters
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Real-time chat support
- [ ] Advanced analytics dashboard
- [ ] AI-powered product recommendations
- [ ] Multi-language support
- [ ] Real Nike API integration
- [ ] Progressive Web App (PWA)
- [ ] Social media integration
- [ ] Loyalty program

---

## 📄 License

MIT © 2024 Nike eCommerce Platform

---

## 👨‍💻 Author

**logesh360**
- GitHub: [@logesh360](https://github.com/logesh360)
- Email: logesh360@example.com

---

## 🙏 Acknowledgments

- Nike for brand inspiration and design philosophy
- React community for amazing libraries
- Express.js documentation
- Tailwind CSS team
- Framer Motion for animations
- Stripe for payment processing

---

## 📞 Support

For issues and questions:
1. Check [DEVELOPMENT.md](./DEVELOPMENT.md) for setup help
2. Review [API.md](./API.md) for API details
3. Open an issue on GitHub
4. Check existing issues for solutions

---

**Made with ❤️ for Nike enthusiasts and eCommerce enthusiasts**

⭐ If you found this helpful, please star the repository!
