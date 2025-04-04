import express from "express"
import orderModel from "../models/orderModel"

const placeOrder = async (req,res) => {
    try {
        const {userId,items,amount,address} = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            date: Date.now(),
            placeOrder:'cod'
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

    } catch (error) {
        
    }
}

const placeOrderStripe = async (req,res) => {
    
}

const placeOrderRazorpay = async (req, res) => {}








const allOrders = async (req, res) => {}
const userOrders = async (req, res) => {}

const updateStatus = async (req, res) => {}

export default {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}