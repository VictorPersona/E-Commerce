import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

//User Login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email: email })

    if (!user) {
      return res.json({ success: false, message: "User dosen't exit" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: 'Wrong Password' })
    }
    const token = await createToken(user.id)
    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: 'User login error', error: error })
  }
}

//User Registration

export const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const exist = await userModel.findOne({ email: email })

    if (exist) {
      return res.json({ success: false, message: 'User already exists' })
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid Email' })
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Password is less than 8 characters',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    })

    await newUser.save()

    const token = await createToken(newUser.id)

    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: 'user registration error',
      error: error,
    })
  }
}

//Admin Registration
export const adminLogin = async (req, res) => {}
