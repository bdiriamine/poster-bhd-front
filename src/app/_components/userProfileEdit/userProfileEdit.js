"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/_utils/AuthProvider';
import { toast } from 'react-toastify';
import Loader from '../loader/loader';

export default function UserProfileEdit() {
  const route = useRouter();
  const { id } = useParams();
  const { token } = useAuth();
  const [user, setUser] = useState({
    name: '',
    phone: '',
    profileImg: '',
  });
  const [imageFile, setImageFile] = useState(null); // State for storing the selected file
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Utilisateur introuvable');
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm("Êtes-vous sûr de vouloir mettre à jour cet utilisateur ?");

    if (confirmUpdate) {
      try {
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('phone', user.phone);
        formData.append('email', user.email);

        // Check if a new image file is selected, otherwise use the existing URL
        if (imageFile) {
          formData.append('profileImg', imageFile);
        } else {
          formData.append('profileImg', user.profileImg);
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
          credentials: 'include',
        });

        if (!response.ok) throw new Error("Échec de la mise à jour de l'utilisateur");
        toast.success("L'utilisateur a été mis à jour avec succès !");
        setTimeout(() => {
          route.push('/');
        }, 2000);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.info('Mise à jour annulée.');
    }
  };

  if (loading) return <p className="text-center"><Loader /></p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Modifier contenu utilisateur</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Image</label>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
          />
          <p className="text-sm text-gray-500 mt-1">URL actuel: {user.profileImg}</p>
        </div>


        <button
          type="submit"
          className="w-full bg-cyan-500 text-white py-2 rounded-md hover:bg-teal-700 transition"
        >
          Update User
        </button>
      </form>
    </div>
  );
};
