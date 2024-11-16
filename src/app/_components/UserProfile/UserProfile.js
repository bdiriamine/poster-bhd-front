"use client"; 
import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/_utils/AuthProvider';
import Link from 'next/link';
import Image from 'next/image';

const UserProfile = () => {
  const { token } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    role: 'user',
    profileImg: '',
    active: false,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/getMe?ts=${new Date().getTime()}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
          }
        );

        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [token]);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl transform transition-all hover:scale-105 duration-300 border-4 border-transparent hover:border-teal-500 hover:animate-pulse">
      <div className="flex items-center justify-center mb-6">
        {/* Profile Image */}
        {user.profileImg ? (
          <Image
            src={user.profileImg}
            alt="User Profile"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover border-4 border-teal-500 shadow-lg"
          />
        ) : (
          <AiOutlineUser className="text-6xl text-teal-600 border-4 border-teal-500 p-3 rounded-full" />
        )}
      </div>

      <h1 className="text-3xl font-semibold text-center text-cyan-600 mb-4">Profil de l'utilisateur</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-medium text-gray-800">Nom</h2>
          <p className="text-base sm:text-lg text-gray-600">{user.name}</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-gray-800">Email</h2>
          <p className="text-base sm:text-lg text-gray-600 break-words">{user.email}</p>
        </div>

        {user.phone && (
          <div>
            <h2 className="text-xl font-medium text-gray-800">Téléphone</h2>
            <p className="text-base sm:text-lg text-gray-600">{user.phone}</p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-medium text-gray-800">Type</h2>
          <p className="text-base sm:text-lg text-gray-600">{user.role}</p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-gray-800">Statut</h2>
          <p
            className={`text-base sm:text-lg font-semibold ${
              user.active ? 'text-cyan-600' : 'text-red-600'
            }`}
          >
            {user.active ? 'Active' : 'Inactive'}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link href={`/edit/userProfile/${user._id}`}>
          <button className="w-full bg-cyan-600 text-white py-3 rounded-lg shadow-md hover:bg-cyan-700 transition-colors">
            Modifier le profil
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
