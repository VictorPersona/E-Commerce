import express from 'express'
import {
  loginUser,
  userRegistration,
  adminLogin,
} from '../controllers/userController.js' 
import { adminAuth } from '../middleware/adminAuth.js'

const userRouter = express.Router()

userRouter.post('/register',userRegistration)
userRouter.post('/login',loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter