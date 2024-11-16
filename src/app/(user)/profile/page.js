import UserProfile from '@/app/_components/UserProfile/UserProfile';
import PrivateRoute from '../../_components/PrivateRoute';
import React from 'react';
import CommandProfile from '@/app/_components/(commandForms)/commandProfile/Commandprofile';

const Profile = () => {
  return (
    <PrivateRoute>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6">
        <div className="w-full max-w-4xl px-6">
          {/* Profile Header Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-800">Votre Profil</h1>
            <p className="text-sm text-gray-600 mt-2">Gérez votre compte et vos commandes</p>
          </div>

          {/* Command Profile and User Profile Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <CommandProfile className="mt-2" />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <UserProfile className="mt-2" />
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Profile;