import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { currency } from '../../../admin/src/App'

/**
 * PlaceOrder component handles the order placement form including
 * delivery information and payment method selection
 */
const PlaceOrder = () => {
  // State to track selected payment method
  const [method, setMethod] = useState('cod')
  const {
    navigate,
    cartItems,
    products,
    getCartAmount,
    backendUrl,
    setCartItems,
  } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setForm((prevState) => ({ ...prevState, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currecny,
      name: 'Order Payment',
      description: 'Order  Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const response = await axios.post(
            backendUrl + '/api/order/verifyRazorpay',
            response,
            { Headers: { Authorization: `Bearer ${token}` } }
          )
          if(data.success){
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      },
    }
  }

  const onSubmitHandler = async (e) => {
    e.prevenDefault()
    try {
      const orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === cartItems[items])
          )
          if (itemInfo) {
            itemInfo.size = item
            itemInfo.quantity = cartItems[item][items]
            orderItems.push(itemInfo)
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount,
      }

      switch (method) {
        case 'cod':
          try {
            const response = await axios.post(
              backendUrl + '/api/order/place',
              orderData,
              { Headers: { Authorization: `Bearer ${token}` } }
            )
            if (response.data.success) {
              setCartItems({})
              navigate('/orders')
            } else {
              toast.error(response.data.message)
            }
          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }

          break
        case 'stripe':
          const responseStripe = await axios.post(
            backendUrl + '/api/order/stripe',
            orderData,
            { Headers: { Authorization: `Bearer ${token}` } }
          )
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break

        case 'razorpay':
          const responseRazorpay = await axios.post(
            backendUrl + '/api/order/razorpay',
            orderData,
            { Headers: { Authorization: `Bearer ${token}` } }
          )
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          }
          break
      }
    } catch (error) {}
  }

  return (
    <form className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* Delivery Information Form Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="Delivery" text2="Information" />
        </div>

        {/* Name Input  Fields */}
        <div className="flex gap-3">
          <input
            required
            type="text"
            value={formData.firstName}
            name="firstName"
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First Name"
          />
          <input
            required
            type="text"
            value={formData.lastName}
            name="lastName"
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last Name"
          />
        </div>

        {/* Contact and Street Information */}
        <div className="flex gap-3">
          <input
            required
            type="email"
            value={formData.email}
            name="email"
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="E-mail"
          />
          <input
            required
            type="text"
            value={formData.street}
            name="street"
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Street Name"
          />
        </div>

        {/* City and State Fields */}
        <div className="flex gap-3">
          <input
            required
            type="text"
            value={formData.city}
            name="city"
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />
          <input
            required
            type="text"
            value={formData.state}
            name="state"
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>

        {/* Zipcode and Country Fields */}
        <div className="flex gap-3">
          <input
            required
            type="number"
            value={formData.zipcode}
            name="zipcode"
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zipcode"
          />
          <input
            required
            type="text"
            value={formData.country}
            name="country"
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
          />
        </div>

        {/* Phone Number Field */}
        <input
          required
          type="number"
          value={formData.phone}
          name="phone"
          onChange={onChangeHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Phone Number"
        />
      </div>

      {/* Cart Total and Payment Methods Section */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHODS" />
        </div>

        {/* Payment Method Selection */}
        <div className="flex gap-3 flex-col lg:flex-row">
          {/* Razorpay Option */}
          <div
            onClick={() => setMethod('razorpay')}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method == 'razorpay' ? 'bg-green-400' : ''
              }`}
            ></p>
            <img
              referrerPolicy="origin"
              src="https://badges.razorpay.com/badge-light.png"
              style={{ height: '45px', width: '113px' }}
              alt="Razorpay | Payment Gateway | Neobank"
            />
          </div>

          {/* Stripe Option */}
          <div
            onClick={() => setMethod('stripe')}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method == 'stripe' ? 'bg-green-400' : ''
              }`}
            ></p>
            <img
              referrerPolicy="origin"
              src="https://cdn.brandfolder.io/KGT2DTA4/at/8vbr8k4mr5xjwk4hxq4t9vs/Stripe_wordmark_-_blurple.svg"
              style={{ height: '45px', width: '113px' }}
              alt="Stripe | Payment Gateway | "
            />
          </div>

          {/* Cash on Delivery Option */}
          <div
            onClick={() => setMethod('cod')}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method == 'cod' ? 'bg-green-400' : ''
              }`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              Cash on Delivery
            </p>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            onClick={() => navigate('/orders')}
            className="bg-black text-white px-16 py-3 text-sm"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
