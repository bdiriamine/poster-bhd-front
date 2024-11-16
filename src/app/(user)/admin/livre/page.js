import FormAddLivre from '@/app/_components/(adminAdd)/FormAddLivre'
import AdminRoute from '@/app/_components/AdminRoute'
import React from 'react'

export default function livrePage() {
  return (
    <div>
      <AdminRoute >
        <FormAddLivre />
      </AdminRoute>

    </div>
  )
}
