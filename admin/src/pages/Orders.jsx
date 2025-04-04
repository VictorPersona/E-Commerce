import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { images } from '../assets/Assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(
        backendUrl + '/api/orders/list',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])
  return (
    <div>
      <div>
        <h3>Order Page</h3>
        <div className="">
          {orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs xm:text-sm text-gray-700' key={index}>
              <img src={images.Parcel} alt="" />
              <div>
                <div className="">
                  {order.items.map((index, item) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p key={index}>
                          {item.name} x {item.quantity}
                          <span>{item.size}</span>
                        </p>
                      )
                    } else {
                      return (
                        <p key={index}>
                          {item.name} x {item.quantity}
                          <span>{item.size} ,</span>
                        </p>
                      )
                    }
                  })}
                </div>
                <p>
                  {order.firstName} {order.lastName}
                </p>
                <div className="">
                  <p>{order.street}</p>
                  <p>
                    {order.city} {order.state} {order.country} {order.zipcode}
                  </p>
                </div>
                <p>{order.phone}</p>
              </div>
              <div className="">
                <p>Items : {order.items.length}</p>
                <p>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p>
                {currency}
                {order.amount}
              </p>
              <select name="" id="">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders
