import React from 'react'
import DownloadImage from '../_components/downloadImage/downloadImage'
import PrivateRoute from '../_components/PrivateRoute'

export default function download() {
  return (
    <div>
      <PrivateRoute>
        <DownloadImage />
      </PrivateRoute>
      
    </div>
  )
}
