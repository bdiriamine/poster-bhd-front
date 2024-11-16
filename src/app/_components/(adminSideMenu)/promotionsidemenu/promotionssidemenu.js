"use client";
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function PromotionSideMenu() {
    const [data, setData] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Failed to fetch promotions');
                const promotions = await response.json();
                setData(promotions.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPromotions();
    }, [token]);

    const removePromotion = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this promotion?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Failed to delete this promotion');
                setData(data.filter(promotion => promotion._id !== id));
                alert('Promotion deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to delete this promotion');
            }
        }
    };

    return (
        <div className="bg-teal-900 min-h-screen rounded-lg p-4">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded bg-teal-800">
                    <p className="text-2xl text-white">Liste des Promotions</p>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.length > 0 ? (
                    data.map((promotion) => (
                        <div key={promotion._id} className="border p-4 rounded-lg bg-teal-800 text-white flex flex-col">
                            <h3 className="text-lg font-bold text-white">{promotion.name}</h3>
                            <p className="text-white"><strong>Remise:</strong> {promotion.discountPercentage} %</p>
                            <p className="text-white"><strong>Date de début:</strong> {new Date(promotion.startDate).toLocaleDateString('fr-FR')}</p>
                            <p className="text-white"><strong>Date de fin:</strong> {new Date(promotion.endDate).toLocaleDateString('fr-FR')}</p>

                            {/* Products Accordion */}
                            <details className="mt-2">
                                <summary className="cursor-pointer text-md font-bold text-white">Produits associés</summary>
                                <div className="mt-2">
                                    {promotion.produits && promotion.produits.length > 0 ? (
                                        promotion.produits.map((produit) => (
                                            <div key={produit._id} className="mb-2 p-2 border rounded-lg">
                                                <p className="text-white"><strong>Product Name:</strong> {produit.name}</p>
                                                <p className="text-white"><strong>Price:</strong> {produit.price}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-white">No associated products</p>
                                    )}
                                </div>
                            </details>

                            {/* Tailles Accordion */}
                            <details className="mt-2">
                                <summary className="cursor-pointer text-md font-bold text-white">Tailles associées</summary>
                                <div className="mt-2">
                                    {promotion.tailles && promotion.tailles.length > 0 ? (
                                        promotion.tailles.map((taille) => (
                                            <div key={taille._id} className="mb-2 p-2 border rounded-lg">
                                                <p className="text-white"><strong>Size Name:</strong> {taille.width} / {taille.height} {taille.unit}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-white">No associated sizes</p>
                                    )}
                                </div>
                            </details>

                            <div className="mt-auto">
                                <Link href={`/edit/promotions/${promotion._id}`}>
                                    <button className="bg-teal-600 text-white p-2 m-2 rounded-lg">
                                        <GrEdit className="text-white text-xl" />
                                    </button>
                                </Link>
                                <button className="bg-red-600 text-white p-2 rounded-lg ml-2" onClick={() => removePromotion(promotion._id)}>
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
                <Link href={'/admin/promotion'}>
                    <button className="border bg-orange-500 text-black p-2 rounded-lg">Ajouter promotion</button>
                </Link>
            </div>
        </div>
    );
}