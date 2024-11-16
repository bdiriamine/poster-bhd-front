'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_utils/AuthProvider';
import { toast } from 'react-toastify';
export default function FormAddPromotion() {
  const [promotionData, setPromotionData] = useState({
    name: '',
    discountPercentage: 0,
    startDate: '',
    endDate: '',
  });

  const { token } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromotionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions?ts=${new Date().getTime()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(promotionData),
      });

      if (response.ok) {
        toast.success('Promotion créée avec succès!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
      });
        router.push('/admin/promotion'); // Redirect after creation
      } else {
        toast.error('Échec de la création de la promotion' , {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
      });
      }
    } catch (err) {
      toast.error('Échec de la création de la promotion', err , {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    });
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Ajouter une nouvelle promotion</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom de la promotion</label>
          <input
            type="text"
            name="name"
            value={promotionData.name}
            onChange={handleInputChange}
            placeholder="Enter promotion name"
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Pourcentage de réduction :</label>
            <input
              type="number"
              name="discountPercentage"
              value={promotionData.discountPercentage}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
              min="0"
              max="100"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Date de début :</label>
            <input
              type="date"
              name="startDate"
              value={promotionData.startDate}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date de fin :</label>
          <input
            type="date"
            name="endDate"
            value={promotionData.endDate}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-3 rounded-lg shadow-md hover:bg-teal-600 transition-colors"
        >
          Créer la promotion
        </button>
      </form>
    </div>
  );
}