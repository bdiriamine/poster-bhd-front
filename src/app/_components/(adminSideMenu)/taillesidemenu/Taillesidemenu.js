"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";

export default function Taillesidemenu({ datares, msg }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (datares) {
            setData(datares);
        }
    }, [datares]);

    return (
        <div className="bg-teal-50 dark:bg-teal-900 min-h-screen rounded-lg">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded bg-teal-100 dark:bg-teal-800">
                    <p className="text-2xl text-white dark:text-white">
                        Liste des {msg}
                    </p>
                </div>
            )}
            <div className="p-4 border-2 border-teal-200 border-dashed rounded-lg dark:border-teal-700">
                {data.length > 0 ? (
                    <>
                        <table className="hidden md:table w-full text-white">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Largeur</th>
                                    <th className="border px-4 py-2">Hauteur</th>
                                    <th className="border px-4 py-2">Unité</th>
                                    <th className="border px-4 py-2">Prix</th>
                                    <th className="border px-4 py-2">Image</th>
                                    <th className="border px-4 py-2">Format</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((res) => (
                                    <tr key={res._id}>
                                        <td className="text-center border">{res._id}</td>
                                        <td className="text-center border">{res.width}</td>
                                        <td className="text-center border">{res.height}</td>
                                        <td className="text-center border">{res.unit}</td>
                                        <td className="text-center border">{res.prix} €</td>
                                        <td className="text-center border">
                                            {res.image ? (
                                                <Image
                                                    src={res.image}
                                                    alt={res._id}
                                                    width={200}  // Set a specific width
                                                    height={200} // Set a specific height
                                                    className="mx-auto"
                                                />
                                            ) : (
                                                <div className="bg-gray-500 w-20 h-20 flex items-center justify-center text-white">Image not available</div>
                                            )}
                                        </td>
                                        <td className="text-center border">{res.format?.type || 'N/A'}</td>
                                        <td className="text-center border">
                                            <button className="bg-teal-600 text-black p-2 m-2 rounded-lg">
                                                <GrEdit className="text-white text-xl" />
                                            </button>
                                            <button className="bg-red-600 text-black p-2 rounded-lg ml-2">
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
                                <div key={res._id} className="border p-4 mb-2 rounded-lg bg-white dark:bg-teal-800">
                                    <h3 className="text-lg font-bold text-white">ID: {res._id}</h3>
                                    <p className="text-white"><strong>Largeur:</strong> {res.width}</p>
                                    <p className="text-white"><strong>Hauteur:</strong> {res.height}</p>
                                    <p className="text-white"><strong>Unité:</strong> {res.unit}</p>
                                    <p className="text-white"><strong>Prix:</strong> {res.prix} €</p>
                                    <div className="flex justify-center mb-2">
                                        {res.image ? (
                                            <Image
                                                src={res.image}
                                                alt={res._id}
                                                width={200}  // Set a specific width
                                                height={200} // Set a specific height
                                                style={{ width: '30%', height: 'auto' }}
                                            />
                                        ) : (
                                            <div className="bg-gray-500 w-20 h-20 flex items-center justify-center text-white">Image not available</div>
                                        )}
                                    </div>
                                    <p className="text-white"><strong>Format:</strong> {res.format?.type || 'N/A'}</p>
                                    <div className="mt-2">
                                        <button className="bg-teal-600 text-black p-2 m-2 rounded-lg">
                                            <GrEdit className="text-white text-xl" />
                                        </button>
                                        <button className="bg-red-600 text-black p-2 rounded-lg ml-2">
                                            <MdDeleteForever className="text-white text-xl" />
                                        </button>   
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="border bg-orange-500 text-black p-2 rounded-lg mt-4"> + Créer Taille </button>
                    </>
                ) : (
                    <p className="text-white">Aucune donnée disponible</p>
                )}
            </div>
        </div>
    );
}