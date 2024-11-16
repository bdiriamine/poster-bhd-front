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
  const [quantities, setQuantities] = useState({});
  console.log(totalPanierPrice);
  console.log(pricePerUnitdata);

  useEffect(() => {
    const savedQuantities =
      JSON.parse(localStorage.getItem("panierQuantities")) || {};
    setQuantities(savedQuantities);
  }, []);

  useEffect(() => {
    localStorage.setItem("panierQuantities", JSON.stringify(quantities));
  }, [quantities]);

  const handleInputChange = (id, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value,
    }));
    handleQuantityChange(value, id);
  };

  return (
    <div className="mb-8 px-4">
      <h2 className="text-xl font-semibold mb-4">Panier </h2>
      <ul className="space-y-4">
        {panier.map((item, index) => (
          <li
            key={item._id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b space-y-4 md:space-y-0"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center w-full md:space-x-4">
              {/* Images */}
              <div className="flex space-x-2">
                {item.images?.map((imageUrl, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={imageUrl}
                    alt={`${item.product.name} image ${imgIndex + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>

              {/* Product Details */}
              <div className="mt-4 md:mt-0 flex-1">
                <h3 className="font-bold text-sm md:text-base">{item.product.name}</h3>
                <p className="text-sm md:text-base">Price: {pricePerUnitdata[index]} DT</p>
                <div className="flex items-center mt-2">
                  <label className="mr-2 text-sm md:text-base">Quantity:</label>
                  <input
                    type="number"
                    value={quantities[item._id] || item.quantite}
                    min="1"
                    onChange={(e) =>
                      handleInputChange(item._id, parseInt(e.target.value))
                    }
                    className="border rounded px-2 py-1 text-sm w-16"
                  />
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <div className="self-end md:self-center mt-2 md:mt-0">
              <button
                onClick={() => handleDeletePanierItem(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded text-sm md:text-base"
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

export default PanierLivre;