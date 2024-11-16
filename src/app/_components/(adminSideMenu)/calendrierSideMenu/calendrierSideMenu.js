"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function CalendrierSideMenu() {
  const [data, setData] = useState([]);
  const { token } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLivre, setSelectedLivre] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState('');

  useEffect(() => {
    fetchCartes();
    fetchPromotions();
  }, [token]);

  const fetchCartes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendriePhoto`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch cartes');
      const cartes = await response.json();
      setData(cartes.data);
    } catch (error) {
      alert('Failed to fetch cartes');
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
      const promoData = await response.json();
      setPromotions(promoData.data);
    } catch (error) {
      alert('Failed to fetch promotions');
    }
  };

  const removeLivre = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this livre?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendriePhoto/${id}`, {
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

        alert('Failed to delete this livre');
      }
    }
  };

  const assignPromotionToLivre = async () => {
    if (!selectedPromotion || !selectedLivre) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions/${selectedPromotion}/products/${selectedLivre}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to assign promotion');
      alert('Promotion assigned successfully');
      setModalVisible(false);
      fetchCartes(); // Refresh the list
    } catch (error) {

      alert('Failed to assign promotion');
    }
  };

  const removePromotionFromCalendrier = async (promotionId, livreId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove the promotion?");
    if (confirmDelete) {
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
        fetchCartes(); // Refresh the list
      } catch (error) {
        alert('Failed to remove promotion');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center mb-8">
        <h2 className="text-gray-600 text-3xl font-bold">Calendrier</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.length > 0 ? (
          data.map((livre) => (
            <div key={livre._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="relative">
                <Image
                  src={livre.imageCover}
                  alt={livre.name}
                  width={400}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                {livre.promotions && (
                  <span className="absolute top-0 right-0 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                    {livre.promotions.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{livre.name}</h3>
                <p className="text-gray-500 mb-1">
                  <span className="line-through text-red-400">{livre.price} €</span>
                  <span className="ml-2 text-green-500 font-bold">{livre.priceAfterDiscount || 'N/A'} €</span>
                </p>
                <p className="text-gray-700 mb-3">{livre.description}</p>
                <p className="text-gray-700 mb-3">Année : {livre.year}</p>
                <p className="text-gray-700 mb-3">Qualité : {livre.paperQuality}</p>
                <p className="text-gray-700 mb-3">Nombre de photo : {livre.numberOfPhotos} photos</p>

                {livre.promotions ? (
                  <div className="p-3 bg-blue-50 rounded-lg mb-3">
                    <h4 className="text-blue-600 font-semibold">Promotion Active</h4>
                    <p><strong>Nom:</strong> {livre.promotions.name}</p>
                    <p><strong>Rabais:</strong> {livre.promotions.discountPercentage}%</p>
                    {/* Add Remove Promotion Button */}
                    <button
                      className="mt-2 text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => removePromotionFromCalendrier(livre.promotions._id, livre._id)}
                    >
                      Supprimer Promotion
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">Aucune promotion disponible</p>
                )}

                <details className="mt-3">
                  <summary className="cursor-pointer text-blue-500 font-semibold">Voir les formats</summary>
                  <div className="mt-2">
                    {Array.isArray(livre.formats) && livre.formats.length > 0 ? (
                      livre.formats.map((format) => (
                        <div key={format._id} className="mt-2 p-2 bg-gray-100 rounded-lg">
                          <p><strong>Type:</strong> {format.type}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Aucun format disponible</p>
                    )}
                  </div>
                </details>

                <div className="mt-4 flex justify-between items-center">
                  <Link href={`/edit/calendrier/${livre._id}`}>
                    <GrEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" size={20} />
                  </Link>
                  <MdDeleteForever className="text-red-500 hover:text-red-700 cursor-pointer" size={24} onClick={() => removeLivre(livre._id)} />
                  <button 
                    className="text-green-500 hover:text-green-700 cursor-pointer"
                    onClick={() => {
                      setSelectedLivre(livre._id);
                      setModalVisible(true);
                    }}
                  >
                    Ajouter Promotion
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucun calendrier disponible</p>
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <Link href={'/admin/calendrier'}>
          <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
            Ajouter une calendrier
          </button>
        </Link>
      </div>
      {/* Modal for assigning promotion */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4" role="dialog" aria-modal="true">
            <h3 className="text-lg font-bold">Assigner une promotion</h3>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={selectedPromotion}
              onChange={(e) => setSelectedPromotion(e.target.value)}
            >
              <option value="">Sélectionner une promotion</option>
              {promotions.map(promotion => (
                <option key={promotion._id} value={promotion._id}>{promotion.name} - {promotion.discountPercentage}%</option>
              ))}
            </select>
            <div className="flex justify-between">
              <button onClick={assignPromotionToLivre} className="bg-blue-500 text-white px-4 py-2 rounded">Assigner</button>
              <button onClick={() => setModalVisible(false)} className="bg-gray-300 text-black px-4 py-2 rounded">Annuler</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}