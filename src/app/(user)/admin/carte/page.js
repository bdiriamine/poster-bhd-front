import FormAddCarte from '@/app/_components/(adminAdd)/FormAddCarte'
import AdminRoute from '@/app/_components/AdminRoute'
import React from 'react'

export default function cartePage() {
  return (
    <div>
      <AdminRoute>
      <FormAddCarte />
      </AdminRoute>

    </div>
  )
}
