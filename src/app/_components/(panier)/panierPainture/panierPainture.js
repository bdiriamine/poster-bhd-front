"use client";
import React, { useEffect, useState } from 'react';

const PanierPeinture = ({
  panier,
  handleQuantityChange,
  handleDeletePanierItem,
  handleCommand,
  totalPanierPrice,
  pricePerUnitdata,
}) => {
  const [quantités, setQuantités] = useState({});

  useEffect(() => {
    const quantitésSauvegardées =
      JSON.parse(localStorage.getItem('panierQuantities')) || {};
    setQuantités(quantitésSauvegardées);
  }, []);

  useEffect(() => {
    localStorage.setItem('panierQuantities', JSON.stringify(quantités));
  }, [quantités]);

  const handleChangementQuantité = (id, valeur) => {
    const nouvelleQuantité = parseInt(valeur, 10);
    if (nouvelleQuantité < 1) return;
    setQuantités((prev) => ({
      ...prev,
      [id]: nouvelleQuantité,
    }));
    handleQuantityChange(nouvelleQuantité, id, panier.find((item) => item._id === id).images);
  };

  const handleAugmenter = (id) => {
    const quantitéActuelle = quantités[id] || panier.find((item) => item._id === id).quantite;
    handleChangementQuantité(id, quantitéActuelle + 1);
  };

  const handleDiminuer = (id) => {
    const quantitéActuelle = quantités[id] || panier.find((item) => item._id === id).quantite;
    if (quantitéActuelle > 1) {
      handleChangementQuantité(id, quantitéActuelle - 1);
    }
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Votre Panier</h2>
      <ul className="space-y-4">
        {panier.map((item) => (
          <li
            key={item._id}
            className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm transition transform hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row items-center md:space-x-4 w-full">
              <img
                src={item.product.imageCover}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 mb-4 md:mb-0"
              />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full space-y-2 md:space-y-0">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-700">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">
                    Prix : <span className="font-medium">{item.tailles?.price || item.product.price} DT</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Dimensions : {item.tailles?.width}/{item.tailles?.height} {item.tailles?.unit}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDiminuer(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantités[item._id] || item.quantite}
                    min="1"
                    onChange={(e) => handleChangementQuantité(item._id, e.target.value)}
                    className="w-16 text-center border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => handleAugmenter(item._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="self-end md:self-center mt-4 md:mt-0">
            <button
              onClick={() => handleDeletePanierItem(item._id)}
             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium shadow"
            >
              Supprimer
            </button>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default PanierPeinture;
