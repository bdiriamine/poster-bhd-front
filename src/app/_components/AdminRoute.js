"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../_utils/AuthProvider';
import Loader from './loader/loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Récupérer l'utilisateur et l'état de chargement
  const router = useRouter();


  useEffect(() => {
    if (user?.role!="admin") {
      router.push('/'); // Rediriger si non authentifié
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader />; // Afficher le loader pendant le chargement
  }

  return user ? children : null; // Rendre les enfants si authentifié
};

export default AdminRoute;