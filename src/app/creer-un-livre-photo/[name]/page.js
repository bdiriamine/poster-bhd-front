import LivreProduct from '@/app/_components/(creerLivre)/LivreProduct/LivreProduct';
import PrivateRoute from '@/app/_components/PrivateRoute';
import React from 'react'

export default function infoLivre({params}) {
    const encodedId = params.name; 
    const cleanedId = encodedId.replace(/%20/g, ' ');
    console.log(cleanedId)
    
      return (
        <div>
          <PrivateRoute>
          <LivreProduct msg={cleanedId} />
          </PrivateRoute>
         
        </div>
      )
    }