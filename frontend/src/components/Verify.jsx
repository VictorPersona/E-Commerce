import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
  const [searchParams, setSearchParams] = useSearchParams()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPayment = async () => {
    try {
        if(!token){
            return null
        }
        const response = await axios.post(backendUrl + '/api/order/verifyStripe',{success,orderId},{Headers:{Authorization:`Bearer ${token}`}})

        if(response.data.success){
            setCartItems({})
            navigate('/orders')
        }else{
            navigate('/')
        }

    } catch (error) {
        
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token])

  return <div>Verify</div>
}

export default Verify
