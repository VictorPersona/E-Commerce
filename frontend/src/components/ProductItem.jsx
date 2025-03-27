import React, { useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({_id,name,price,image}) => {
    const currency = useContext(ShopContext).currency
  return (
   <Link to={`/product/${_id}`} className='text-gray-700 cursor-pointer'>
    <div className="overflow-hidden">
        <img src={image[0]} className='hover:scale-110 transition ease-in-out' alt="" />
    </div>
    <p className='pt-3 pb-1 text-sm'>{name}</p>
    <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem