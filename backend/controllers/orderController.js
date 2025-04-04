import express from 'express'
import orderModel from '../models/orderModel.js'

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
    res.json({success:false,message:"Error in place Order"})
  }
}

const placeOrderStripe = async (req, res) => {}

const placeOrderRazorpay = async (req, res) => {}

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
 
}
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body
        const orders = await userModel.findById(userId)
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error in getting user orders"})
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
}
