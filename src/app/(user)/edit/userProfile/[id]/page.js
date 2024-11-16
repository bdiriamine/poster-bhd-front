import PrivateRoute from '@/app/_components/PrivateRoute'
import UserProfileEdit from '@/app/_components/userProfileEdit/userProfileEdit'
import React from 'react'

export default function userProfile() {
  return (
    <div>
        <PrivateRoute>
          <UserProfileEdit />
        </PrivateRoute>
       
    </div>
  )
}
