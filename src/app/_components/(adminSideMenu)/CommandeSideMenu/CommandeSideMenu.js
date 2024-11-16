"use client";
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from 'next/link';
import { useAuth } from '@/app/_utils/AuthProvider';
import { FaCloudDownloadAlt } from "react-icons/fa";

export default function CommandeSideMenu() {
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/command`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch commandes');
                const data = await response.json();
                setCommandes(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCommandes();
    }, [token]);

    const handleDelete = async (commandeId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this commande?");
        if (confirmDelete) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/command/${commandeId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Failed to delete commande');
                setCommandes(commandes.filter(commande => commande._id !== commandeId));
                alert('Commande deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to delete commande');
            }
        }
    };

    if (loading) return <p className="text-center text-sm text-gray-500">Loading commandes...</p>;
    if (error) return <p className="text-center text-sm text-red-500">{error}</p>;

    const handleDownloadImages = async (panier) => {
        for (const item of panier) {
            for (const [index, imageUrl] of item.images.entries()) {
                try {
                    const response = await fetch(imageUrl);
                    if (!response.ok) throw new Error('Erreur lors de la récupération de l\'image');

                    const blob = await response.blob();
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `${item.product.name}_image_${index + 1}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                } catch (error) {
                    console.error('Erreur lors du téléchargement de l\'image:', error);
                }
            }
        }
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-medium text-gray-800 mb-4 text-center">Liste des Commandes</h2>
            {commandes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {commandes.map((commande) => (
                        <div
                            key={commande._id}
                            className="border border-gray-200 p-4 rounded-md bg-white shadow-sm hover:shadow-md transition-transform transform hover:scale-105 w-72 "
                        >
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Commande ID: {commande._id}</h3>
                            <p className="text-xs text-gray-600"><strong>Date:</strong> {new Date(commande.dateCommande).toLocaleString()}</p>
                            <p className="text-xs text-gray-600"><strong>Utilisateur:</strong> {commande.utilisateur.name}</p>
                            <p className="text-sm text-gray-600"><strong>Prix Total:</strong> {commande.prixTotal.toFixed(2)} TND</p>
                            {/* État Livraison with conditional color and animation */}
                            <p
                                className={`text-sm font-medium p-1 rounded-md transition-colors ${
                                    commande.etatLivraison === "Livré" 
                                        ? "bg-green-100 text-green-800"
                                        : commande.etatLivraison === "En transit"
                                        ? " text-yellow-800"
                                        : " text-red-800"
                                }`}
                            >
                                <strong>État Livraison:</strong> {commande.etatLivraison}
                            </p>
                            {/* Status de paiement with conditional color and animation */}
                            <p
                                className={`text-sm font-medium p-1 rounded-md transition-colors ${
                                    commande.estPaye 
                                        ? " text-green-800"
                                        : " text-yellow-600"
                                }`}
                            >
                                <strong>Status de paiement:</strong> {commande.estPaye ? 'Payé' : 'Non payé'}
                            </p>
                            <p className="text-xs text-green-600"><strong>Code de Suivi:</strong> {commande.codeSuivi}</p>

                            {/* Adresse Livraison */}
                            <div className="mt-2 bg-gray-100 p-2 rounded-md">
                                <h4 className="text-sm font-bold text-gray-700">Adresse de Livraison</h4>
                                <p className="text-xs text-gray-600"><strong>Détails:</strong> {commande.adresseLivraison.details}</p>
                                <p className="text-xs text-gray-600"><strong>Téléphone:</strong> {commande.adresseLivraison.telephone}</p>
                                <p className="text-xs text-gray-600"><strong>Ville:</strong> {commande.adresseLivraison.ville}</p>
                                <p className="text-xs text-gray-600"><strong>Code Postal:</strong> {commande.adresseLivraison.codePostal}</p>
                            </div>

                            {/* Panier Section */}
                            <div className="mt-2 bg-gray-100 p-2 rounded-md">
                                <h4 className="text-sm font-bold text-gray-700">Panier</h4>
                                {commande.panier && commande.panier.length > 0 ? (
                                    <ul className="mt-1 space-y-1">
                                        {commande.panier.map((item) => (
                                            <li key={item._id} className="border border-gray-200 p-2 rounded-md bg-gray-50">
                                                <p className="text-xs text-gray-700"><strong>Produit:</strong> {item.product.name}</p>
                                                <p className="text-xs text-gray-700"><strong>Quantité:</strong> {item.quantite}</p>
                                                <p className="text-xs text-gray-700"><strong>Prix Total:</strong> {item.totalPrice.toFixed(2)} TND</p>
                                                <div className="flex gap-1 mt-1">
                                                    {item.images.map((imageUrl, index) => (
                                                        <img
                                                            key={index}
                                                            src={imageUrl}
                                                            alt={`${item.product.name} image ${index + 1}`}
                                                            className="w-12 h-12 object-cover rounded-md border border-gray-300"
                                                        />
                                                    ))}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-xs text-gray-500">Panier est vide.</p>
                                )}
                            </div>

                            {/* Edit and Delete Buttons */}
                            <div className="flex items-center justify-between  bottom-0 left-0 w-full bg-white p-4 shadow-lg space-x-2">
                                <button
                                    className="flex items-center gap-1 bg-green-500 hover:bg-green-400 text-white text-xs py-1 px-2 rounded-md"
                                    onClick={() => handleDownloadImages(commande.panier)}
                                >
                                    <FaCloudDownloadAlt />
                                </button>
                                <Link href={`/edit/command/${commande._id}`}>
                                    <button className="flex items-center gap-1 bg-blue-500 hover:bg-blue-400 text-white text-xs py-1 px-2 rounded-md">
                                        <GrEdit className="text-white" />
                                    </button>
                                </Link>
                                <button
                                    className="flex items-center gap-1 bg-red-500 hover:bg-red-400 text-white text-xs py-1 px-2 rounded-md"
                                    onClick={() => handleDelete(commande._id)}
                                >
                                    <MdDeleteForever className="text-white" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm text-center">Aucune commande disponible</p>
            )}
        </div>
    );
}