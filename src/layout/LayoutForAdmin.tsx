import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from 'react-router'

const LayoutForAdmin = () => {
  return (
    <div className='flex bg-[#F9F5F0] h-screen overflow-hidden'>
        <AdminSidebar/>
        <Outlet/>
    </div>
  )
}

export default LayoutForAdmin