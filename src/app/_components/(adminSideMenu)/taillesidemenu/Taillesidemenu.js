"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from "next/link";
import { useAuth } from "@/app/_utils/AuthProvider";

export default function Taillesidemenu({ msg }) {
  const [data, setData] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotions, setSelectedPromotions] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tailleResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles?ts=${new Date().getTime()}`
        );
        if (!tailleResponse.ok) throw new Error("Failed to fetch tailles");
        const tailleResult = await tailleResponse.json();
        setData(tailleResult.data);

        const promotionResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions?ts=${new Date().getTime()}`
        );
        if (!promotionResponse.ok) throw new Error("Failed to fetch promotions");
        const promotionResult = await promotionResponse.json();
        setPromotions(promotionResult.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const removeTaille = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this taille?");
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to delete this taille");
        setData(data.filter((taille) => taille._id !== id));
        alert("Taille deleted successfully");
      } catch (error) {
        console.error(error);
        alert("Failed to delete this taille");
      }
    }
  };

  const addPromotionToTaille = async (id) => {
    const promotionId = selectedPromotions[id];
    if (!promotionId) {
      alert("Please select a promotion to add.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles/${id}/promotions/${promotionId}?ts=${new Date().getTime()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to add promotion");
      alert("Promotion added successfully");
      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles`
      );
      const updatedResult = await updatedResponse.json();
      setData(updatedResult.data);
    } catch (error) {
      console.error(error);
      alert("Failed to add promotion");
    }
  };

  const removePromotionFromTaille = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove the promotion?");
    if (confirmDelete) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles/${id}/promotions`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to remove promotion");
        alert("Promotion removed successfully");
        const updatedResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles`
        );
        const updatedResult = await updatedResponse.json();
        setData(updatedResult.data);
      } catch (error) {
        console.error(error);
        alert("Failed to remove promotion");
      }
    }
  };

  const handlePromotionChange = (id, promotionId) => {
    setSelectedPromotions((prev) => ({ ...prev, [id]: promotionId }));
  };

  return (
    <div className="bg-white min-h-screen rounded-lg p-6 transition duration-500 ease-in-out">
      {data.length > 0 && (
        <div className="flex items-center justify-center h-16 mb-4 rounded bg-gray-100 shadow-lg">
          <p className="text-2xl text-gray-600 font-bold">{`Liste des ${msg}`}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.length > 0 ? (
          data.map((res) => (
            <div key={res._id} className="p-4 rounded-lg bg-gray-200 border-2 border-gray-300 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <p className="text-gray-800"><strong>L:</strong> {res.width} / <strong>H:</strong> {res.height} <strong>Unité:</strong> {res.unit}</p>
              <p className="text-gray-800">
                <strong>Prix original:</strong> {res.price} €
                {res.discountedPrice < res.price && (
                  <>
                    <br />
                    <span className="line-through text-red-500">{res.price} €</span>
                    <strong> Prix après remise:</strong> {res.discountedPrice} €
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
                    className="mx-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
                  />
                ) : (
                  <div className="bg-gray-300 w-20 h-20 flex items-center justify-center text-gray-600 rounded-lg">Image not available</div>
                )}
              </div>
              <p className="text-gray-800"><strong>Format:</strong> {res.format?.type || 'N/A'}</p>
              <select
                className="bg-gradient-to-r from-teal-400 to-blue-500 p-2 rounded-md border border-gray-400 hover:border-blue-500 transition duration-200"
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
              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-500 text-white p-2 rounded-md transition duration-200 hover:bg-blue-600 flex items-center">
                  <Link href={`/edit/taille/${res._id}`}>
                    <GrEdit className="text-xl" />
                  </Link>
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-md transition duration-200 hover:bg-red-600 flex items-center"
                  onClick={() => removeTaille(res._id)}
                >
                  <MdDeleteForever className="text-xl" />
                </button>
                <button
                  className="bg-teal-400 text-white p-2 rounded-md transition duration-200 hover:bg-teal-500"
                  onClick={() => addPromotionToTaille(res._id)}
                >
                  Add Promotion
                </button>
                {res.promotion && (
                  <button
                    className="bg-red-300 text-black p-2 rounded-md transition duration-200 hover:bg-red-400"
                    onClick={() => removePromotionFromTaille(res._id)}
                  >
                    Remove Promotion
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-800">Aucune donnée disponible</p>
        )}
      </div>
      <Link href={'/admin/taille'}>
        <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all"> + Créer Taille </button>
      </Link>
    </div>
  );
}