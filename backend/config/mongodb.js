import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONOGDB_URI not found')
    }

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully')
    })

    mongoose.connection.on('error', (err) => {
      console.log('❌ MongoDB connection error:', err)
    })

    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
    console.log('❌ Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}
