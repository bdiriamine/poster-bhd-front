import PrivateRoute from '../../_components/PrivateRoute'
import React from 'react'

const Profile = () => {
  return (
    <PrivateRoute>
      <h1>Profil de l'utilisateur</h1>
      {/* Contenu du profil */}
    </PrivateRoute>
  );
};

export default Profile;