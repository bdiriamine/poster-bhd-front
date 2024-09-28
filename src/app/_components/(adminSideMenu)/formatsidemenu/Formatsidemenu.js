"use client";
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { useAuth } from '@/app/_utils/AuthProvider';

export default function Formatsidemenu({ datares, msg }) {
    const [data, setData] = useState([]);
    const { token } = useAuth();
    useEffect(() => {
        if (datares) {
            setData(datares);
        }
    }, [datares]);
const removeForamt=async(id)=>{
    console.log(id)
    console.log(datares)
    const confirmDelete = window.confirm("Are you sure you want to delete this Format?");
    if (confirmDelete) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to delete Format');
            setData(datares.filter(user => user._id !== id));
            alert('Format deleted successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to delete Format');
        }
    }
}
    return (
        <div className=" bg-teal-900 min-h-screen">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded  bg-teal-800">
                    <p className="text-2xl text-white ">
                        Liste des {msg}
                    </p>
                </div>
            )}

            <div className="p-4 border-2  border-dashed rounded-lg border-teal-700">
                {data.length > 0 ? (
                    <>
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
                                        <button className="bg-teal-600 text-black p-2 m-2 rounded-lg">
                                                <GrEdit className="text-white text-xl" />
                                            </button>
                                            <button className="bg-red-600 text-black p-2 rounded-lg ml-2" onClick={()=>{removeForamt(res._id)}}>
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
                                <div key={res._id} className="border p-4 mb-2 rounded-lg  bg-teal-800">
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
                                    <button className="bg-teal-600 text-black p-2 m-2 rounded-lg">
                                                <GrEdit className="text-white text-xl" />
                                            </button>
                                            <button className="bg-red-600 text-black p-2 rounded-lg ml-2" onClick={()=>{removeForamt(res._id)}}>
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