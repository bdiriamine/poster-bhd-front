"use client"; 
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Loader from '../../loader/loader';

export default function DisplayFormProducts() {
    const [products, setProducts] = useState([]);
    const [cadre, setCadre] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category=Peinture murales`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.data || []);
            } catch (err) {
                setError('Error fetching products: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        const fetchCadre = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category=Tableaux muraux avec cadres`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setCadre(data.data || []);
            } catch (err) {
                setError('Error fetching products: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
        fetchCadre();
    }, []);

    if (loading) return <p><Loader /></p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            <div className="container mx-auto py-8">
                {/* First product set - Peinture murales */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
                    {products.map((product) => {
                        const { price, discountedPrice, promotion, imageCover, name } = product;
                        const hasPromotion = promotion !== null;

                        return (
                            <Link href={`/peinture-murales/${name}`} key={product._id}>
                                <div 
                                    className={`relative flex flex-col bg-white p-4 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl ${
                                        hasPromotion ? 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100' : 'border border-gray-200'
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
                                        {hasPromotion && (
                                            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                                {promotion.discountPercentage}% OFF
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-sm sm:text-lg text-gray-800 mb-1 sm:mb-2">{name}</h3>
                                    <div className="text-center">
                                        {hasPromotion ? (
                                            <>
                                                <p className="text-gray-400 line-through text-xs sm:text-sm">{price} Dt</p>
                                                <p className="text-red-600 text-lg sm:text-xl font-semibold">{discountedPrice} Dt</p>
                                            </>
                                        ) : (
                                            <p className="text-gray-800 font-medium text-sm sm:text-lg">{price} Dt</p>
                                        )}
                                    </div>
                                    {hasPromotion && (
                                        <div className="mt-2 sm:mt-4 text-center">
                                            <p className="text-green-600 text-xs sm:text-sm font-medium">
                                                Promotion: {promotion.name}
                                            </p>
                                            <p className="text-gray-500 text-xs sm:text-xs">
                                                Valid until {new Date(promotion.endDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Second product set - Cadres */}
            <div className="container mx-auto py-8">
                <p className="text-center text-lg sm:text-xl font-bold mb-6">Choisissez votre fresque murale dans le cadre</p>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
                    {cadre.map((product) => {
                        const { price, discountedPrice, promotion, imageCover, name } = product;
                        const hasPromotion = promotion !== null;

                        return (
                            <Link href={`/peinture-murales/${name}`} key={product._id}>
                                <div 
                                    className={`relative flex flex-col bg-white p-4 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl ${
                                        hasPromotion ? 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100' : 'border border-gray-200'
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
                                        {hasPromotion && (
                                            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                                {promotion.discountPercentage}% OFF
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-sm sm:text-lg text-gray-800 mb-1 sm:mb-2">{name}</h3>
                                    <div className="text-center">
                                        {hasPromotion ? (
                                            <>
                                                <p className="text-gray-400 line-through text-xs sm:text-sm">{price} Dt</p>
                                                <p className="text-red-600 text-lg sm:text-xl font-semibold">{discountedPrice} Dt</p>
                                            </>
                                        ) : (
                                            <p className="text-gray-800 font-medium text-sm sm:text-lg">{price} Dt</p>
                                        )}
                                    </div>
                                    {hasPromotion && (
                                        <div className="mt-2 sm:mt-4 text-center">
                                            <p className="text-green-600 text-xs sm:text-sm font-medium">
                                                Promotion: {promotion.name}
                                            </p>
                                            <p className="text-gray-500 text-xs sm:text-xs">
                                                Valid until {new Date(promotion.endDate).toLocaleDateString()}
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