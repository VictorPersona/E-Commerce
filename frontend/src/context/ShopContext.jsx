import { createContext, useContext, useEffect, useState } from 'react'
import asset from '../assets/asset'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext()

export const ShopContextProvider = ({ children }) => {
  const currency = '$'
  const deliveryFee = 40
  const products = asset.products
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({})

  const addToCart = async ({ itemID, size }) => {
    console.log('Adding to cart - itemID:', itemID, 'size:', size)
    if (!itemID) {
      console.error('Error: itemID is undefined or invalid!')
      return
    }
    if (size == '') {
      toast.error('Select the Product Size')
      return
    }
    let cartData = structuredClone(cartItems)
    if (cartData[itemID]) {
      if (cartData[itemID][size]) {
        cartData[itemID][size]++
      } else {
        cartData[itemID][size] = 1
      }
    } else {
      cartData[itemID] = {}
      cartData[itemID][size] = 1
    }
    setCartItems(cartData)
    toast.success('Item added to Cart')
  }

  const getCartCount = () => {
    try {
      let noOfItems = 0
      if (Object.keys(cartItems).length > 0) {
        for (const itemID in cartItems) {
          for (const size in cartItems[itemID]) {
            noOfItems += cartItems[itemID][size]
          }
        }
      }
      return noOfItems
    } catch (error) {
      console.log('Error in getCartCount', error)
      return 0
    }
  }
  const updateQuantity = async ({ itemID, size, quantity }) => {
    let cartData = structuredClone(cartItems)
    cartData[itemID][size] = quantity
    setCartItems(cartData)
  }

  const getCartAmount = () => {
    let amount = 0
    for (const itemID in cartItems) {
      const product = products.find((product) => itemID == product._id)

      if (!product) continue
      for (const itemSizes in cartItems[itemID]) {
        try {
          if (cartItems[itemID][itemSizes] > 0) {
            amount += product.price * cartItems[itemID][itemSizes]
          }
        } catch (error) {
          console.error('Error Calculating cart amount', error)
        }
      }
    }
    return amount
  }

  const navigate = useNavigate()

  useEffect(() => {}, [cartItems])

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    getCartCount,
    cartItems,
    getCartAmount,
    updateQuantity,
    navigate
  }
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
