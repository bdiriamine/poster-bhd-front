import ListeProduct from '@/app/_components/(calendrierPhoto)/ListeProduct/ListeProduct'
import React from 'react'

export default function calendrierPhotoInfo({ params }) {
    const encodedId = params.name; 
const cleanedId = encodedId.replace(/%20/g, ' ');
console.log(cleanedId)
  return (
    <div>
      <ListeProduct msg={cleanedId} />
    </div>
  )
}
