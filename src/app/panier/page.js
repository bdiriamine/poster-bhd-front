import React from 'react'
import PanierForm from '../_components/(panier)/panierForm/PanierForm'
import PrivateRoute from '../_components/PrivateRoute'

export default function panier() {
  return (
    <div>
        <PrivateRoute>
           <PanierForm />
        </PrivateRoute>  
    </div>
  )
}
