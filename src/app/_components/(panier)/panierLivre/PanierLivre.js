"use client";
import React, { useEffect, useState } from "react";

const PanierLivre = ({
  panier,
  handleQuantityChange,
  handleDeletePanierItem,
  handleCommand,
  totalPanierPrice,
  pricePerUnitdata,
}) => {
  const [quantités, setQuantités] = useState({});

  useEffect(() => {
    const quantitésEnregistrées =
      JSON.parse(localStorage.getItem("panierQuantités")) || {};
    setQuantités(quantitésEnregistrées);
  }, []);

  useEffect(() => {
    localStorage.setItem("panierQuantités", JSON.stringify(quantités));
  }, [quantités]);

  const handleInputChange = (id, value) => {
    if (value < 1) return; // Empêcher de définir une valeur inférieure à 1
    setQuantités((quantitésPrécédentes) => ({
      ...quantitésPrécédentes,
      [id]: value,
    }));
    handleQuantityChange(value, id);
  };

  const handleIncrease = (id) => {
    const nouvelleValeur =
      (quantités[id] || panier.find(item => item._id === id).quantite) + 1;
    handleInputChange(id, nouvelleValeur);
  };

  const handleDecrease = (id) => {
    const quantitéActuelle =
      quantités[id] || panier.find(item => item._id === id).quantite;
    if (quantitéActuelle > 1) {
      handleInputChange(id, quantitéActuelle - 1);
    }
  };

  return (
    <div className="mb-8 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Votre Panier</h2>
      <ul className="space-y-6">
        {panier.map((item, index) => (
          <li
            key={item._id}
            className="flex flex-col md:flex-row items-start md:items-center p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 border border-gray-200"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center w-full md:space-x-6">
              {/* Images */}
              <div className="flex space-x-3">
                {item.images?.map((imageUrl, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={imageUrl}
                    alt={`Image ${imgIndex + 1} de ${item.product.name}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))}
              </div>

              {/* Détails du produit */}
              <div className="mt-4 md:mt-0 flex-1">
                <h3 className="font-bold text-lg text-gray-700">{item.product.name}</h3>
                <p className="text-md text-gray-500">Prix : {pricePerUnitdata[index]} DT</p>
                <div className="flex items-center mt-3">
                  <label className="mr-2 text-md text-gray-600">Quantité :</label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantités[item._id] || item.quantite}
                      min="1"
                      onChange={(e) =>
                        handleInputChange(item._id, parseInt(e.target.value))
                      }
                      className="text-center w-12 px-2 py-1 border-l border-r outline-none"
                    />
                    <button
                      onClick={() => handleIncrease(item._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton Supprimer */}
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

export default PanierLivre;
