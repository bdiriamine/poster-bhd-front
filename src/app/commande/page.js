import React from 'react'
import CommandProfile from '../_components/(commandForms)/commandProfile/Commandprofile'
import PrivateRoute from '../_components/PrivateRoute'

export default function commandePage() {
  return (
    <div>
          <PrivateRoute>
            <CommandProfile />
          </PrivateRoute>
    </div>
  )
}
