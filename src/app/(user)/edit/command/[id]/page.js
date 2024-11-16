import AdminRoute from '@/app/_components/AdminRoute'
import CommandEdit from '@/app/_components/(adminEdit)/CommandEdit'
import React from 'react'

export default function editCommand() {
  return (
    <div>
        <AdminRoute>
        <CommandEdit />
      </AdminRoute>
    </div>
  )
}
