# Nike eCommerce Platform - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### 1. Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

---

### 2. Products

#### Get All Products
```http
GET /products?category=men&search=air&page=1&limit=12
```

**Query Parameters:**
- `category` - Filter by category (men, women, kids, accessories)
- `search` - Search by product name or description
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)

**Response:**
```json
{
  "success": true,
  "total": 24,
  "pages": 2,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Nike Air Max 90",
      "description": "Classic and timeless...",
      "category": "men",
      "price": 129.99,
      "discount": 10,
      "images": [
        {
          "url": "https://...",
          "alt": "Nike Air Max 90 Front"
        }
      ],
      "sizes": [
        { "size": "7", "stock": 10 },
        { "size": "8", "stock": 15 }
      ],
      "colors": ["White", "Black", "Blue"],
      "rating": 4.8,
      "featured": true
    }
  ]
}
```

#### Get Single Product
```http
GET /products/:id
```

#### Create Product (Admin)
```http
POST /products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Nike New Model",
  "description": "New Nike shoe...",
  "category": "men",
  "price": 149.99,
  "discount": 15,
  "sku": "NIKE-NM-001",
  "sizes": [
    { "size": "7", "stock": 20 }
  ],
  "colors": ["Black", "White"],
  "images": [
    { "url": "https://...", "alt": "Front view" }
  ]
}
```

#### Update Product (Admin)
```http
PUT /products/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "price": 139.99,
  "discount": 20
}
```

#### Delete Product (Admin)
```http
DELETE /products/:id
Authorization: Bearer <admin-token>
```

---

### 3. Users

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+1-234-567-8900",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

#### Add to Wishlist
```http
POST /users/wishlist/:productId
Authorization: Bearer <token>
```

#### Remove from Wishlist
```http
DELETE /users/wishlist/:productId
Authorization: Bearer <token>
```

---

### 4. Orders

#### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "product": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "price": 129.99,
      "size": "10",
      "color": "Black"
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit-card"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "_id": "607f1f77bcf86cd799439012",
    "user": "507f1f77bcf86cd799439011",
    "items": [...],
    "totalAmount": 259.98,
    "shippingAddress": {...},
    "paymentMethod": "credit-card",
    "paymentStatus": "pending",
    "orderStatus": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get User Orders
```http
GET /orders/user/orders
Authorization: Bearer <token>
```

#### Get Order by ID
```http
GET /orders/:id
Authorization: Bearer <token>
```

---

### 5. Payments

#### Create Payment Intent
```http
POST /payments/create-payment-intent
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 259.98,
  "orderId": "607f1f77bcf86cd799439012"
}
```

**Response:**
```json
{
  "success": true,
  "clientSecret": "pi_1234567890_secret_abcdef123456"
}
```

#### Confirm Payment
```http
POST /payments/confirm-payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "607f1f77bcf86cd799439012",
  "paymentIntentId": "pi_1234567890"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Not authorized"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Status Codes

| Code | Meaning |
|------|----------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## Rate Limiting

None currently implemented. Should be added for production.

## CORS

Cross-Origin requests are allowed from:
- `http://localhost:5173` (Development)
- Configure for production URLs

---

**Last Updated:** January 2024
