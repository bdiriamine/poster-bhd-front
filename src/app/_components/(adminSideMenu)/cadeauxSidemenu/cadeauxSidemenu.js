'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function CadeauxSidemenu() {
  const [data, setData] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [selectedCadeauId, setSelectedCadeauId] = useState(null);
  const [selectedPromotion, setSelectedPromotion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchCartes();
    fetchPromotions(); // Fetch promotions on component mount
  }, [token]);

  const fetchCartes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cadeauxPhotos`, {
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
      console.error(error);
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
      const promotionsData = await response.json();
      setPromotions(promotionsData.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch promotions');
    }
  };

  const assignPromotionToCadeau = async () => {
    if (!selectedPromotion || !selectedCadeauId) {
      alert('Please select a promotion and a cadeau.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions/${selectedPromotion}/products/${selectedCadeauId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to assign promotion to cadeau');
      
      // Update local state to reflect changes
      const updatedData = data.map(cadeau => 
        cadeau._id === selectedCadeauId ? { ...cadeau, promotions: promotions.find(promo => promo._id === selectedPromotion) } : cadeau
      );
      setData(updatedData);
      setModalVisible(false);
      alert('Promotion assigned successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to assign promotion to cadeau');
    }
  };

  const removeCadeaux = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this cadeaux?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cadeauxPhotos/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to delete this cadeaux');
        setData(data.filter(cadeaux => cadeaux._id !== id));
        alert('Cadeaux deleted successfully');
      } catch (error) {
        console.error(error);
        alert('Failed to delete this cadeaux');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center mb-8">
        <h2 className="text-gray-600 text-3xl font-bold">Cadeaux </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.length > 0 ? (
          data.map((cadeaux) => (
            <div key={cadeaux._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="relative">
                <Image
                  src={cadeaux.imageCover}
                  alt={cadeaux.name}
                  width={400}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                {/* If promotion exists, show a promotion badge */}
                {cadeaux.promotions && (
                  <span className="absolute top-0 right-0 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
                    {cadeaux.promotions.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{cadeaux.name}</h3>
                <p className="text-gray-500 mb-1">
                  <span className="line-through text-red-400">{cadeaux.price} €</span>
                  <span className="ml-2 text-green-500 font-bold">{cadeaux.priceAfterDiscount || 'N/A'} €</span>
                </p>
                <p className="text-gray-700 mb-3">{cadeaux.description}</p>
                <p className="text-gray-700 mb-3">Taille: {cadeaux.giftSize}</p>
                <p className="text-gray-700 mb-3">Papier :{cadeaux.wrappingType}</p>
                <p className="text-gray-700 mb-3">Message: {cadeaux.personalizedMessage}</p>
                <p className="text-gray-700 mb-3">Occasion : {cadeaux.occasion} <span>{cadeaux.numberOfPhotos} photos </span> </p>
                
                {/* Check for promotion details */}
                {cadeaux.promotions ? (
                  <div className="p-3 bg-blue-50 rounded-lg mb-3">
                    <h4 className="text-blue-600 font-semibold">Promotion Active</h4>
                    <p><strong>Nom:</strong> {cadeaux.promotions.name}</p>
                    <p><strong>Rabais:</strong> {cadeaux.promotions.discountPercentage}%</p>
                  </div>
                ) : (
                  <p className="text-gray-500">Aucune promotion disponible</p>
                )}

                {/* Formats Accordion */}
                <details className="mt-3">
                  <summary className="cursor-pointer text-blue-500 font-semibold">Voir les formats</summary>
                  <div className="mt-2">
                    {Array.isArray(cadeaux.formats) && cadeaux.formats.length > 0 ? (
                      cadeaux.formats.map((format) => (
                        <div key={format._id} className="mt-2 p-2 bg-gray-100 rounded-lg">
                          <p><strong>Type:</strong> {format.type}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Aucun format disponible</p>
                    )}
                  </div>
                </details>

                {/* Actions */}
                <div className="mt-4 flex justify-between items-center">
                  <Link href={`/edit/cadeaux/${cadeaux._id}`}>
                    <GrEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" size={20} />
                  </Link>
                  <MdDeleteForever className="text-red-500 hover:text-red-700 cursor-pointer" size={24} onClick={() => removeCadeaux(cadeaux._id)} />
                  <button 
                    className="text-green-500 hover:text-green-700" 
                    onClick={() => {
                      setSelectedCadeauId(cadeaux._id);
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
          <p className="text-gray-600 text-center">Aucun Cadeau disponible</p>
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <Link href={'/admin/cadeaux'}>
          <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
            Ajouter un cadeau
          </button>
        </Link>
      </div>
      {/* Promotion Assignment Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-bold mb-4">Sélectionner une Promotion</h2>
            <select
              value={selectedPromotion || ''}
              onChange={(e) => setSelectedPromotion(e.target.value)}
              className="border rounded-lg p-2 w-full mb-4"
            >
              <option value="">Choisir une promotion</option>
              {promotions.map((promo) => (
                <option key={promo._id} value={promo._id}>
                  {promo.name} - {promo.discountPercentage}%
                </option>
              ))}
            </select>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={assignPromotionToCadeau}
              >
                Assign
              </button>
              <button
                className="bg-gray-300 py-2 px-4 rounded-lg"
                onClick={() => setModalVisible(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}