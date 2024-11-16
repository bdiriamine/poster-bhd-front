'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function CarteSidemenu() {
  const [data, setData] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchCartes();
  }, [token]);

  const fetchCartes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cartesphotos?ts=${new Date().getTime()}`, {
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

  const removeLivre = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this carte?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cartesphotos/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to delete this carte');
        setData(data.filter(livre => livre._id !== id));
        alert('Livre deleted successfully');
      } catch (error) {
        alert('Failed to delete this carte');
      }
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100 p-6">
      <div className="flex justify-center mb-8">
        <h2 className="text-gray-00 text-3xl font-bold">Cartes </h2>
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
                {/* If promotion exists, show a promotion badge */}
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
                <p className="text-gray-700 mb-3">{livre.numberOfPhotos } images</p>         
                {/* Check for promotion details */}
                {livre.promotions ? (
  <div className="p-3 bg-blue-50 rounded-lg mb-3">
    <h4 className="text-blue-600 font-semibold">Promotion Active</h4>
    <p><strong>Nom:</strong> {livre.promotions.name}</p>
    <p><strong>Rabais:</strong> {livre.promotions.discountPercentage}%</p>
    <Link href={`/admin/promotion/${livre.promotions._id}`}>
      <button className="mt-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white py-1 px-3 rounded shadow hover:shadow-lg transform hover:scale-105 transition-all">
        Gérer Promotion
      </button>
    </Link>
  </div>
) : (
  <p className="text-gray-500">Aucune promotion disponible</p>
)}

                {/* Formats Accordion */}
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

                {/* Actions */}
                <div className="mt-4 flex justify-between items-center">
                  <Link href={`/edit/carte/${livre._id}`}>
                    <GrEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" size={20} />
                  </Link>
                  <MdDeleteForever className="text-red-500 hover:text-red-700 cursor-pointer" size={24} onClick={() => removeLivre(livre._id)} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black text-center">Aucune carte disponible</p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href={'/admin/carte'}>
          <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
            Ajouter une carte
          </button>
        </Link>
      </div>
    </div>
  );
}