'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/_utils/AuthProvider'; // Adjust the import path as needed

export default function CommandProfile() {
    const { user, token } = useAuth(); // Get the authenticated user and token
    const [commands, setCommands] = useState([]); // Initialize commands as an empty array
    const [codeSuivi, setCodeSuivi] = useState(''); // State to handle input for codeSuivi
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error handling
    const [showCommands, setShowCommands] = useState(false); // State to toggle showing commands
    const [showAllCommands, setShowAllCommands] = useState(false); // State to show all commands

    // Fetch all commands for the user when "Show All Commands" button is clicked
    const fetchCommands = async () => {
        if (!user) return; // Exit if user is not logged in

        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/command/user/${user._id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add the authorization token
                    'Content-Type': 'application/json', // Set content type
                }
            });
            const data = await response.json();
            if (response.ok) {
                setCommands(data.data); // Set the fetched commands
                setShowCommands(true); // Show the fetched commands
                setShowAllCommands(true); // Mark that all commands are shown
            } else {
                setError(data.message); // Display error message
            }
        } catch (error) {
            console.error("Error fetching commands:", error);
            setError("Error fetching commands");
        } finally {
            setLoading(false);
        }
    };

    // Fetch a specific command by code suivi
    const handleFetchByCodeSuivi = async () => {
        setLoading(true);
        setError('');
        setShowAllCommands(false); // Hide all commands
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/command/suivi/${codeSuivi}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add the authorization token
                    'Content-Type': 'application/json', // Set content type
                }
            });
            const data = await response.json();
            if (response.ok) {
                setCommands([data.data]); // Set commands array with only the fetched command
                setShowCommands(true); // Show the fetched command
            } else {
                setError(data.message); // Display error message
            }
        } catch (error) {
            console.error("Error fetching command by codeSuivi:", error);
            setError("Error fetching command by codeSuivi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 via-purple-100 to-blue-50 shadow-lg rounded-lg mt-8">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-800">Command Profil </h1>

            <div className="flex justify-center mb-6 space-x-4">
                <input
                    type="text"
                    placeholder="Enter Code Suivi"
                    value={codeSuivi}
                    onChange={(e) => setCodeSuivi(e.target.value)}
                    className="border-2 border-gray-300 rounded-lg p-4 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                />
                <button
                    onClick={handleFetchByCodeSuivi}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg px-8 py-4 hover:bg-blue-700 transition duration-200 ease-in-out"
                >
                   Récupérer la Commande
                </button>
            </div>

            <div className="text-center mb-6">
                <button
                    onClick={fetchCommands}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg px-8 py-4 hover:bg-green-700 transition duration-200 ease-in-out"
                >
                   Afficher Toutes les Commandes
                </button>
            </div>

            {loading && <p className="text-center text-gray-500 text-lg">Loading...</p>}
            {error && <p className="text-center text-red-500 text-lg">{error}</p>}

            {/* Conditionally render commands based on the state */}
            {showCommands && commands && commands.length > 0 ? (
                <div className="space-y-6">
                    {commands.map((command) => (
                        <div key={command._id} className="border-2 border-gray-200 rounded-lg bg-white shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
                            <h3 className="text-xl font-bold mb-4 text-blue-700">Détails de la Commande</h3>
                            <p className="text-gray-700"><strong>Code Suivi:</strong> {command.codeSuivi}</p>
                            <p className="text-gray-700"><strong>Date:</strong> {new Date(command.dateCommande).toLocaleString()}</p>
                            <p className="text-gray-700"><strong>Statut:</strong> <span className="font-semibold">{command.etatLivraison}</span></p>
                            <p className="text-gray-700"><strong>Prix Total:</strong> {command.prixTotal} TND</p>
                            <p className="text-gray-700"><strong>Méthode de Paiement:</strong> {command.typeMethodePaiement}</p>

                            <div className="mt-4 bg-gray-100 p-6 rounded-lg">
                                <h4 className="font-semibold text-gray-800">Adresse de Livraison</h4>
                                <p>{command.adresseLivraison.details}</p>
                                <p>{command.adresseLivraison.ville}, {command.adresseLivraison.codePostal}</p>
                                <p><strong>Phone:</strong> {command.adresseLivraison.telephone}</p>
                            </div>

                            {command.product && command.product[0] && (
                                <div className="mt-4 bg-gray-100 p-6 rounded-lg">
                                    <h4 className="font-semibold text-gray-800">Nom du Produit</h4>
                                    <p>{command.product[0].name}</p>
                                </div>
                            )}

                            {command.product && command.product[0]?.formats && command.product[0].formats[0] && (
                                <div className="mt-4 bg-gray-100 p-6 rounded-lg">
                                    <h4 className="font-semibold text-gray-800">Format</h4>
                                    <p>{command.product[0].formats[0].type}</p>
                                    {command.product[0].formats[0].tailles && command.product[0].formats[0].tailles[0] && (
                                        <p>Taille [W/H]: {command.product[0].formats[0].tailles[0].width}/{command.product[0].formats[0].tailles[0].height} {command.product[0].formats[0].tailles[0].unit}</p>
                                    )}
                                </div>
                            )}

                            <div className="mt-4 bg-gray-100 p-6 rounded-lg">
                                <h4 className="font-semibold text-gray-800">Informations Utilisateur</h4>
                                <p><strong>Nom:</strong> {command.utilisateur.name}</p>
                            </div>

                            <h4 className="mt-6 font-semibold text-gray-800">Articles dans le Panier</h4>
                            <div className="space-y-4 mt-4">
                            <div className="space-y-4 mt-4">
    {command.panier.map((item, index) => (
        <div key={index} className="border-2 border-gray-200 rounded-lg p-4 flex bg-white shadow-sm hover:shadow-md transition duration-300 ease-in-out">
            <div className="flex space-x-2">
                {item.images && Array.isArray(item.images) && item.images.map((image, imgIndex) => (
                    <img
                        key={imgIndex}
                        src={image} // Assuming each entry in item.images is the image URL
                        alt={`Product Image ${imgIndex + 1}`}
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                ))}
            </div>
            <div className="flex-1 ml-4 text-gray-700">
                <p><strong>Quantité:</strong> {item.quantite}</p>
                <p><strong>Prix Total:</strong> {item.totalPrice} TND</p>
            </div>
        </div>
    ))}
</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg">Aucune commande trouvée.</p>
            )}
        </div>
    );
}
