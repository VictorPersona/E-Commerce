/**
 * Middleware to authenticate admin users based on a JWT token.
 * 
 * This middleware checks the `Authorization` header for a valid JWT token.
 * It verifies the token using the secret key and ensures the email in the token
 * matches the admin email specified in the environment variables.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.headers - The headers of the HTTP request.
 * @param {string} req.headers.authorization - The authorization header containing the JWT token.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 * 
 * @returns {void} Sends a JSON response with an error message if authentication fails.
 * 
 * @throws {Error} If there is an issue verifying the token or processing the request.
 * 
 * Environment Variables:
 * - `JWT_SECRET`: The secret key used to verify the JWT token.
 * - `ADMIN_EMAIL`: The email address of the admin user for validation.
 */
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
    
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
   
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
