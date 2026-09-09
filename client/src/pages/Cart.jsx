import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateCart, clearCart } from '../store'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/products" className="nike-btn inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item._id}
                className="border border-gray-300 rounded-lg p-6 flex gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {item.images?.[0]?.url && (
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => dispatch(updateCart({
                      _id: item._id,
                      quantity: parseInt(e.target.value)
                    }))}
                    className="border border-gray-300 rounded px-2 w-16"
                  />
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-500 font-bold"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cart Summary */}
          <motion.div
            className="bg-gray-50 rounded-lg p-6 h-fit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout" className="nike-btn block text-center w-full mb-4">
              Proceed to Checkout
            </Link>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            >
              Clear Cart
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Cart
