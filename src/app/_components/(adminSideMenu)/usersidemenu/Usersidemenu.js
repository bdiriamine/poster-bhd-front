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
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${userId}`, {
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
        <div className=" bg-teal-900 min-h-screen rounded-lg">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded  bg-teal-800">
                    <p className="text-2xl text-white">
                        Liste des utilisateurs
                    </p>
                </div>
            )}
            <div className="p-4 border-2 border-dashed rounded-lg border-teal-700">
                {data.length > 0 ? (
                    <>
                        {data.map((user) => (
                            <div key={user._id} className="border p-4 mb-2 rounded-lg  bg-teal-800 text-white">
                                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                                <p className="text-white"><strong>Email:</strong> {user.email}</p>
                                <p className="text-white"><strong>Role:</strong> {user.role}</p>
                                <p className="text-white"><strong>Status:</strong> {user.active ? 'Actif' : 'Inactif'}</p>
                                <p className="text-white"><strong>Phone:</strong> {user.phone}</p>
                                <p className="text-white"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                                <p className="text-white"><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>

                                <div className="mt-2">
                                    <Link href={`/edit/user/${user._id}`}>
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
                                </div>
                            </div>
                        ))}
                                                         <Link href={'/admin/edit/user'}>    <button className=" flex flex-row space-x-4  bg-yellow-500 text-white p-2 rounded-lg ml-2 w[100%]" >
                                        Ajouter Utilisateur  <TiUserAddOutline className="text-white text-xl" /> 
                                      
                                    </button> </Link>
                    </>
                ) : (
                    <p className="text-white">Aucune donnée disponible</p>
                )}
            </div>
        </div>
    );
}