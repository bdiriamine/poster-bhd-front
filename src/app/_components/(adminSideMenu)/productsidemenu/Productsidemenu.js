"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function ProductSideMenu({ datares, msg }) {
    const [data, setData] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        if (datares) {
            setData(datares);
        }
    }, [datares]);

    const removeProduct = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Failed to delete this product');
                setData(data.filter(product => product._id !== id));
                alert('Product deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to delete this product');
            }
        }
    };

    return (
        <div className="bg-teal-900 min-h-screen rounded-lg p-4">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded bg-teal-800">
                    <p className="text-2xl text-white">
                        Liste des {msg}
                    </p>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.length > 0 ? (
                    data.map((product) => (
                        <div key={product._id} className="border p-4 rounded-lg bg-teal-800 text-white flex flex-col">
                            <h3 className="text-lg font-bold text-white">{product.name}</h3>
                            <p className="text-white"><strong>Prix:</strong> <span className="line-through text-red-400">{product.price} €</span> </p>
                            <p className="text-white"><strong>Prix après promotion:</strong> {product.priceAfterDiscount || 'N/A'} </p>
                            <div className="flex justify-center mb-2">
                                <Image
                                    src={product.imageCover}
                                    alt={product.name}
                                    width={0}
                                    height={0}
                                    sizes="10vw"
                                    style={{ width: '80%', height: 'auto' }}
                                    className="object-cover"
                                />
                            </div>

                            <p className="text-white"><strong>Description:</strong> {product.description}</p>
                            <p className="text-white"><strong>Sous-Catégorie:</strong> {product.sousCategorie?.name || 'N/A'}</p>

                            {/* Formats Accordion */}
                            <details className="mt-2">
                                <summary className="cursor-pointer text-md font-bold text-white">Formats</summary>
                                <div className="mt-2">
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
                                </div>
                            </details>

                            {/* Promotion Accordion */}
                            <details className="mt-2">
                                <summary className="cursor-pointer text-md font-bold text-white">Promotion</summary>
                                <div className="mt-2">
                                    {product.promotions ? (
                                        <div className="mb-2 p-2 border rounded-lg">
                                            <p className="text-white"><strong>Nom:</strong> {product.promotions.name}</p>
                                            <p className="text-white"><strong>Promotion:</strong> {product.promotions.discountPercentage} % off</p>
                                            <p className="text-white">
                                                <strong>Date de début:</strong>{" "}
                                                {new Date(product.promotions.startDate).toLocaleDateString('fr-FR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                            <p className="text-white">
                                                <strong>Date de fin:</strong>{" "}
                                                {new Date(product.promotions.endDate).toLocaleDateString('fr-FR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-white">Aucune promotion disponible</p>
                                    )}
                                </div>
                            </details>

                            <div className="mt-auto">
                                <Link href={`/edit/produit/${product._id}`}>
                                    <button className="bg-teal-600 text-white p-2 m-2 rounded-lg">
                                        <GrEdit className="text-white text-xl" />
                                    </button>
                                </Link>
                                <button className="bg-red-600 text-white p-2 rounded-lg ml-2" onClick={() => { removeProduct(product._id) }}>
                                    <MdDeleteForever className="text-white text-xl" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">Aucune donnée disponible</p>
                )}
            </div>
            <div className="mt-4">
                <Link href={'/admin/product'}>
                    <button className="border bg-orange-500 text-black p-2 rounded-lg">Ajouter produit</button>
                </Link>
            </div>
        </div>
    );
}