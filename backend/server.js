import express from 'express'
import cors from 'cors'
import { connectDB } from './config/mongodb.js'
import dotenv from 'dotenv'
import { connectCloudinary } from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoute.js'
import orderRouter from './routes/orderRoute.js'

//App Config
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

//Middlewares
app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary()

//API
app.get('/', (req, res) => {
  res.send('API Working')
})

app.listen(PORT, () => {
  console.log('Server has started running on port', PORT)
})

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order',orderRouter)
