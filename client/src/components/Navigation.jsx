import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store'
import { motion } from 'framer-motion'
import { FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black hover:text-orange-600 transition-colors">
            NIKE
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="hover:text-orange-600 transition-colors font-medium">Home</Link>
            <Link to="/products" className="hover:text-orange-600 transition-colors font-medium">Shop</Link>
            <Link to="#" className="hover:text-orange-600 transition-colors font-medium">About</Link>
            <Link to="#" className="hover:text-orange-600 transition-colors font-medium">Contact</Link>
          </div>

          {/* Right Icons */}
          <div className="flex gap-6 items-center">
            {/* Cart */}
            <Link to="/cart" className="relative hover:text-orange-600 transition-colors">
              <FiShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="hidden md:flex gap-4 items-center">
                <Link to="/profile" className="hover:text-orange-600 transition-colors">
                  <FiUser size={24} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" className="hidden md:block px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors">
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden mt-4 space-y-4 pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/" className="block hover:text-orange-600 font-medium">Home</Link>
            <Link to="/products" className="block hover:text-orange-600 font-medium">Shop</Link>
            <Link to="#" className="block hover:text-orange-600 font-medium">About</Link>
            <Link to="#" className="block hover:text-orange-600 font-medium">Contact</Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block hover:text-orange-600 font-medium">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 bg-black text-white rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="block px-4 py-2 bg-black text-white rounded">
                Login
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
