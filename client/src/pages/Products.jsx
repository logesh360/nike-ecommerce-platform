import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts, setLoading } from '../store'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const dispatch = useDispatch()
  const { items: products, loading } = useSelector(state => state.products)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true))
        const params = {
          page,
          limit: 12,
          ...(category !== 'all' && { category }),
          ...(search && { search }),
        }
        const { data } = await productsAPI.getAll(params)
        dispatch(setProducts(data.products))
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchProducts()
  }, [category, search, page, dispatch])

  return (
    <div className="min-h-screen bg-white py-20 px-4 md:px-8 lg:px-16">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our Collection
      </motion.h1>

      {/* Filters */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        >
          <option value="all">All Categories</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Products
