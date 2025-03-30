import React, { useContext, useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('SIGNUP')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }

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
          className="w-full px-3 py-2 border  border-gray-800"
          type="text"
          placeholder="Name"
          required
        />
      )}
      <input
        className="w-full px-3 py-2 border  border-gray-800"
        type="email"
        placeholder="E-mail"
        required
      />
      <input
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
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
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
      </button>
    </form>
  )
}

export default Login
