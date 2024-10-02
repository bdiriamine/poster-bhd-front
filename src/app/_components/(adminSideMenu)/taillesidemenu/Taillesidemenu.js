"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function Taillesidemenu({ msg }) {
    const [data, setData] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotions, setSelectedPromotions] = useState({});
    const { token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tailleResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles`);
                if (!tailleResponse.ok) throw new Error('Failed to fetch tailles');
                const tailleResult = await tailleResponse.json();
                setData(tailleResult.data);

                const promotionResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions`);
                if (!promotionResponse.ok) throw new Error('Failed to fetch promotions');
                const promotionResult = await promotionResponse.json();
                setPromotions(promotionResult.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    const removeTaille = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this taille?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Failed to delete this taille');
                setData(data.filter(taille => taille._id !== id));
                alert('Taille deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to delete this taille');
            }
        }
    };

    const addPromotionToTaille = async (id) => {
        const promotionId = selectedPromotions[id];
        if (!promotionId) {
            alert('Please select a promotion to add.');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles/${id}/promotions/${promotionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error('Failed to add promotion');
            alert('Promotion added successfully');
            // Refresh tailles
            const updatedResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles`);
            const updatedResult = await updatedResponse.json();
            setData(updatedResult.data);
        } catch (error) {
            console.error(error);
            alert('Failed to add promotion');
        }
    };

    const handlePromotionChange = (id, promotionId) => {
        setSelectedPromotions((prev) => ({ ...prev, [id]: promotionId }));
    };
 console.log(data)
    return (
        <div className="bg-teal-900 min-h-screen rounded-lg p-4">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded bg-teal-800">
                    <p className="text-2xl text-white">Liste des {msg}</p>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.length > 0 ? (
                    data.map((res) => (
                        <div key={res._id} className=" p-4 rounded-lg bg-teal-800 border-2 border-teal-500">
                            <p className="text-white"><strong>L:</strong> {res.width}  / <strong>H:</strong> {res.height}  <strong>Unité:</strong> {res.unit} </p>
                            <p className="text-white">
                                <strong>Prix original:</strong> {res.price} €
                                {res.discountedPrice < res.price && (
                                    <>
                                        <br />
                                        <span className="line-through text-red-400">{res.price} Dt</span>
                                        <strong> Prix après remise:</strong> {res.discountedPrice} Dt
                                    </>
                                )}
                            </p>
                            <div className="flex justify-center mb-2">
                                {res.image ? (
                                    <Image
                                        src={res.image}
                                        alt={res._id}
                                        width={200}
                                        height={200}
                                        className="mx-auto"
                                    />
                                ) : (
                                    <div className="bg-gray-500 w-20 h-20 flex items-center justify-center text-white">Image not available</div>
                                )}
                            </div>
                            <p className="text-white"><strong>Format:</strong> {res.format?.type || 'N/A'}</p>
                            <select 
                                className="bg-gray-200 p-2 rounded"
                                onChange={(e) => handlePromotionChange(res._id, e.target.value)}
                                value={selectedPromotions[res._id] || ""}
                            >
                                <option value="">Select Promotion</option>
                                {promotions.map((promo) => (
                                    <option key={promo._id} value={promo._id}>
                                        {promo.name} - {promo.discountPercentage}% off
                                    </option>
                                ))}
                            </select>
                            <div className="mt-2 flex space-x-2">
                                <button className="bg-teal-600 text-black p-2 rounded-lg">
                                <Link href={`/edit/taille/${res._id}`}> <GrEdit className="text-white text-xl" /> </Link>
                                   
                                </button>
                                <button className="bg-red-600 text-black p-2 rounded-lg" onClick={() => { removeTaille(res._id) }}>
                                    <MdDeleteForever className="text-white text-xl" />
                                </button>
                                <button 
                                    className="bg-teal-300 text-black p-2 rounded-lg" 
                                    onClick={() => addPromotionToTaille(res._id)}
                                >
                                    Add Promotion
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">Aucune donnée disponible</p>
                )}
            </div>
            <Link href={'/admin/taille'}>
                <button className="border bg-orange-500 text-black p-2 rounded-lg mt-4"> + Créer Taille </button>
            </Link>
        </div>
    );
}