import React from 'react'
import { NavLink } from 'react-router-dom'
import { images } from '../assets/Assets'

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="/add"
          className="flex items-center gap-3 border border-gray-300 broder-r-0 px-3 py-2 rounded-1"
        >
          <img className="w-5 h-5" src={images.Add} alt="" />
          <p className="hiddem md:block">Add Items</p>
        </NavLink>
      </div>
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="/list"
          className="flex items-center gap-3 border border-gray-300 broder-r-0 px-3 py-2 rounded-1"
        >
          <img className="w-5 h-5" src={images.List} alt="" />
          <p className="hiddem md:block">List Items</p>
        </NavLink>
      </div>
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="/orders"
          className="flex items-center gap-3 border border-gray-300 broder-r-0 px-3 py-2 rounded-1"
        >
          <img className="w-5 h-5" src={images.Orders} alt="" />
          <p className="hiddem md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
