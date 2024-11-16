import FormAddCalendrier from '@/app/_components/(adminAdd)/FormAddCalendrier'
import AdminRoute from '@/app/_components/AdminRoute'
import React from 'react'

export default function calendrierPage() {
  return (
    <div>
      <AdminRoute>
      <FormAddCalendrier />
       </AdminRoute>

    </div>
  )
}
