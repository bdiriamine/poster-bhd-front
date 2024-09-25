"use client";
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
export default function CategorySideMenu({ datares, msg }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (datares && Array.isArray(datares)) {
            setData(datares);
        }
    }, [datares]);

    return (
        <div className="bg-teal-50 dark:bg-teal-900 min-h-screen">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded bg-teal-100 dark:bg-teal-800">
                    <p className="text-2xl text-white dark:text-white">
                        Liste des {msg}
                    </p>
                </div>
            )}

            <div className="p-4 border-2 border-teal-200 border-dashed rounded-lg dark:border-teal-700">
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
                                    <div key={res._id} className="border p-4 mb-2 rounded-lg bg-teal-100 dark:bg-teal-800 text-white">
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
                                            <button className="bg-red-600 text-black p-2 rounded-lg ml-2">
                                                <MdDeleteForever className="text-white text-xl" />
                                            </button>   
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="border bg-orange-500 text-black p-2 rounded-lg"> + Créer Format </button>
                        </div>
                    ) : (
                        <p className="text-white">Aucune donnée disponible</p>
                    )}
                </div>
            </div>
        </div>
    );
}