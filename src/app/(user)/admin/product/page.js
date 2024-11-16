import FormAddProduct from '@/app/_components/(adminAdd)/FormAddProduct'
import AdminRoute from '@/app/_components/AdminRoute'
import React from 'react'

export default function AddProductPage() {
  return (
    <div>
      <AdminRoute >
      <FormAddProduct />
      </AdminRoute>
  
    </div>
  )
}
