import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../store'
import { usersAPI, ordersAPI } from '../services/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || {},
  })

  if (!isAuthenticated) {
    navigate('/auth')
    return null
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [ordersRes] = await Promise.all([
          ordersAPI.getAll(),
        ])
        setOrders(ordersRes.data.orders || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('address_')) {
      const addressKey = name.replace('address_', '')
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressKey]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await usersAPI.updateProfile(formData)
      dispatch(setUser(data.user))
      setEditMode(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div
            className="lg:col-span-1 bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="address_street"
                  placeholder="Street"
                  value={formData.address?.street || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="address_city"
                  placeholder="City"
                  value={formData.address?.city || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="nike-btn w-full disabled:opacity-50"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="w-full border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-bold text-lg">{user?.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-bold text-lg">{user?.email}</p>
                </div>
                {user?.phone && (
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-bold text-lg">{user.phone}</p>
                  </div>
                )}
                <button
                  onClick={() => setEditMode(true)}
                  className="nike-btn w-full mt-6"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </motion.div>

          {/* Orders Section */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold mb-6">Order History</h2>

            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                <p>No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <motion.div
                    key={order._id}
                    className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-gray-600 text-sm">Order ID</p>
                        <p className="font-bold">{order._id.slice(0, 8)}...</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Total</p>
                        <p className="font-bold">${order.totalAmount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Status</p>
                        <p className="font-bold capitalize text-orange-600">{order.orderStatus}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Date</p>
                        <p className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile
