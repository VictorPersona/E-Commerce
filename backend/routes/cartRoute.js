import express from 'express'
import cartController from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const { addToCart, updateCart, getUserCart } = cartController
const cartRouter = express.Router()

cartRouter.post('/add', authUser, addToCart)
cartRouter.put('/update', authUser, updateCart)
cartRouter.get('/getCart', authUser, getUserCart)

export default cartRouter
