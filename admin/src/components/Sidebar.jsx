import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
        <div className="">
            <NavLink to="/add">
            <p>Add</p>
            <img src="" alt="" />
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar