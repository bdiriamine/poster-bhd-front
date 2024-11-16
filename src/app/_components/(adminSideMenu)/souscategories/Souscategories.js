"use client";
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function Souscategories({ msg }) {
    const [data, setData] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        // Fetch subcategories data from API
        const fetchSubcategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include'
                });
                
                if (!response.ok) throw new Error('Failed to fetch subcategories');

                const result = await response.json();
                setData(result.data); // Assuming result.data contains the array of subcategories
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };

        fetchSubcategories();
    }, [token]);

    const removeSousCategorie = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Sous-categorie?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories/${id}?ts=${new Date().getTime()}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include'
                });
                
                if (!response.ok) throw new Error('Failed to delete this Sous-categorie');

                setData(prevData => prevData.filter(subcat => subcat._id !== id));
                alert('Sous-categorie deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to delete this Sous-categorie');
            }
        }
    };

    return (
        <div className="bg-white min-h-screen rounded-lg">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded bg-gray-100">
                    <p className="text-2xl text-gray-600">
                        Liste des {msg}
                    </p>
                </div>
            )}
            <div className="p-4 border-2 border-dashed rounded-lg bg-gray-100">
                {data.length > 0 ? (
                    <>
                        <table className="hidden md:table w-full text-black">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Nom</th>
                                    <th className="border px-4 py-2">Catégorie</th>
                                    <th className="border px-4 py-2">Produits</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((res) => (
                                    <tr key={res._id}>
                                        <td className="text-center border">{res._id}</td>
                                        <td className="text-center border">{res.name}</td>
                                        <td className="text-center border">{res.category ? res.category.name : 'N/A'}</td>
                                        <td className="text-center border">
                                            {res.produits && res.produits.length > 0 ? (
                                                res.produits.map(product => (
                                                    <div key={product._id}>{product.name}</div>
                                                ))
                                            ) : 'N/A'}
                                        </td>
                                        <td className="text-center border">
                                            <Link href={`/edit/souscategories/${res._id}`}>
                                                <button className="bg-yellow-300 text-black p-2 m-2 rounded-lg">
                                                    <GrEdit className="text-white text-xl" />
                                                </button>
                                            </Link>
                                            <button 
                                                className="bg-red-600 text-black p-2 rounded-lg ml-2" 
                                                onClick={() => removeSousCategorie(res._id)}>
                                                <MdDeleteForever className="text-white text-xl" />
                                            </button>   
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile Design */}
                        <div className="md:hidden">
                            {data.map((res) => (
                                <div key={res._id} className="border p-4 mb-2 rounded-lg bg-teal-800">
                                    <h3 className="text-lg font-bold text-white">Nom: {res.name}</h3>
                                    <p className="text-white"><strong>ID:</strong> {res._id}</p>
                                    <p className="text-white"><strong>Catégorie:</strong> {res.category ? res.category.name : 'N/A'}</p>
                                    <p className="text-white"><strong>Produits:</strong> {res.produits && res.produits.length > 0 ? res.produits.map(product => product.name).join(', ') : 'N/A'}</p>
                                    <div className="mt-2">
                                        <Link href={`/edit/souscategories/${res._id}`}>
                                            <button className="bg-yellow-200 text-black p-2 m-2 rounded-lg">
                                                <GrEdit className="text-white text-xl" />
                                            </button>
                                        </Link>
                                        <button className="bg-red-600 text-black p-2 rounded-lg ml-2" onClick={() => removeSousCategorie(res._id)}>
                                            <MdDeleteForever className="text-white text-xl" />
                                        </button>   
                                    </div>
                                </div>
                            ))}
                        </div>

                    </>
                ) : (
                    <p className="text-white">Aucune donnée disponible</p>
                )}
                <Link href={'/admin/sous-categorie'}>
                    <button className="border bg-orange-500 text-black p-2 rounded-lg mt-4"> + Créer Sous-Catégorie </button>
                </Link>
            </div>
        </div>
    );
}