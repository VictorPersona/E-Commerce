import React from 'react'
import { images } from '../assets/asset'

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={images.stuff} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
          corrupti ullam esse, deserunt, at odit facere sint mollitia in et
          incidunt, culpa dicta voluptate accusamus vel illo inventore
          veritatis. Saepe.
        </p>
      </div>
      <div>
        <img src={images.stuff} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
          corrupti ullam esse, deserunt, at odit facere sint mollitia in et
          incidunt, culpa dicta voluptate accusamus vel illo inventore
          veritatis. Saepe.
        </p>
      </div>
      <div>
        <img src={images.stuff} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
          corrupti ullam esse, deserunt, at odit facere sint mollitia in et
          incidunt, culpa dicta voluptate accusamus vel illo inventore
          veritatis. Saepe.
        </p>
      </div>
    </div>
  )
}

export default OurPolicy
