import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
  const { deliveryFee, currency, getCartAmount } = useContext(ShopContext)
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={'Cart'} text2={'Total'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        {' '}
        <div className=" flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount()}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {deliveryFee}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>
            {currency}
            {getCartAmount() == 0 ? 0 : getCartAmount() + deliveryFee}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
