import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { images } from '../assets/asset'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, showSearch, setSearch, setShowSearch } =
    useContext(ShopContext)

    const [visible,setVisible] = useState(false)
    const location = useLocation();
    
    useEffect(()=>{
        if (location.pathname.includes('collection')) {
          setVisible(true)
        } else {
          setVisible(false)
        }
    },[location])

  return (
    <div>
      {showSearch && visible ? (
        <div className="border-t border-b bg-gray-50 text-center">
          <div className="inline-flex items-center justify-center border border-gray-400 px-5 border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              className="flex-1 outline-none bg-inherit text-sm"
              placeholder="Search"
            />
            <img src={images.search} className='w-7 mr-3 cursor-pointer' alt="" />
            <img onClick={()=>setShowSearch(false)} src={images.cross} className="w-4 cursor-pointer" alt="" />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SearchBar
