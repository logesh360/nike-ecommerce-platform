import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const discount = product.discount || 0
  const discountedPrice = product.price * (1 - discount / 100)

  return (
    <motion.div
      className="product-card group"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product._id}`}>
        <div className="product-image-container">
          {product.images?.[0]?.url && (
            <img
              src={product.images[0].url}
              alt={product.name}
              className="product-image"
            />
          )}
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{discount}%
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div>
              {discount > 0 ? (
                <div className="flex gap-2 items-center">
                  <span className="text-xl font-bold text-orange-600">${discountedPrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            {product.rating > 0 && (
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="text-sm ml-1">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
