import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { images } from '../assets/asset'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { currency, cartItems, products,navigate, updateQuantity } =
    useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  console.log('Products:', products)
  console.log('Cart Items:', cartItems)

  useEffect(() => {
    const tempData = []
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item],
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItems])

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div className=" ">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id == item.id)

          if (!productData) {
            console.warn(
              `Product with ID ${item.id} not found in products list`
            )
            return null
          }
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4x"
            >
              <div className="flex items-center gap-6">
                <img
                  src={productData.image[0]}
                  alt=""
                  className="w-16 sm:w-20"
                />
                <div className=" text-xs sm:text-lg font-medium">
                  <p>{productData.name}</p>
                </div>
                <div className="flex items-center gap-5 mt-2">
                  <p>
                    {currency}
                    {productData.price}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                    {item.size}
                  </p>
                </div>
              </div>
              <input
                type="number"
                name=""
                id=""
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = Number(e.target.value)
                  if (newQuantity > 0) {
                    updateQuantity({
                      itemID: item.id,
                      size: item.size,
                      quantity: newQuantity,
                    })
                  }
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                min={1}
              />
              <img
                src={images.bin}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                alt=""
              />
            </div>
          )
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
        </div>
      </div>
      <div className="w-full text-end">
        <button onClick={()=>navigate("/place-order")} className="bg-black text-white text-sm my-8 px-8 py-3">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  )
}

export default Cart
