"use client";
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';
export default function CategorySideMenu({ datares, msg }) {
    const [data, setData] = useState([]);
    const { token } = useAuth();
    useEffect(() => {
        if (datares && Array.isArray(datares)) {
            setData(datares);
        }
    }, [datares]);
   const removeCategory =async(id)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this categorie?");
    if (confirmDelete) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to delete this categorie');
            setData(datares.filter(res => res._id !== id));
            alert('categorie deleted successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to delete this categorie');
        }
    }
};
    return (
        <div className=" bg-teal-900 min-h-screen">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded bg-teal-800">
                    <p className="text-2xl  text-white">
                        Liste des {msg}
                    </p>
                </div>
            )}

            <div className="p-4 border-2  border-dashed rounded-lg border-teal-700">
                <div>
                    {data.length > 0 ? (
                        <div>
                            {/* Table for Desktop */}
                            <table className="hidden md:table w-full text-white">
                                <thead>
                                    <tr>
                                        {Object.keys(data[0]).map((key) => (
                                            <th key={key} className="border px-4 py-2">
                                                {key !== '__v' ? key : null}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((res) => (
                                        <tr key={res._id}>
                                            <td className="text-center border">{res._id}</td>
                                            <td className="text-center border">{res.name}</td>
                                            <td className="text-center border">{res.slug}</td>
                                            <td className="text-center border">{res.sousCategories && res.sousCategories.length > 0 ? (
                                                <ul>
                                                    {res.sousCategories.map((el) => (
                                                        <li key={el._id}>
                                                            {`${el.name} `}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                'vide'
                                            )}</td>
                                            <td className="text-center border">{res.createdAt}</td>
                                            <td className="text-center border">{res.updatedAt}</td>
                                            <td className="text-center border">
                                            <button className="bg-teal-600 text-black p-2 m-2 rounded-lg">
                                                <GrEdit className="text-white text-xl" />
                                            </button>
                                            <button className="bg-red-600 text-black p-2 rounded-lg ml-2" onClick={()=>{removeCategory(res._id)}}>
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
                                    <div key={res._id} className="border p-4 mb-2 rounded-lg bg-teal-800 text-white">
                                        <h3 className="text-lg font-bold">{res.name}</h3>
                                        <p>ID: {res._id}</p>
                                        <p>Slug: {res.slug}</p>
                                        <div>
                                            <strong>Sous-Catégories:</strong>
                                            {res.sousCategories && res.sousCategories.length > 0 ? (
                                                <ul>
                                                    {res.sousCategories.map((el) => (
                                                        <li key={el._id}>
                                                            {`${el.name} `}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                'vide'
                                            )}
                                        </div>
                                        <p>Créé le: {res.createdAt}</p>
                                        <p>Mis à jour le: {res.updatedAt}</p>
                                        <div className="mt-2">
                                        <button className="bg-teal-600 text-black p-2 m-2 rounded-lg">
                                                <GrEdit className="text-white text-xl" />
                                            </button>
                                            <button className="bg-red-600 text-black p-2 rounded-lg ml-2" onClick={()=>{removeCategory(res._id)}}>
                                                <MdDeleteForever className="text-white text-xl"  />
                                            </button>   
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href={'/admin/categorie'}>    <button className="border bg-orange-500 text-black p-2 rounded-lg"> + Créer Format </button> </Link>
                        </div>
                    ) : (
                        <p className="text-white">Aucune donnée disponible</p>
                    )}
                </div>
            </div>
        </div>
    );
}