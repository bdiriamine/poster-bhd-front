"use client"; // This directive ensures it's a client component 

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/_utils/AuthProvider"; // Adjust the path if necessary
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Loader from "../loader/loader";

export default function CommandEdit() {
  const { token } = useAuth(); // Getting the token from AuthProvider
  const { id } = useParams();
  const [command, setCommand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch the command details when the component mounts
    const fetchCommand = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/command/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
        }
        );
        const data = await response.json();
        if (response.ok) {
          setCommand(data); // Successfully set the command data
        } else {
          setError(data.message || "Failed to fetch command details");
        }
      } catch (error) {
        setError("Error fetching command details");
      } finally {
        setLoading(false);
      }
    };
      fetchCommand(); 
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/command/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(command), // Updated command data
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("Command updated successfully!"); // Success toast
      } else {
        setError(data.message || "Failed to update command");
        toast.error(data.message || "Failed to update command"); // Error toast
      }
    } catch (error) {
      setError("Error updating command");
      toast.error("Error updating command"); // Error toast
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommand((prevCommand) => ({
      ...prevCommand,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCommand((prevCommand) => ({
      ...prevCommand,
      adresseLivraison: {
        ...prevCommand.adresseLivraison,
        [name]: value,
      },
    }));
  };

  const handlePanierChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPanier = [...command.panier];
    updatedPanier[index] = {
      ...updatedPanier[index],
      [name]: value,
    };
    setCommand((prevCommand) => ({
      ...prevCommand,
      panier: updatedPanier,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
        Modifier la Commande
      </h1>
  
      {loading && <Loader />}
      {command && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section Adresse de Livraison */}
          <h2 className="text-xl font-bold mb-2">Adresse de Livraison</h2>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Détails de l'adresse
            </label>
            <input
              type="text"
              name="details"
              value={command.adresseLivraison.details || ""}
              onChange={handleAddressChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Autres champs de l'adresse */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Téléphone</label>
            <input
              type="text"
              name="telephone"
              value={command.adresseLivraison.telephone || ""}
              onChange={handleAddressChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Ville</label>
            <input
              type="text"
              name="ville"
              value={command.adresseLivraison.ville || ""}
              onChange={handleAddressChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Code Postal</label>
            <input
              type="text"
              name="codePostal"
              value={command.adresseLivraison.codePostal || ""}
              onChange={handleAddressChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Section Détails de la Commande */}
          <h2 className="text-xl font-bold mb-2">Détails de la Commande</h2>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Code de Suivi</label>
            <input
              type="text"
              name="codeSuivi"
              value={command.codeSuivi || ""}
              readOnly
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
            Statut de la Livraison
            </label>
            <select
              name="etatLivraison"
              value={command.etatLivraison || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="En attente">En attente</option>
              <option value="En préparation">En préparation</option>
              <option value="Expédiée">Expédiée</option>
              <option value="En transit">En transit</option>
              <option value="Prise en charge par le livreur">Prise en charge par le livreur</option>
              <option value="Livrée">Livrée</option>
              <option value="Échec de livraison">Échec de livraison</option>
              <option value="Retournée">Retournée</option>
              <option value="Annulée">Annulée</option>
            </select>
          </div>
  
          {/* Cart Items Section */}
          <h2 className="text-xl font-bold mb-2">Articles du Panier</h2>
          {command.panier.map((item, index) => (
            <div key={item._id} className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantite"
                value={item.quantite}
                readOnly
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              />
              <p className="text-gray-500 mt-1">Product ID: {item.product}</p>
            </div>
          ))}
  
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-700 transition"
            >
               Enregistrer les modifications
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
