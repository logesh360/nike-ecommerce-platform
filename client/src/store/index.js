import { createSlice, configureStore } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(i => i._id === action.payload._id && i.size === action.payload.size)
      if (item) {
        item.quantity += action.payload.quantity || 1
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 })
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    updateCart: (state, action) => {
      const item = state.items.find(i => i._id === action.payload._id)
      if (item) {
        item.quantity = action.payload.quantity
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      localStorage.removeItem('cart')
    },
  },
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
  },
})

export const { setUser, setToken, logout } = authSlice.actions
export const { addToCart, removeFromCart, updateCart, clearCart } = cartSlice.actions
export const { setProducts, setLoading, setError } = productsSlice.actions
export default store
