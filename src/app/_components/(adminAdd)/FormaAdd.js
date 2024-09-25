"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_utils/AuthProvider';

const FormAdd = () => {
    const { token } = useAuth();
    const router = useRouter(); // Initialize the router
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirm: '',
        role: 'user',
        profileImg: '',
        active: true, // Default to active
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.passwordConfirm) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await fetch('text-https://poster-bhd-backend-production.up.railway.app/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) throw new Error('Failed to add user');
            toast.success('User added successfully');
            
            setTimeout(() => {
                router.push('/');
            }, 2000); 

            setUser({ name: '', email: '', phone: '', password: '', passwordConfirm: '', role: 'user', profileImg: '', active: true });
            setError('');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Add User</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        name="passwordConfirm"
                        value={user.passwordConfirm}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
                        required
                    />
                </div>
                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="active"
                            checked={user.active}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Active
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                    <input
                        type="text"
                        name="profileImg"
                        value={user.profileImg}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                >
                    Add User
                </button>
            </form>
        </div>
    );
};

export default FormAdd;