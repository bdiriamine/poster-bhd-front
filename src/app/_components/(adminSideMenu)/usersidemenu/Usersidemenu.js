"use client";
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';
import { TiUserAddOutline } from "react-icons/ti";

export default function UserSideMenu({ datares }) {
    const [data, setData] = useState([]);
    const { token } = useAuth();
    useEffect(() => {
        if (datares) {
            setData(datares);
        }
    }, [datares]);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                const response = await fetch(`text-https://poster-bhd-backend-production.up.railway.app/api/v1/users/${userId}`, {
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
        <div className="bg-teal-50 dark:bg-teal-900 min-h-screen rounded-lg">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded bg-teal-100 dark:bg-teal-800">
                    <p className="text-2xl text-white">
                        Liste des utilisateurs
                    </p>
                </div>
            )}
            <div className="p-4 border-2 border-teal-200 border-dashed rounded-lg dark:border-teal-700">
                {data.length > 0 ? (
                    <>
                        {data.map((user) => (
                            <div key={user._id} className="border p-4 mb-2 rounded-lg bg-white dark:bg-teal-800 text-white dark:text-white">
                                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                                <p className="text-white"><strong>Email:</strong> {user.email}</p>
                                <p className="text-white"><strong>Role:</strong> {user.role}</p>
                                <p className="text-white"><strong>Status:</strong> {user.active ? 'Actif' : 'Inactif'}</p>
                                <p className="text-white"><strong>Phone:</strong> {user.phone}</p>
                                <p className="text-white"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                                <p className="text-white"><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>

                                <div className="mt-2">
                                    <Link href={`/edit/${user._id}`}>
                                        <button className="bg-teal-600 text-white p-2 m-2 rounded-lg">
                                            <GrEdit className="text-white text-xl" />
                                        </button>
                                    </Link>

                                    <button 
                                        className="bg-red-600 text-white p-2 rounded-lg ml-2" 
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        <MdDeleteForever className="text-white text-xl" />
                                    </button>
                                    <button className="bg-yellow-500 text-white p-2 rounded-lg ml-2" >
                                        <Link href={'/admin/user'}>   <TiUserAddOutline className="text-white text-xl" />  </Link>
                                      
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p className="text-white">Aucune donnée disponible</p>
                )}
            </div>
        </div>
    );
}