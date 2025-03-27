import React from 'react'
import { images } from '../assets/asset'

const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      <div className="">
        <img src={images.logo} alt="" className="mb-5 w-32" />
      </div>
    </div>
  )
}

export default Footer
