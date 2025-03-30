import React from 'react'
import { images } from '../assets/asset'

const Footer = () => {
  return (
    <div className="">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* About Section */}
        <div>
          <img src={images.logo} alt="Company Logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            We are your trusted e-commerce platform, dedicated to providing
            high-quality products at competitive prices. Our goal is to make
            your shopping experience seamless, secure, and enjoyable. Thank you
            for choosing us as your go-to shopping destination.
          </p>
        </div>

        {/* Company Links Section */}
        <div className="">
          <p className="text-xl font-medium">COMPANY</p>
          <div className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Phone: +1 (123) 456-7890</li>
            <li>Email: support@ecommerce.com</li>
            <li>Address: 123 E-Commerce St, Online City, Web</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="">
        <hr className="border-gray-300" />
        <p className="py-5 text-sm text-center text-gray-600">
          © {new Date().getFullYear()} E-Commerce Platform. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
