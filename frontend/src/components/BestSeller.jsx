import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const products = useContext(ShopContext).products
  const [bestSeller, setBestSeller] = useState([])
  

  useEffect(() => {
    setBestSeller(
      products.filter((product) => product.bestseller == true).slice(6, 15)
    )
  }, [products])
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'Best'} text2={'Seller'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our top-selling products, handpicked by our customers. Shop
          now and find your favorites among the best!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((product, index) => (
          <ProductItem
            key={index}
            _id={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
