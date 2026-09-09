import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../store'
import { ordersAPI } from '../services/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate()
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit-card',
  })
  const [loading, setLoading] = useState(false)

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        items: items.map(i => ({
          product: i._id,
          quantity: i.quantity,
          price: i.price,
          size: i.selectedSize,
          color: i.selectedColor,
        })),
        totalAmount: total,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
      }

      const { data } = await ordersAPI.create(orderData)
      toast.success('Order placed successfully!')
      dispatch(clearCart())
      navigate(`/order/${data.order._id}`)
    } catch (error) {
      toast.error('Failed to place order')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Cart is empty</p>
          <button
            onClick={() => navigate('/products')}
            className="nike-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <h1 className="text-4xl font-bold mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white rounded-lg p-8 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="apple-pay">Apple Pay</option>
            </select>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="nike-btn w-full text-lg disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Processing...' : 'Complete Order'}
          </motion.button>
        </motion.form>

        {/* Order Summary */}
        <motion.div
          className="bg-white rounded-lg p-8 h-fit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Checkout
