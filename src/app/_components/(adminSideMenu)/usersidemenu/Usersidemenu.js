"use client"; 
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';
import { TiUserAddOutline } from "react-icons/ti";

export default function UserSideMenu() {
    const [data, setData] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Failed to fetch users');
                
                const users = await response.json();
                setData(users.data);
            } catch (error) {
                console.error(error);
                alert('Failed to load users');
            }
        };

        fetchUsers();
    }, [token]);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${userId}?ts=${new Date().getTime()}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Failed to delete user');
                setData(data.filter(user => user._id !== userId));
                alert('User deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to delete user');
            }
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-700">Liste des Utilisateurs</h2>
                <Link href={'/admin/edit/user'}>
                    <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Ajouter Utilisateur <TiUserAddOutline className="ml-2 text-xl" />
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {data.length > 0 ? (
                    data.map((user) => (
                        <div key={user._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
                            <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
                            <p className="text-gray-600"><strong>Role:</strong> {user.role}</p>
                            <p className="text-gray-600"><strong>Status:</strong> {user.active ? 'Actif' : 'Inactif'}</p>
                            <p className="text-gray-600"><strong>Phone:</strong> {user.phone}</p>
                            <p className="text-gray-600"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                            <p className="text-gray-600"><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>

                            <div className="flex justify-end mt-4 space-x-2">
                                <Link href={`/edit/user/${user._id}`}>
                                    <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
                                        <GrEdit className="text-xl" />
                                    </button>
                                </Link>
                                <button 
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600" 
                                    onClick={() => handleDelete(user._id)}
                                >
                                    <MdDeleteForever className="text-xl" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700">Aucune donnée disponible</p>
                )}
            </div>
        </div>
    );
}