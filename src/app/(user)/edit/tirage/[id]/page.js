import FormEditTirage from '@/app/_components/(adminEdit)/FormEditTirage'
import AdminRoute from '@/app/_components/AdminRoute'
import React from 'react'

export default function TirageEdit() {
  return (
    <div>
        <AdminRoute>
            <FormEditTirage />
        </AdminRoute>
    </div>
  )
}
