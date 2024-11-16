import FormAddCadeaux from '@/app/_components/(adminAdd)/FormAddCadeaux'
import AdminRoute from '@/app/_components/AdminRoute'
import React from 'react'

export default function cadeauxPage() {
  return (
    <div>
      <AdminRoute >
         <FormAddCadeaux />
      </AdminRoute>
  
    </div>
  )
}
