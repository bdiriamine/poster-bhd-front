"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";

export default function ProductSideMenu({ datares, msg }) {
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
                        {data.map((product) => (
                            <div key={product._id} className="border p-4 mb-2 rounded-lg bg-white dark:bg-teal-800 text-white">
                                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                                <p className="text-white"><strong>Prix:</strong> {product.price} €</p>
                                <p className="text-white"><strong>Description:</strong> {product.description}</p>
                                <p className="text-white"><strong>Sous-Catégorie:</strong> {product.sousCategorie?.name || 'N/A'}</p>
                                <div className="flex justify-center mb-2">
                                    <Image
                                        src={product.imageCover}
                                        alt={product.name}
                                        width={0}
                                        height={0}
                                        sizes="10vw"
                                        style={{ width: '20%', height: 'auto' }}
                                        className="object-cover"
                                    />
                                </div>

                                <h4 className="text-md font-bold text-white">Formats:</h4>
                                {Array.isArray(product.formats) && product.formats.length > 0 ? (
                                    product.formats.map((format) => (
                                        <div key={format._id} className="mb-2 p-2 border rounded-lg">
                                            <p className="text-white"><strong>Type:</strong> {format.type}</p>
                                            {Array.isArray(format.tailles) && format.tailles.length > 0 ? (
                                                format.tailles.map((taille) => (
                                                    <div key={taille._id} className="flex justify-between">
                                                        <p className="text-white"><strong>{taille.width} x {taille.height} {taille.unit}</strong></p>
                                                        <p className="text-white">{taille.prix} €</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-white">Aucune taille disponible</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-white">Aucun format disponible</p>
                                )}

                                <div className="mt-2">
                                    <button className="bg-teal-600 text-white p-2 m-2 rounded-lg">
                                        <GrEdit className="text-white text-xl" />
                                    </button>
                                    <button className="bg-red-600 text-white p-2 rounded-lg ml-2">
                                        <MdDeleteForever className="text-white text-xl" />
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