"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../_utils/AuthProvider';
import Loader from './loader/loader';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Récupérer l'utilisateur et l'état de chargement
  const router = useRouter();


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Rediriger si non authentifié
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader />; // Afficher le loader pendant le chargement
  }

  return user ? children : null; // Rendre les enfants si authentifié
};

export default PrivateRoute;