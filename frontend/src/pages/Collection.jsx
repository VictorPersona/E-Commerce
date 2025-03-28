import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { images } from '../assets/asset'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const products = useContext(ShopContext).products
  const [showFilters, setShowFilters] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('Relavant')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setCategory((prev) => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setSubCategory((prev) => [...prev, e.target.value])
    }
  }

  const applyfilters = () => {
    let temp = products
    if (category.length > 0) {
      temp = temp.filter((product) => category.includes(product.category))
    }
    if (subCategory.length > 0) {
      temp = temp.filter((product) => subCategory.includes(product.subCategory))
    }
    setFilteredProducts(temp)
  }

  const sortProducts = () => {
    let temp = [...filteredProducts]
    switch (sortType) {
      case 'low-high':
        temp = temp.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        temp = temp.sort((a, b) => b.price - a.price)
        break
      default:
        applyfilters()
        break
    }
    setFilteredProducts(temp)
  }
  useEffect(() => {
    sortProducts()
  }, [sortType])
  useEffect(() => {
    applyfilters()
  }, [category, subCategory])
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
        </p>
        <img
          src={images.dropdown}
          className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`}
          alt=""
        />
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 display:block ${
            showFilters ? '' : 'hidden'
          }`}
        >
          <p className="mb-3 text:sm font-medium">CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Men'}
                onClick={toggleCategory}
              />{' '}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Women'}
                onClick={toggleCategory}
              />{' '}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Kids'}
                onClick={toggleCategory}
              />{' '}
              Kids
            </p>
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 display:block ${
            showFilters ? '' : 'hidden'
          }`}
        >
          <p className=" my-5 mb-3 text:sm font-medium">SUB CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Topwear'}
                onClick={toggleSubCategory}
              />{' '}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Bottomwear'}
                onClick={toggleSubCategory}
              />{' '}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={'Winterwear'}
                onClick={toggleSubCategory}
              />{' '}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'All'} text2={' COLLECTIONS'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2  md:grid-col-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((product, index) => (
            <ProductItem
              key={index}
              _id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection
