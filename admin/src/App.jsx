import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from '../../frontend/src/pages/Orders'
import { useState } from 'react'
import Login from './components/Login'

const App = () => {
  const [token, setToken] = useState('')

  return (
    <div>
      {token === '' ? (
        <Login />
      ) : (
        <div>
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
