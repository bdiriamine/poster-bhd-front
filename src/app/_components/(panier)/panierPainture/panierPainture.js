"use client";
import React, { useEffect, useState } from 'react';

const PanierPainture = ({
  panier,
  handleQuantityChange,
  handleDeletePanierItem,
  handleCommand,
  totalPanierPrice,
  pricePerUnitdata,
}) => {
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const savedQuantities = JSON.parse(localStorage.getItem('panierQuantities')) || {};
    setQuantities(savedQuantities);
  }, []);

  useEffect(() => {
    localStorage.setItem('panierQuantities', JSON.stringify(quantities));
  }, [quantities]);

  const handleInputChange = (id, value) => {
    const newQuantity = parseInt(value);
    if (newQuantity < 1) return;
    setQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));
    handleQuantityChange(newQuantity, id, panier.find(item => item._id === id).images);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold">Panier </h2>
      <ul>
        {panier.map((item) => (
          <li key={item._id} className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
              {/* Display product image */}
              <img
                src={item.product.imageCover} // Adjust this based on the actual image path in `item`
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div>
                <h3 className="font-bold">{item.product.name}</h3>
                <p>Price: {item.tailles?.price || item.product.price} DT</p>
                <p>W/H: {item.tailles?.width}/{item.tailles?.height} {item.tailles?.unit}</p>
                <div className="flex items-center">
                  <label className="mr-2">Quantity:</label>
                  <input
                    type="number"
                    value={quantities[item._id] || item.quantite}
                    min="1"
                    onChange={(e) => handleInputChange(item._id, e.target.value)}
                    className="border rounded px-2 w-20"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleDeletePanierItem(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanierPainture;