import express from 'express'
import {addToCart, updateCart, getUserCart} from '../controllers/cartController.js'

const cartRouter = express.Router()