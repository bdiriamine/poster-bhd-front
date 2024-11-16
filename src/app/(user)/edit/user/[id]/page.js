import EditUser from '@/app/_components/(adminEdit)/EditUser'
import AdminRoute from '@/app/_components/AdminRoute'
import React from 'react'

export default function EditUserwithId() {
  return (
    <div>
      <AdminRoute>
      <EditUser />
      </AdminRoute>
      
    </div>
  )
}
