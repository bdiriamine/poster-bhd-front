"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Taillesidemenu({ datares, msg }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (datares) {
            setData(datares);
        }
    }, [datares]);

    return (
        <div>
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        Liste des {msg}
                    </p>
                </div>
            )}
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div>
                    {data.length > 0 ? (
                        <div>
                            <table className="table-auto w-full">
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
                                                <Image
                                                    src={res.image}
                                                    alt="master"
                                                    width={0} // Use a fixed width
                                                    height={0} // Use a fixed height
                                                    sizes="13vw"
                                                    className="mx-auto"
                                                    style={{ width: '30%', height: 'auto' }}
                                                />
                                            </td>
                                            <td className="text-center border">{res.format?.type || 'N/A'}</td>
                                            <td className="text-center border">
                                                <button className="bg-cyan-600 text-black p-2 rounded-lg">Modifier</button>
                                                <button className="bg-red-600 text-black p-2 rounded-lg ml-2">Supprimer</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="border bg-orange-500 text-black p-2 rounded-lg mt-4"> + Créer Taille </button>
                        </div>
                    ) : (
                        <p>Aucune donnée disponible</p>
                    )}
                </div>
            </div>
        </div>
    );
}