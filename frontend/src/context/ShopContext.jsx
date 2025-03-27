import { createContext, useContext } from 'react'
import asset from '../assets/asset'

export const ShopContext = createContext()

export const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const deliveryFee = 40;
    const products = asset.products;
  const value = {products,currency,deliveryFee}
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
