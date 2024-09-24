"use client";
import React, { useEffect, useState } from 'react';

export default function Formatsidemenu({ datares, msg }) {
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
                                        {Object.keys(data[0]).map((key) => (
                                            <th key={key} className="border px-4 py-2">
                                                {key !== '__v' ? key : null} {/* Exclude __v */}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((res) => (
                                        <tr key={res._id}>
                                            <td className="text-center border">{res._id}</td>
                                            <td className="text-center border">{res.type}</td>
                                            <td className="text-center border">{res.tailles && res.tailles.length > 0 ? (
                                                <ul>
                                                    {res.tailles.map((taille) => (
                                                        <li key={taille._id}>
                                                            {`${taille.width} ${taille.unit} x ${taille.height} ${taille.unit}`}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                'N/A'
                                            )}</td>
                                            <td className="text-center border">
                                                <button className="bg-cyan-600 text-black p-2 rounded-lg">Modifier</button>
                                            </td>
                                            <td className="text-center border">
                                                <button className="bg-red-600 text-black p-2 rounded-lg">Supprimer</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="border bg-orange-500 text-black p-2 rounded-lg"> + Créer Format </button>
                        </div>
                    ) : (
                        <p>Aucune donnée disponible</p>
                    )}
                </div>
            </div>
        </div>
    );
}