import FormEditProduct from '@/app/_components/(adminEdit)/FormEditProduct'
import AdminRoute from '@/app/_components/AdminRoute'
import React from 'react'

export default function EditPageProduit() {
  return (
    <div>
      <AdminRoute>
      <FormEditProduct />
      </AdminRoute>
    
    </div>
  )
}
