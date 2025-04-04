import express from 'express'
import userModel from '../models/userModel'

const addToCart = async (req, res) => {
  try {
    const { userId, itemID, size } = req.body

    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData
    if (cartData[itemID]) {
      if (cartData[itemID][size]) {
        cartData[itemID][size] += 1
      } else {
        cartData[itemID][size] = 1
      }
    } else {
      cartData[itemID] = {}
      cartData[itemID][size] = 1
    }
    await userModel.findByIdAndUpdate(userId, { cartData })
    res.json({ success: true, message: 'Item successfully added to cart' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error in Adding item to cart' })
  }
}

const updateCart = async (req, res) => {
  try {
    const { userId, itemID, size, quantity } = req.body

    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData

    cartData[itemID][size] = quantity

    await userModel.findByIdAndUpdate(userId, { cartData })

    res.json({ success: true, message: 'Cart Sucessfully Updated' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'Error in Updating Cart' })
  }
}

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body
    const userData = await userModel.findById(userId)

    let cartData = await userData.cartData

    res.json({ success: true, cartData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export default { addToCart, updateCart, getUserCart }
