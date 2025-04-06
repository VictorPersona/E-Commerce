import express from 'express'
import orderModel from '../models/orderModel.js'
import Stripe from 'stripe'
import razorPay from 'razorpay'

const currency = 'inr'
const deliveryCharge = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorPay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body
    const orderData = {
      userId,
      items,
      amount,
      address,
      date: Date.now(),
      placeOrder: 'cod',
    }
    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, { cartData: {} })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error in place Order' })
  }
}

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body
    const { origin } = req.headers

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now(),
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }))

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    })
    res.json({ success: true, session_url: session.url })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to place order' })
  }
}

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body

  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      res.json({ success: false })
    } else {
      await orderModel.findByIdAndUpdate(orderId)
      res.json({ success: false })
    }
  } catch (error) {}
}

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body
    const { origin } = req.headers

    const orderData = {
      userId,
      items,
      address,
      amount,
      paytmentMethod: 'Razorpay',
      payment: false,
      date: Date.now(),
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    const options = {
      amount:amount * 100,
      currency:currency.toUpperCase(),
      receipt : newOrder._id.toString()
    }

    await razorpayInstance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error)
        return res.json({success:false,message:error})
      }
      res.json({success:true,order})
    })

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

const verifyRazorpay = async(req,res)=>{
  try {
    const {userId,razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.stats == "paid"){
      await orderModel.findByIdAndUpdate(orderInfo.recepit,{payment:true})
      await userModel.findByIdAndUpdate(userId,{cartData:{}})
      res.json({success:true,message:'Payment Successful'})
    }else{
      res.json({success:false,message:'Payment Failed'})
    }
  } catch (error) {
    
  }
}

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body
    const orders = await userModel.findById(userId)
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error in getting user orders' })
  }
}

const updateStatus = async (req, res) => {}

export default {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay
}
