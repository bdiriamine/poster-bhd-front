import FormEditCalendrier from '@/app/_components/(adminEdit)/FormEditCalendrier'
import AdminRoute from '@/app/_components/AdminRoute'
import React from 'react'

export default function CalendrierEditPage() {
  return (
    <div>
      <AdminRoute>
      <FormEditCalendrier />
      </AdminRoute>

    </div>
  )
}
