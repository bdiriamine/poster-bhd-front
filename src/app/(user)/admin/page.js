import AdminRoute from '../../_components/AdminRoute';
import React from 'react'
import Navsideadmin from '@/app/_components/navsideadmin/Navsideadmin';

const admin = () => {
  
  return (
    <AdminRoute>
        <Navsideadmin />
      {/* Contenu du admin */}
    </AdminRoute>
  );
};

export default admin;