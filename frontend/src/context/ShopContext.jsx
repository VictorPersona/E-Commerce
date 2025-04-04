/**
 * ShopContext.jsx
 *
 * This file defines the ShopContext and its provider, which manages the state and functionality
 * for an e-commerce application. It includes product data, cart management, and utility functions
 * for interacting with the shopping cart and backend API.
 */

import { createContext, useContext, useEffect, useState } from 'react'
import asset from '../assets/asset'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

/**
 * Creates a React context for the shop.
 * @type {React.Context}
 */
export const ShopContext = createContext()

/**
 * ShopContextProvider component that wraps children components and provides
 * the shop context value.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider.
 * @returns {JSX.Element} The provider component.
 */
export const ShopContextProvider = ({ children }) => {
  /**
   * Currency symbol used in the application.
   * @type {string}
   */
  const currency = '$'

  /**
   * Delivery fee for orders.
   * @type {number}
   */
  const deliveryFee = 40

  /**
   * List of products fetched from the backend.
   * @type {Array<Object>}
   */
  const [products, setProducts] = useState([])

  /**
   * Search query for filtering products.
   * @type {string}
   */
  const [search, setSearch] = useState('')

  /**
   * Boolean flag to toggle the visibility of the search bar.
   * @type {boolean}
   */
  const [showSearch, setShowSearch] = useState(false)

  /**
   * Object representing items in the cart.
   * The structure is { itemID: { size: quantity } }.
   * @type {Object}
   */
  const [cartItems, setCartItems] = useState({})

  /**
   * Backend API base URL.
   * @type {string}
   */
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  /**
   * Authentication token for API requests.
   * @type {string}
   */
  const [token, setToken] = useState('')

  /**
   * Fetches product data from the backend API and updates the state.
   * Displays a toast notification in case of an error.
   * @async
   * @returns {Promise<void>}
   */
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error fetching products')
    }
  }
   const logout = () => {
     localStorage.removeItem('token')
     setToken('')
   }
  useEffect(() => {
    setToken(localStorage.getItem('token') ? localStorage.getItem('token') : '')
  }, [token])

  useEffect(() => {
    getProductsData()
  }, [])

  /**
   * Adds an item to the cart with the specified size.
   * Displays a toast notification on success or error.
   *
   * @param {Object} params - Parameters for adding to the cart.
   * @param {string} params.itemID - ID of the product to add.
   * @param {string} params.size - Size of the product to add.
   * @returns {void}
   */
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
    if(token){
      try {
          await axios.post(backendUrl + '/api/cart/add',{itemID,size},{headers:{Authorization : `Bearer ${token}`}})
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
    toast.success('Item added to Cart')
  }

  /**
   * Calculates the total number of items in the cart.
   *
   * @returns {number} The total count of items in the cart.
   */
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

  /**
   * Updates the quantity of a specific item in the cart.
   *
   * @param {Object} params - Parameters for updating the quantity.
   * @param {string} params.itemID - ID of the product to update.
   * @param {string} params.size - Size of the product to update.
   * @param {number} params.quantity - New quantity for the product.
   * @returns {void}
   */
  const updateQuantity = async ({ itemID, size, quantity }) => {
    let cartData = structuredClone(cartItems)
    cartData[itemID][size] = quantity
    setCartItems(cartData)
    if (token) {
      try {
        await axios.put(
          backendUrl + '/api/cart/update',
          { itemID, size,quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  }

  const getUserCart = async(token)=>{
    try {
      const response  = await axios.get(backendUrl + "/api/cart/getCart",{headers:{Authorization:`Bearer ${token}`}})
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error)
      res.json({success:false,message:error.message})
    }
  }
  useEffect(()=>{getUserCart()},[])

  /**
   * Calculates the total amount for the items in the cart.
   *
   * @returns {number} The total cart amount.
   */
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

  /**
   * Context value containing state and utility functions for the shop.
   */
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
    navigate,
    backendUrl,
    token,
    setToken,
    logout
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
