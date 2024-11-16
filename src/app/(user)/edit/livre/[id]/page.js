import FormEditLivre from '@/app/_components/(adminEdit)/FormEditLivre'
import AdminRoute from '@/app/_components/AdminRoute'
import React from 'react'

export default function livreEditePage() {
  return (
    <div>
      <AdminRoute>
      <FormEditLivre />
      </AdminRoute>

    </div>
  )
}
