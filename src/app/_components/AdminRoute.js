"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../_utils/AuthProvider';
import Loader from './loader/loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== "admin") {
      router.push('/'); // Redirect if not admin and loading is done
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loader />; // Show loader during loading
  }

  return user ? children : null; // Render children if authenticated
};

export default AdminRoute;