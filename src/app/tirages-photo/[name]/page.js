import GlobelPeinture from '@/app/_components/(peinture-murales)/globelPeinture';
import PrivateRoute from '@/app/_components/PrivateRoute';
import React from 'react'
export default function TiragepageDetailes({ params }) {
    const encodedId = params.name; 
const cleanedId = encodedId.replace(/%20/g, ' ');
console.log(cleanedId)
  return (
    <div>
            <PrivateRoute>
      <GlobelPeinture msg={cleanedId} />
      </PrivateRoute>
    </div>
  )
}
