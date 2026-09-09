# Nike eCommerce Platform - Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB v4.4+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/logesh360/nike-ecommerce-platform.git
cd nike-ecommerce-platform
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

3. **Setup environment variables**
```bash
# Server environment
cd server
cp .env.example .env
# Edit .env with your configuration

# Client environment
cd ../client
echo "VITE_API_URL=http://localhost:5000" > .env.local
```

4. **Seed the database**
```bash
cd server
node scripts/seed.js
```

5. **Start development servers**
```bash
# From root directory
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📁 Project Structure

```
nike-ecommerce-platform/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── users.js
│   │   ├── cart.js
│   │   └── payments.js
│   ├── middleware/
│   │   └── auth.js
│   ├── scripts/
│   │   └── seed.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Auth.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Admin.jsx
│   │   ├── components/
│   │   │   ├── Navigation.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── store/
│   │   │   └── index.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
└── README.md
```

## 🔧 Environment Variables

### Server (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/nike-ecommerce

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Nike API
NIKE_API_KEY=your_nike_api_key_here
NIKE_API_BASE_URL=https://api.nike.com/v1

# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Client (.env.local)
```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_KEY=pk_test_your_key_here
```

## 📦 Docker Deployment

### Using Docker Compose

```bash
# Build and start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f server
```

This will start:
- MongoDB on port 27017
- Backend server on port 5000
- Nginx reverse proxy on port 80

## 🎨 Features

### Frontend
- ✨ Framer Motion animations
- 🎯 Responsive design with Tailwind CSS
- 🛒 Shopping cart with Redux state management
- 💳 Stripe payment integration
- 👤 User authentication with JWT
- 📱 Mobile-friendly interface
- 🔍 Product search and filtering
- ⭐ Product ratings and reviews
- 💝 Wishlist functionality
- 📦 Order history and tracking

### Backend
- 🔐 JWT-based authentication
- 📦 Product management system
- 🛍️ Shopping cart and order processing
- 💰 Stripe payment integration
- 👥 User profile management
- 📧 Email notifications (Nodemailer)
- ✅ Input validation
- 🔒 Role-based access control

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)
- `POST /api/users/wishlist/:productId` - Add to wishlist (Protected)
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/user/orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent (Protected)
- `POST /api/payments/confirm-payment` - Confirm payment (Protected)

## 🎯 Nike Brand Animations

The platform includes exclusive Nike-branded animations:

### Hero Section
- Fade-in text animations
- Staggered content reveals
- Smooth hover transitions

### Product Cards
- Hover lift animations
- Image zoom effects
- Discount badge animations

### Navigation
- Slide-down menu animations
- Mobile menu transitions

### Checkout
- Form field animations
- Order summary transitions

## 🧪 Testing

### Test Account
Use these credentials to test the application:
```
Email: test@nike.com
Password: Test@123
```

### Admin Access
```
Email: admin@nike.com
Password: Admin@123
```

## 📝 Development Scripts

```bash
# Development
npm run dev                # Start both frontend and backend
npm run server             # Start backend only
npm run client             # Start frontend only

# Building
npm run build              # Build frontend

# Seeding
cd server && node scripts/seed.js  # Seed database with sample data
```

## 🚨 Troubleshooting

### MongoDB Connection Issues
```bash
# Start MongoDB locally
mongod

# Or use Docker
docker run -d -p 27017:27017 mongo:latest
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Resources

- [Nike Official](https://www.nike.com)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Stripe API](https://stripe.com/docs/api)

## 📄 License

MIT © 2024 Nike eCommerce Platform

## 👨‍💻 Author

Built by logesh360

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Made with ❤️ for Nike enthusiasts**
