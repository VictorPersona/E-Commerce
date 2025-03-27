import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const products = useContext(ShopContext).products
  const [bestSeller, setBestSeller] = useState([])
  console.log(products)

  useEffect(() => {
    setBestSeller(
      products.filter((product) => product.bestseller == true).slice(6, 15)
    )
  }, [])
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'Best'} text2={'Seller'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          suscipit at eligendi molestiae iusto quibusdam dolorem magnam culpa
          omnis magni iure alias modi sapiente ut quae inventore, facere
          dignissimos officiis?
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
