import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      {/* About Us Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={' US'} />
      </div>
      <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 mx-auto">
        <p>
          Welcome to our e-commerce platform, where we bring you the best
          products at unbeatable prices. Our mission is to provide a seamless
          shopping experience, combining quality, affordability, and
          convenience.
        </p>
        <p>
          We are committed to offering a wide range of products to meet your
          needs, whether you're shopping for the latest gadgets, stylish
          apparel, or everyday essentials. Our team works tirelessly to ensure
          that every product meets the highest standards of quality and
          reliability.
        </p>
        <b className="text-gray-800">Our Mission</b>
        <p>
          Our mission is to revolutionize the way you shop by providing a
          platform that is easy to use, secure, and customer-focused. We aim to
          build long-lasting relationships with our customers by delivering
          exceptional value and unparalleled service.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-4xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        {/* Quality Measurement */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Measurement</b>
          <p className="text-gray-600">
            We prioritize quality in everything we do. From sourcing products to
            delivering them to your doorstep, we ensure that every step of the
            process meets the highest standards. Our rigorous quality checks
            guarantee that you receive only the best.
          </p>
        </div>

        {/* Convenience */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Shopping with us is simple and hassle-free. Our user-friendly
            platform allows you to browse, compare, and purchase products with
            ease. Enjoy fast shipping and multiple payment options to suit your
            preferences.
          </p>
        </div>

        {/* Exceptional Customer Service */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated customer service team is here to assist you every step
            of the way. Whether you have questions about a product or need help
            with an order, we are committed to providing prompt and helpful
            support.
          </p>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <NewsLetterBox />
    </div>
  )
}

export default About
