import UserProfile from '@/app/_components/UserProfile/UserProfile';
import PrivateRoute from '../../_components/PrivateRoute'
import React from 'react'

const Profile = () => {
  return (
    <PrivateRoute>
        <UserProfile />

    </PrivateRoute>
  );
};

export default Profile;