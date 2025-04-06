import express from 'express'

import orderController from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'
import { adminAuth } from '../middleware/adminAuth.js'


const {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay
} = orderController

const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

//User Features
orderRouter.post('/userorders', authUser, userOrders)

//Verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
//orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter
