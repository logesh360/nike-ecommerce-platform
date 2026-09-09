import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
}

export const productsAPI = {
  getAll: (params) => API.get('/products', { params }),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
}

export const ordersAPI = {
  create: (data) => API.post('/orders', data),
  getAll: () => API.get('/orders/user/orders'),
  getById: (id) => API.get(`/orders/${id}`),
}

export const usersAPI = {
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/users/profile', data),
  addToWishlist: (productId) => API.post(`/users/wishlist/${productId}`),
  removeFromWishlist: (productId) => API.delete(`/users/wishlist/${productId}`),
}

export const paymentsAPI = {
  createPaymentIntent: (data) => API.post('/payments/create-payment-intent', data),
  confirmPayment: (data) => API.post('/payments/confirm-payment', data),
}

export default API
