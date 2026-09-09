import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { productsAPI } from '../services/api'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'men',
    price: '',
    discount: 0,
    sku: '',
  })

  if (!isAuthenticated || user?.role !== 'admin') {
    navigate('/')
    return null
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data } = await productsAPI.getAll({ limit: 100 })
      setProducts(data.products)
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await productsAPI.create(formData)
      toast.success('Product created successfully')
      setFormData({
        name: '',
        description: '',
        category: 'men',
        price: '',
        discount: 0,
        sku: '',
      })
      setShowForm(false)
      fetchProducts()
    } catch (error) {
      toast.error('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(id)
        toast.success('Product deleted')
        fetchProducts()
      } catch (error) {
        toast.error('Failed to delete product')
      }
    }
  }

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <motion.button
            onClick={() => setShowForm(!showForm)}
            className="nike-btn"
            whileHover={{ scale: 1.05 }}
          >
            {showForm ? 'Cancel' : 'Add Product'}
          </motion.button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={formData.sku}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-4 py-2"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="accessories">Accessories</option>
              </select>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="number"
                name="discount"
                placeholder="Discount %"
                value={formData.discount}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-4 py-2 md:col-span-2"
              />
              <motion.button
                type="submit"
                disabled={loading}
                className="nike-btn md:col-span-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
              >
                {loading ? 'Creating...' : 'Create Product'}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Discount</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 capitalize">{product.category}</td>
                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{product.discount}%</td>
                    <td className="px-6 py-4 space-x-2">
                      <button className="text-blue-600 hover:underline">Edit</button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
