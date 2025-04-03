import React from 'react'
import { images } from '../assets/Assets'

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={images.Logo} alt="" className="w-[max(10%,80px)]" />
      <button
        onClick={() => setToken('')}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 cursor-pointer rounded-full text-xs sm:text-sm"
      >
        Log Out
      </button>
    </div>
  )
}

export default Navbar
