# Nike eCommerce Platform 🏀

A full-stack eCommerce platform for Nike shoes with real data integration, exclusive branded animations, and complete functionality.

## Features

✨ **Premium Features:**
- Real-time product data integration from Nike API
- Exclusive Nike-branded animations
- Full shopping cart functionality
- User authentication & profiles
- Order management system
- Payment processing
- Product filtering & search
- Responsive design
- Admin dashboard
- Real-time inventory tracking

## Tech Stack

### Frontend
- React 18+
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Axios
- Redux Toolkit
- React Router v6

### Backend
- Node.js + Express
- MongoDB
- JWT Authentication
- Stripe Integration
- Mongoose ORM
- Nodemailer

## Getting Started

### Prerequisites
- Node.js v16+
- MongoDB
- Stripe Account
- Nike API Key

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev
```

## Project Structure

```
nike-ecommerce-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
├── server/                 # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── server.js
└── package.json
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/category/:category` - Get products by category

### Users
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/users/profile` - Get user profile

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - Get user orders

## Environment Variables

```env
# Backend
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
NIKE_API_KEY=
NODE_ENV=development
PORT=5000

# Frontend
VITE_API_URL=http://localhost:5000
VITE_STRIPE_KEY=
```

## License

MIT © 2024
