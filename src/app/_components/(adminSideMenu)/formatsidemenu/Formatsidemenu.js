"use client";
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { useAuth } from '@/app/_utils/AuthProvider';
import Link from 'next/link';

export default function Formatsidemenu({ msg }) {
    const [data, setData] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchFormats = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Failed to fetch formats');
                const result = await response.json();
                setData(result.data); // Update with actual data format
            } catch (error) {
                console.error(error);
            }
        };

        fetchFormats();
    }, [token]);

    const removeFormat = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Format?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats/${id}?ts=${new Date().getTime()}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Failed to delete Format');
                setData((prevData) => prevData.filter(format => format._id !== id));
                alert('Format deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to delete Format');
            }
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded bg-gray-100">
                    <p className="text-2xl text-black">
                        Liste des {msg}
                    </p>
                </div>
            )}

            <div className="p-4 border-2 border-dashed rounded-lg border-gray-100">
                {data.length > 0 ? (
                    <>
                        <table className="hidden md:table w-full text-black">
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
                                        <td className="text-center border">{res.type}</td>
                                        <td className="text-center border">
                                            {res.tailles && res.tailles.length > 0 ? (
                                                <ul>
                                                    {res.tailles.map((taille) => (
                                                        <li key={taille._id}>
                                                            {`${taille.width} ${taille.unit} x ${taille.height} ${taille.unit}`}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                'N/A'
                                            )}
                                        </td>
                                        <td className="text-center border">
                                            <Link href={`/edit/formats/${res._id}`}>
                                                <button className="bg-teal-600 text-black p-2 m-2 rounded-lg">
                                                    <GrEdit className="text-xl" />
                                                </button>
                                            </Link>
                                            <button className="bg-red-600 text-black p-2 rounded-lg ml-2" onClick={() => removeFormat(res._id)}>
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
                                    <h3 className="text-lg font-bold text-white">{res.type}</h3>
                                    <p className="text-white">ID: {res._id}</p>
                                    <div>
                                        <strong className="text-white">Tailles:</strong>
                                        {res.tailles && res.tailles.length > 0 ? (
                                            <ul>
                                                {res.tailles.map((taille) => (
                                                    <li key={taille._id} className="text-white">
                                                        {`${taille.width} ${taille.unit} x ${taille.height} ${taille.unit}`}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-white">N/A</p>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <Link href={`/edit/formats/${res._id}`}>
                                            <button className="bg-teal-600 text-black p-2 m-2 rounded-lg">
                                                <GrEdit className="text-xl" /> 
                                            </button>
                                        </Link>
                                        <button className="bg-red-600 text-black p-2 rounded-lg ml-2" onClick={() => removeFormat(res._id)}>
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
            </div>
        </div>
    );
}