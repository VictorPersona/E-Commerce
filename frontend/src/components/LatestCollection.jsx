import React, { useState,useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const products = useContext(ShopContext).products
  const [lastestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="Latest " text2="Collection" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals! Browse through our latest collection of products, carefully curated to meet your needs and preferences.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {lastestProducts.map((product, index) => (
          <ProductItem
            key={index}
            name={product.name}
            _id={product._id}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
