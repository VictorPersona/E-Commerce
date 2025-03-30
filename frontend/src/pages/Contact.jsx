import React from 'react'
import Title from '../components/Title'
import { images } from '../assets/asset'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={images.hero} className="w-full md:max-w-[480px]" alt="Contact Us" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-600">123 Main Street, Springfield, USA</p>
          <p className="text-gray-600">Phone: (123) 456-7890 | Email: contact@company.com</p>
          <p className="font-semibold text-xl text-gray-600">Careers at Company</p>
          <p className="text-gray-600">Join our team and grow with us. Explore exciting career opportunities.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact
