import React from 'react'
import { images } from '../assets/asset'

const Footer = () => {
  return (
    <div className="">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={images.logo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
            quasi quod repudiandae perspiciatis ad dolorum nulla impedit
            voluptate aliquid inventore esse numquam expedita, iste ea facere
            delectus eaque quibusdam laboriosam!
          </p>
        </div>

        <div className="">
          <p className="text-xl font-medium">COMPANY</p>
          <div className="flex flex-col gap-2 text-gray-600">
            <li>HOME</li>
            <li>ABOUT US</li>
            <li>DELIVERY</li>
            <li>PRIVACY POLICY</li>
          </div>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>123 456 789</li>
            <li>example@email.com</li>
          </ul>
        </div>
      </div>
      <div className="">
        <hr className='border-none'/> <p className="py-5 text-sm text-center">Copyright</p>{' '}
      </div>
    </div>
  )
}

export default Footer
