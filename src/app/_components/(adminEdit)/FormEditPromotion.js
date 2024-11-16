'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/app/_utils/AuthProvider';
export default function FormEditPromotion() {
  const { id } = useParams(); // Get the promotion ID from the URL
  const [promotionData, setPromotionData] = useState({
    name: "",
    discountPercentage: 0,
    startDate: "",
    endDate: "",
    produits: [],
    tailles: [],
  });
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchPromotionData();
    fetchDataproducts();
    fetchDatasize();
  }, []);

  const fetchPromotionData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions/${id}`);
      const data = await res.json();
      if (data) {

        setPromotionData(data.data);
      } else {
        console.error("Failed to fetch promotion data");
      }
    } catch (err) {
      console.error("Error fetching promotion data", err);
    }
  };

  const fetchDataproducts = async () => {
    try {
      const productsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
      const productsData = await productsRes.json();
      setProducts(productsData.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const fetchDatasize = async () => {
    try {
      const sizesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles`);
      const sizesData = await sizesRes.json();
      setSizes(sizesData.data || []);
    } catch (err) {
      console.error("Failed to fetch sizes", err);
    }
  };

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(promotionData),
      });

      if (response.ok) {
        alert("Promotion updated successfully");
        router.push("/admin/promotion"); // Redirect after update
      } else {
        console.error("Failed to update promotion");
        alert("Failed to update promotion");
      }
    } catch (err) {
      console.error("Error updating promotion", err);
      alert("Error updating promotion");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Edit Promotion</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Promotion Name:</label>
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
            <label className="block text-sm font-medium text-gray-700">Discount Percentage:</label>
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
            <label className="block text-sm font-medium text-gray-700">Start Date:</label>
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
          <label className="block text-sm font-medium text-gray-700">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={promotionData.endDate}
            onChange={handleInputChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Associated Products:</label>
          <select
            name="produits"
            multiple
            value={promotionData.produits}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
              setPromotionData((prevData) => ({ ...prevData, produits: selectedOptions }));
            }}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
          >
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <option key={product?._id} value={product?._id}>
                  {product?.name}
                </option>
              ))
            ) : (
              <option disabled>Loading products...</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Available Sizes:</label>
          <select
            name="tailles"
            multiple
            value={promotionData.tailles}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
              setPromotionData((prevData) => ({ ...prevData, tailles: selectedOptions }));
            }}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
          >
            {Array.isArray(sizes) && sizes.length > 0 ? (
              sizes.map((size) => (
                <option key={size?._id} value={size?._id}>
                  {size?.width} / {size?.height} {size?.unit}
                </option>
              ))
            ) : (
              <option disabled>Loading sizes...</option>
            )}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-3 rounded-lg shadow-md hover:bg-teal-600 transition-colors"
        >
          Update Promotion
        </button>
      </form>
    </div>
  );
}