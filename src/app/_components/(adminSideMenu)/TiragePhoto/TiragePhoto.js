'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';
export default function TiragePhoto({msg}) {
    const [data, setData] = useState([]);
    const [promotions, setPromotions] = useState([]); // State for promotions
    const [selectedPromotion, setSelectedPromotion] = useState(null); // State for selected promotion
    const [selectedTirageId, setSelectedTirageId] = useState(null); // State for selected tirage
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
    const { token } = useAuth();

    useEffect(() => {
        fetchTirages();
        fetchPromotions(); // Fetch promotions on component mount
    }, [token]);

    const fetchTirages = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tirage?ts=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to fetch tirages');
            const tirages = await response.json();
            setData(tirages.data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch tirages');
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

    const removeTirage = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this tirage?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tirage/${id}?ts=${new Date().getTime()}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Failed to delete this tirage');
                setData(data.filter(tirage => tirage._id !== id));
                alert('Tirage deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to delete this tirage');
            }
        }
    };

    // Function to handle promotion assignment
    const assignPromotionToTirage = async () => {
        if (!selectedPromotion || !selectedTirageId) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions/${selectedPromotion}/products/${selectedTirageId}`, {
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
            fetchTirages(); // Refresh tirages
        } catch (error) {
            console.error(error);
            alert('Failed to assign promotion');
        }
    };

    // Function to remove promotion from a tirage
    const removePromotionFromTirage = async (tirageId, promotionId) => {
        const confirmRemove = window.confirm("Are you sure you want to remove the promotion?");
        if (confirmRemove) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions/${promotionId}/products/${tirageId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Failed to remove promotion');
                alert('Promotion removed successfully');
                fetchTirages(); // Refresh tirages after promotion removal
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
                    <p className="text-2xl text-black">Liste des Tirages</p>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.length > 0 ? (
                    data.map((tirage) => {
                        const tiragePromotion = promotions.find(promo => promo._id === tirage.promotions?._id); // Get promotion for the tirage
                        return (
                            <div 
                                key={tirage._id} 
                                className={`border p-4 rounded-lg flex flex-col transition-all duration-300 ${tirage.priceAfterDiscount ? 'bg-gray-100' : 'bg-white'} hover:shadow-lg relative`}
                            >
                                <h3 className="text-lg font-bold text-black">{tirage.name}</h3>
                                <p className="text-black">
                                    <strong>Prix:</strong> <span className="line-through text-red-400">{tirage.price} €</span>
                                </p>
                                {tirage.promotions?.discountPercentage && (
                                    <p className="text-black font-bold">
                                        <strong>Prix après promotion:</strong> {tirage.priceAfterDiscount} €
                                    </p>
                                )}
                                <div className="flex justify-center mb-2">
                                    <Image
                                        src={tirage.imageCover}
                                        alt={tirage.name}
                                        width={0}
                                        height={0}
                                        sizes="10vw"
                                        style={{ width: '80%', height: 'auto' }}
                                        className="object-cover"
                                    />
                                </div>
                                <p><strong className="text-black">Description:</strong> {tirage?.description}</p>
                                <p className="text-black"><strong>Sous-Catégorie:</strong> {tirage?.sousCategories?.name || 'N/A'}</p>
                                <p><strong className="text-green-600">Number des Images:</strong> {tirage?.numberOfPhotos}</p>
                                <details className="mt-2">
                                          <summary className="cursor-pointer text-md font-bold text-black">Formats et Tailles</summary>
                                          <div className="mt-2">
                                              {Array.isArray(tirage.formats) && tirage.formats.length > 0 ? (
                                                  tirage.formats.map((format) => (
                                                      <div key={format._id} className="mb-2 p-2 border rounded-lg bg-gray-50">
                                                          <p><strong>Type:</strong> {format.type}</p>
                                                          {Array.isArray(format.tailles) && format.tailles.length > 0 ? (
                                                              <div className="ml-4 mt-2">
                                                                  <p className="font-semibold text-gray-700">Tailles disponibles:</p>
                                                                  {format.tailles.map((taille) => (
                                                                      <div key={taille._id} className="ml-2 p-2 border rounded bg-gray-100">
                                                                          <p><strong>Dimensions:</strong> {taille.width} x {taille.height} {taille.unit}</p>
                                                                          <p><strong>Prix:</strong> {taille.price} €</p>
                                                                          {taille.discountedPrice && (
                                                                              <p><strong>Prix après remise:</strong> {taille.discountedPrice} €</p>
                                                                          )}
                                                                      </div>
                                                                  ))}
                                                              </div>
                                                          ) : (
                                                              <p className="ml-4 text-gray-600">Aucune taille disponible.</p>
                                                          )}
                                                      </div>
                                                  ))
                                              ) : (
                                                  <p>No formats available.</p>
                                              )}
                                          </div>
                                  </details>
                                {/* Display the promotion details if available */}
                                {tiragePromotion && (
                                    <div className="mt-2 p-2 border rounded-lg bg-yellow-50">
                                        <strong className="text-yellow-600">Promotion:</strong> {tiragePromotion?.name} - {tiragePromotion?.discountPercentage}% off
                                        {/* Remove Promotion Button */}
                                        <button
    className="ml-4 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
    onClick={() => removePromotionFromTirage(tirage._id, tirage.promotions._id)}
>
    Remove Promotion
</button>
                                    </div>
                                )}

                                {/* Add Promotion Button */}
                                <button
                                    className="mt-4 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
                                    onClick={() => {
                                        setSelectedTirageId(tirage._id); // Set selected tirage ID
                                        setSelectedPromotion(null); // Reset selected promotion
                                        setModalVisible(true); // Show modal
                                    }}
                                >
                                    Ajouter Promotion
                                </button>   
                                {/* Delete and Edit Icons */}
                                <div className="flex justify-between items-center mt-2">
                                    <button onClick={() => removeTirage(tirage._id)}>
                                        <MdDeleteForever className="text-red-500 text-2xl cursor-pointer hover:text-red-700" />
                                    </button>
                                    <Link href={`/edit/tirage/${tirage._id}`}>
                                        <GrEdit className="text-blue-500 text-2xl cursor-pointer hover:text-blue-700" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-xl font-bold">Aucun tirage trouvé.</p>
                )}
            </div>
            <div className="mt-8 flex justify-center">
        <Link href={'/admin/tirage'}>
          <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
            Ajouter un tirage
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
                                onClick={assignPromotionToTirage}
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