import React from 'react'
import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">NIKE</h3>
            <p className="text-gray-400 mb-4">Just Do It. Discover the latest Nike collection.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-orange-600 transition-colors">
                <FiFacebook size={24} />
              </a>
              <a href="#" className="hover:text-orange-600 transition-colors">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="hover:text-orange-600 transition-colors">
                <FiInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-orange-600 transition-colors">Men</Link></li>
              <li><Link to="#" className="hover:text-orange-600 transition-colors">Women</Link></li>
              <li><Link to="#" className="hover:text-orange-600 transition-colors">Kids</Link></li>
              <li><Link to="#" className="hover:text-orange-600 transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Help</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-orange-600 transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-orange-600 transition-colors">Shipping Info</Link></li>
              <li><Link to="#" className="hover:text-orange-600 transition-colors">Returns</Link></li>
              <li><Link to="#" className="hover:text-orange-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-orange-600 transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-orange-600 transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-orange-600 transition-colors">Press</Link></li>
              <li><Link to="#" className="hover:text-orange-600 transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Nike eCommerce Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
