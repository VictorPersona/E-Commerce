import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const adminAuth = async (req, res, next) => {
  try {
    console.log('Received Authorization Header:', req.headers.authorization)

    const adminToken = req.headers.authorization

    if (!adminToken) {
      return res.json({ success: false, message: 'Admin token not found' })
    }
    const token = adminToken.startsWith('Bearer ')
      ? adminToken.split(' ')[1]
      : adminToken
    console.log('Extracted Token:', token) // Debugging
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Decoded Token:', token_decode) // Debugging
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: 'Not Authorized , Please login again',
      })
    }

    next()
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'error in admin authentication',
      error,
    })
  }
}
