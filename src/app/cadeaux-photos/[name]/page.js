import ProductListCadeaux from '@/app/_components/(cadeaux-photo)/ProductList/ProductList';
import PrivateRoute from '@/app/_components/PrivateRoute';
import React from 'react'

export default function page({ params }) {
    const encodedId = params.name; 
const cleanedId = encodedId.replace(/%20/g, ' ');
console.log(cleanedId)
  return (
    <PrivateRoute>
            <ProductListCadeaux msg={cleanedId}/>
    </PrivateRoute>

  )
}
