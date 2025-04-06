import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { images } from '../assets/asset'
import RelatedProjects from '../components/RelatedProjects'

const Product = () => {
  const { id } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [useImage, setImage] = useState('')
  const [productSize, setProductSize] = useState('')

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id)
    if (product) {
      setProductData(product)
      setImage(product.image[0])
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [id, products])

  return (
    <div>
      {productData ? (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
          <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
              <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                {productData &&
                  productData.image.map((item, index) => (
                    <img
                      src={item}
                      key={index}
                      onClick={() => setImage(item)}
                      className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                      alt=""
                    />
                  ))}
              </div>
              <div className="w-full sm:w-[80%]">
                {useImage ? (
                  <img src={useImage} className="w-full h-auto" alt="Product" />
                ) : (
                  <div>Loading image...</div> // Optional fallback
                )}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
              <div className="flex items-center gap-1 mt-2">
                <img src={images.starFull} alt="" className="w-4" />
                <img src={images.starFull} alt="" className="w-4" />
                <img src={images.starFull} alt="" className="w-4" />
                <img src={images.starFull} alt="" className="w-4" />
                <img src={images.starEmpty} alt="" className="w-4" />
                <p className="p-1">(122)</p>
              </div>
              <p className="mt-5 text-3xl font-medium">
                {currency}
                {productData.price}
              </p>
              <p className="mt-5 text-gray-500 md:w-4/5">
                {productData.description}
              </p>
              <div className="flex flex-col gap-4 my-8">
                <p>Select Size</p>
                <div className="flex gap-2">
                  {productData.sizes.map((size, index) => (
                    <button
                      onClick={() => setProductSize(size)}
                      key={index}
                      className={`cursor-pointer border py-2 px-4 bg-gray-100 ${
                        productSize == size ? 'border-orange-500' : ''
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    addToCart({ itemID: productData._id, size: productSize })
                  }
                  className="cursor-pointer bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
                >
                  Add to Cart
                </button>
                <hr className="mt-8 sm:w-4/5" />
                <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                  <p>100% Original Product</p>
                  <p>Cash on delivery is available on this product</p>
                  <p>Easy return and exchange policy within 7 days</p>
                </div>
                <div className="mt-20">
                  <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews(122)</p>
                  </div>
                </div>
                <RelatedProjects
                  category={productData.category}
                  subCategory={productData.subCategory}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Product
