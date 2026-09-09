import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store'
import { productsAPI } from '../services/api'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productsAPI.getById(id)
        setProduct(data.product)
        setSelectedSize(data.product.sizes?.[0]?.size || '')
        setSelectedColor(data.product.colors?.[0] || '')
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size')
      return
    }
    dispatch(addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    }))
    toast.success('Added to cart!')
  }

  if (loading) return <div className="text-center py-20">Loading...</div>
  if (!product) return <div className="text-center py-20">Product not found</div>

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {product.images?.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={img.alt}
              className="w-full h-96 object-cover rounded-lg"
            />
          ))}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="text-3xl font-bold">${product.price}</div>

          {/* Size Selection */}
          <div>
            <label className="block font-bold mb-2">Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              {product.sizes?.map((s) => (
                <option key={s.size} value={s.size}>
                  {s.size} ({s.stock} available)
                </option>
              ))}
            </select>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block font-bold mb-2">Color</label>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded border-2 ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block font-bold mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <motion.button
            onClick={handleAddToCart}
            className="nike-btn w-full text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetail
