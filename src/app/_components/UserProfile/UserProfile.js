"use client";
import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/_utils/AuthProvider';

const UserProfile = () => {
    const { token } = useAuth();
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'user',
    });
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/getMe`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('User not found');
                const data = await response.json();
                setUser(data.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserData();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) throw new Error('Failed to update user');
            toast.success('User updated successfully');
            setEditing(false); // Exit editing mode
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <AiOutlineUser className="text-4xl text-teal-600 mr-3" />
                <h1 className="text-3xl font-bold">User Profile</h1>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Name</h2>
                <p className="text-gray-700">{user.name}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Email</h2>
                <p className="text-gray-700">{user.email}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Role</h2>
                <p className="text-gray-700">{user.role}</p>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Status</h2>
                <p className={`text-gray-700 ${user.active ? 'text-green-500' : 'text-red-500'}`}>
                    {user.active ? 'Active' : 'Inactive'}
                </p>
            </div>
            <div className="mt-6">
                <button className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default UserProfile;