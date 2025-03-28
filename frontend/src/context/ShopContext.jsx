import { createContext, useContext, useState } from 'react'
import asset from '../assets/asset'

export const ShopContext = createContext()

export const ShopContextProvider = ({ children }) => {
  const currency = '$'
  const deliveryFee = 40
  const products = asset.products
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(true)
  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  }
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
