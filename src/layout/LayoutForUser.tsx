import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const LayoutForUser = () => {
  return (
    <div className='bg-[#FFF5E1] min-h-screen'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default LayoutForUser