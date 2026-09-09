import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts, setLoading } from '../store'
import { productsAPI } from '../services/api'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const dispatch = useDispatch()
  const { items: products } = useSelector(state => state.products)
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        dispatch(setLoading(true))
        const { data } = await productsAPI.getAll({ limit: 6 })
        dispatch(setProducts(data.products))
        setFeatured(data.products.slice(0, 6))
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchFeatured()
  }, [])

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="bg-nike-gray h-screen flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-orange-600 opacity-20"></div>
        <motion.div
          className="text-center z-10 px-4"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Just Do It
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the latest Nike collection
          </motion.p>
          <motion.button
            className="nike-btn text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Featured Products */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Featured Collection
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </section>
    </div>
  )
}

export default Home
