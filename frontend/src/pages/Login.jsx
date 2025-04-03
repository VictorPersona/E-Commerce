import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [currentState, setCurrentState] = useState('LOGIN')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (currentState == 'SIGNUP') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('Error in Login')
    }
  }

useEffect(()=>{
  if(token){
    navigate('/')
  }
},[token])

  return (
    <form
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      onSubmit={onSubmitHandler}
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="parta-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState == 'LOGIN' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-3 py-2 border  border-gray-800"
          type="text"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full px-3 py-2 border  border-gray-800"
        type="email"
        placeholder="E-mail"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full px-3 py-2  border border-gray-800"
        type="password"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your Password</p>
        {currentState == 'SIGNUP' ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState('LOGIN')}
          >
            Login
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState('SIGNUP')}
          >
            Sign Up
          </p>
        )}
      </div>
      <button className=" cursor-pointer bg-black text-white font-light px-8 py-2 mt-4">
        {currentState == 'SIGNUP' ? (
          <p className="cursor-pointer">Sign Up</p>
        ) : (
          <p className="cursor-pointer">Log In</p>
        )}
      </button>
    </form>
  )
}

export default Login
