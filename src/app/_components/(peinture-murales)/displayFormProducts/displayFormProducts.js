"use client"; // Utiliser côté client
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Loader from '../../loader/loader';

export default function AfficherFormProduits() {
    const [produits, setProduits] = useState([]);
    const [cadres, setCadres] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState('');

    useEffect(() => {
        const recupererProduits = async () => {
            try {
                const reponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category=Peinture murales`);
                if (!reponse.ok) {
                    throw new Error('Échec de la récupération des produits');
                }
                const donnees = await reponse.json();
                setProduits(donnees.data || []);
            } catch (err) {
                setErreur('Erreur lors de la récupération des produits : ' + err.message);
            } finally {
                setChargement(false);
            }
        };

        const recupererCadres = async () => {
            try {
                const reponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category=Tableaux muraux avec cadres`);
                if (!reponse.ok) {
                    throw new Error('Échec de la récupération des produits');
                }
                const donnees = await reponse.json();
                setCadres(donnees.data || []);
            } catch (err) {
                setErreur('Erreur lors de la récupération des produits : ' + err.message);
            } finally {
                setChargement(false);
            }
        };

        recupererProduits();
        recupererCadres();
    }, []);

    if (chargement) return <p><Loader /></p>;
    if (erreur) return <p className="text-red-500">{erreur}</p>;

    return (
        <>
            <div className="container mx-auto py-8">
                {/* Premier ensemble de produits - Peinture murales */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
                    {produits.map((produit) => {
                        const { price, discountedPrice, promotion, imageCover, name } = produit;
                        const aPromotion = promotion !== null;

                        return (
                            <Link href={`/peinture-murales/${name}`} key={produit._id}>
                                <div 
                                    className={`relative flex flex-col bg-white p-4 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl ${
                                        aPromotion ? 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100' : 'border border-gray-200'
                                    }`}
                                >
                                    <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-xl mb-2 sm:mb-4">
                                        <Image 
                                            src={imageCover} 
                                            alt={name} 
                                            layout="fill" 
                                            objectFit="cover" 
                                            className="rounded-xl transition-transform duration-300 transform hover:scale-110"
                                        />
                                        {aPromotion && (
                                            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                                {promotion.discountPercentage}% OFF
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-sm sm:text-lg text-gray-800 mb-1 sm:mb-2">{name}</h3>
                                    <div className="text-center">
                                        {aPromotion ? (
                                            <>
                                                <p className="text-gray-400 line-through text-xs sm:text-sm">{price} Dt</p>
                                                <p className="text-red-600 text-lg sm:text-xl font-semibold">{discountedPrice} Dt</p>
                                            </>
                                        ) : (
                                            <p className="text-gray-800 font-medium text-sm sm:text-lg">{price} Dt</p>
                                        )}
                                    </div>
                                    {aPromotion && (
                                        <div className="mt-2 sm:mt-4 text-center">
                                            <p className="text-green-600 text-xs sm:text-sm font-medium">
                                                Promotion : {promotion.name}
                                            </p>
                                            <p className="text-gray-500 text-xs sm:text-xs">
                                                Valable jusqu'au {new Date(promotion.endDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Deuxième ensemble de produits - Cadres */}
            <div className="container mx-auto py-8">
                <p className="text-center text-lg sm:text-xl font-bold mb-6">Choisissez votre fresque murale dans le cadre</p>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
                    {cadres.map((produit) => {
                        const { price, discountedPrice, promotion, imageCover, name } = produit;
                        const aPromotion = promotion !== null;

                        return (
                            <Link href={`/peinture-murales/${name}`} key={produit._id}>
                                <div 
                                    className={`relative flex flex-col bg-white p-4 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl ${
                                        aPromotion ? 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100' : 'border border-gray-200'
                                    }`}
                                >
                                    <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-xl mb-2 sm:mb-4">
                                        <Image 
                                            src={imageCover} 
                                            alt={name} 
                                            layout="fill" 
                                            objectFit="cover" 
                                            className="rounded-xl transition-transform duration-300 transform hover:scale-110"
                                        />
                                        {aPromotion && (
                                            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                                {promotion.discountPercentage}% OFF
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-sm sm:text-lg text-gray-800 mb-1 sm:mb-2">{name}</h3>
                                    <div className="text-center">
                                        {aPromotion ? (
                                            <>
                                                <p className="text-gray-400 line-through text-xs sm:text-sm">{price} Dt</p>
                                                <p className="text-red-600 text-lg sm:text-xl font-semibold">{discountedPrice} Dt</p>
                                            </>
                                        ) : (
                                            <p className="text-gray-800 font-medium text-sm sm:text-lg">{price} Dt</p>
                                        )}
                                    </div>
                                    {aPromotion && (
                                        <div className="mt-2 sm:mt-4 text-center">
                                            <p className="text-green-600 text-xs sm:text-sm font-medium">
                                                Promotion : {promotion.name}
                                            </p>
                                            <p className="text-gray-500 text-xs sm:text-xs">
                                                Valable jusqu'au {new Date(promotion.endDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
