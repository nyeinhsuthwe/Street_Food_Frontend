import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from 'react-router'

const LayoutForAdmin = () => {
  return (
    <div className='flex'>
        <AdminSidebar/>
        <Outlet/>
    </div>
  )
}

export default LayoutForAdmin