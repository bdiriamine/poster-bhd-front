'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function LivreSideMenu() {
    const [data, setData] = useState([]);
    const [promotions, setPromotions] = useState([]); // State for promotions
    const [selectedPromotion, setSelectedPromotion] = useState(null); // State for selected promotion
    const [selectedLivreId, setSelectedLivreId] = useState(null); // State for selected livre
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
    const { token } = useAuth();

    useEffect(() => {
        fetchLivres();
        fetchPromotions(); // Fetch promotions on component mount
    }, [token]);

    const fetchLivres = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/livrephotos?ts=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to fetch livres');
            const livres = await response.json();
            setData(livres.data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch livres');
        }
    };

    const fetchPromotions = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions?ts=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to fetch promotions');
            const promotionsData = await response.json();
            setPromotions(promotionsData.data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch promotions');
        }
    };

    const removeLivre = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this livre?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/livrephotos/${id}?ts=${new Date().getTime()}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Failed to delete this livre');
                setData(data.filter(livre => livre._id !== id));
                alert('Livre deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to delete this livre');
            }
        }
    };

    // Function to handle promotion assignment
    const assignPromotionToLivre = async () => {
        if (!selectedPromotion || !selectedLivreId) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions/${selectedPromotion}/products/${selectedLivreId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({ promotionId: selectedPromotion }),
            });

            if (!response.ok) throw new Error('Failed to assign promotion');
            setModalVisible(false);
            alert('Promotion assigned successfully');
            fetchLivres(); // Refresh livres
        } catch (error) {
            console.error(error);
            alert('Failed to assign promotion');
        }
    };

    // Function to remove promotion from a livre
    const removePromotionFromLivre = async (livreId, promotionId) => {
        const confirmRemove = window.confirm("Are you sure you want to remove the promotion?");
        if (confirmRemove) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions/${promotionId}/products/${livreId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Failed to remove promotion');
                alert('Promotion removed successfully');
                fetchLivres(); // Refresh livres after promotion removal
            } catch (error) {
                console.error(error);
                alert('Failed to remove promotion');
            }
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen rounded-lg p-4">
            {data.length > 0 && (
                <div className="text-3xl text-gray-800 text-center font-semibold mb-6">
                    <p className="text-2xl text-black">Liste des Livres</p>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.length > 0 ? (
                    data.map((livre) => {
                        const livrePromotion = promotions.find(promo => promo._id === livre.promotions?._id); // Get promotion for the livre
                        return (
                            <div 
                                key={livre._id} 
                                className={`border p-4 rounded-lg flex flex-col transition-all duration-300 ${livre.priceAfterDiscount ? 'bg-gray-100' : 'bg-white'} hover:shadow-lg relative`}
                            >
                                <h3 className="text-lg font-bold text-black">{livre.name}</h3>
                                <p className="text-black">
                                    <strong>Prix:</strong> <span className="line-through text-red-400">{livre.price} €</span>
                                </p>
                                {livre.promotions?.discountPercentage && (
                                    <p className="text-black font-bold">
                                        <strong>Prix après promotion:</strong> {livre.priceAfterDiscount} €
                                    </p>
                                )}
                                <div className="flex justify-center mb-2">
                                    <Image
                                        src={livre.imageCover}
                                        alt={livre.name}
                                        width={0}
                                        height={0}
                                        sizes="10vw"
                                        style={{ width: '80%', height: 'auto' }}
                                        className="object-cover"
                                    />
                                </div>
                                <p><strong className="text-black">Description:</strong> {livre.description}</p>
                                <p className="text-black"><strong>Sous-Catégorie:</strong> {livre.sousCategories?.name || 'N/A'}</p>
                                <p><strong className="text-green-600">Quality Papier:</strong> {livre.paperQuality}</p>
                                <p><strong className="text-green-600">Cover Type:</strong> {livre.coverType}</p>
                                <p><strong className="text-green-600">Number des Pages:</strong> {livre.numberOfPages}</p>
                                <p><strong className="text-green-600">Number des Images:</strong> {livre.numberOfPhotos}</p>
                                <p><strong className="text-green-600">size:</strong> {livre.size}</p>
                                {/* Display the promotion details if available */}
                                {livrePromotion && (
                                    <div className="mt-2 p-2 border rounded-lg bg-yellow-50">
                                        <strong className="text-yellow-600">Promotion:</strong> {livrePromotion.name} - {livrePromotion.discountPercentage}% off
                                        {/* Remove Promotion Button */}
                                        <button
    className="ml-4 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
    onClick={() => removePromotionFromLivre(livre._id, livre.promotions._id)}
>
    Remove Promotion
</button>
                                    </div>
                                )}

                                {/* Add Promotion Button */}
                                <button
                                    className="mt-4 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
                                    onClick={() => {
                                        setSelectedLivreId(livre._id); // Set selected livre ID
                                        setSelectedPromotion(null); // Reset selected promotion
                                        setModalVisible(true); // Show modal
                                    }}
                                >
                                    Ajouter Promotion
                                </button>

                                {/* Formats Accordion */}
                                <details className="mt-2">
                                    <summary className="cursor-pointer text-md font-bold text-black">Formats</summary>
                                    <div className="mt-2">
                                        {Array.isArray(livre.formats) && livre.formats.length > 0 ? (
                                            livre.formats.map((format) => (
                                                <div key={format._id} className="mb-2 p-2 border rounded-lg bg-gray-50">
                                                    <p><strong>type:</strong> {format.type}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No formats available.</p>
                                        )}
                                    </div>
                                </details>
                                
                                {/* Delete and Edit Icons */}
                                <div className="flex justify-between items-center mt-2">
                                    <button onClick={() => removeLivre(livre._id)}>
                                        <MdDeleteForever className="text-red-500 text-2xl cursor-pointer hover:text-red-700" />
                                    </button>
                                    <Link href={`/edit/livre/${livre._id}`}>
                                        <GrEdit className="text-blue-500 text-2xl cursor-pointer hover:text-blue-700" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-xl font-bold">Aucun livre trouvé.</p>
                )}
            </div>
            <div className="mt-8 flex justify-center">
        <Link href={'/admin/livre'}>
          <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
            Ajouter un livre
          </button>
        </Link>
      </div>
            {/* Modal for adding promotion */}
            {modalVisible && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Assign a Promotion</h2>
                        <select
                            value={selectedPromotion}
                            onChange={(e) => setSelectedPromotion(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                        >
                            <option value="">Select a promotion</option>
                            {promotions.map((promotion) => (
                                <option key={promotion._id} value={promotion._id}>
                                    {promotion.name} - {promotion.discountPercentage}% off
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-700"
                                onClick={() => setModalVisible(false)}
                            >
                                Annuler
                            </button>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                                onClick={assignPromotionToLivre}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}