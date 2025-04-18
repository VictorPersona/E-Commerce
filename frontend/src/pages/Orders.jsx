import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { product, currency, token, backendUrl } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(
        backendUrl + '/api/order/userOrders',
        {},
        { Headers: { Authorization: `Bearer ${token}` } }
      )
      if(response.data.success){
        const allOrderItems = []
        response.data.orders.map((order)=>{
            order.items.map((item)=>{
              item['status']= order.status
              item['payment'] = order.payment
              item['paymentMethod'] = order.paymentMethod
              item['date'] = order.date
              allOrderItems.push(item)
              setOrderData(allOrderItems.reverse())
            })
      })}
    } catch (error) {}
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'My '} text2={'Orders'} />
      </div>
      <div className="">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
              <div className="">
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p className="text-lg">{item.quantity}</p>
                  <p className="text-lg">{item.size}</p>
                </div>
                <p className="mt-2">
                  Date <span className="text-gray-400">{item.date}</span>
                </p>
                <p className="mt-2">
                  Payment Method <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={()=>loadOrderData()} className="border px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
