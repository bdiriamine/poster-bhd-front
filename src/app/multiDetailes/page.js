import React from 'react'
import Downloadmultiple from '../_components/downloadImage/downloadmultiple'
import PrivateRoute from '../_components/PrivateRoute'

export default function multiDetailesPage() {
  return (
    <PrivateRoute>
            <div>
               <Downloadmultiple />
            </div>
    </PrivateRoute>

  )
}
