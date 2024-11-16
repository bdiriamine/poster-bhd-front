"use client";  
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import currentImage from '../../../../../public/assets/image/gob.webp';
import Slides from '../../slides/Slides';
import { useRouter } from "next/navigation";
export default function ProductListCadeaux({ msg }) {
    const [cadeauxPhotos, setCadeauxPhotos] = useState([]);
    const [wrappingTypes, setWrappingTypes] = useState([]); 
    const [selectedWrappingType, setSelectedWrappingType] = useState(''); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    useEffect(() => {
        const fetchCadeauxPhotos = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cadeauxPhotos/sousCategorie/${msg}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCadeauxPhotos(data.data);
                
                // Extract wrapping types and add to state
                const allWrappingTypes = data.data.map(item => item.wrappingType).flat();
                setWrappingTypes([...new Set(allWrappingTypes)]); // Remove duplicates
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCadeauxPhotos();
    }, [msg]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Count the number of products for each wrapping type
    const wrappingTypeCounts = wrappingTypes.reduce((acc, type) => {
        acc[type] = cadeauxPhotos.filter(product => product.wrappingType.includes(type)).length;
        return acc;
    }, {});

    // Filter the products based on the selected wrapping type
    const filteredProducts = selectedWrappingType
        ? cadeauxPhotos.filter(product => product.wrappingType.includes(selectedWrappingType))
        : cadeauxPhotos;
        const handlePhotoDownload = (imgs, idCadeau) => {
            localStorage.setItem('numbres', imgs);
            localStorage.setItem('produits', idCadeau);
            localStorage.setItem('type', "cadeauxPhotos");
            router.push(`/multiDetailes`);
          };
    return (
        <div className="product-list">
            <Slides setimage={currentImage} />
            <div className="container mx-auto py-8 flex flex-col lg:flex-row">
                <div className="lg:w-1/4 mb-4 border border-zinc-400 bg-white p-4 rounded-lg shadow-md mx-2">
    <h3 className="font-bold text-xl mb-2">Available Wrapping Types</h3>
    <div className="flex gap-2 mx-3 overflow-x-scroll lg:overflow-auto">
        <button 
            onClick={() => setSelectedWrappingType('')}
            className={`px-4 py-2 whitespace-nowrap rounded border ${!selectedWrappingType ? 'bg-orange-400 text-white' : 'bg-white text-gray-800 border-gray-300'} transition duration-200 ease-in-out`}
        >
            All
        </button>
        {wrappingTypes.map((type, index) => (
            <button 
                key={index} 
                onClick={() => setSelectedWrappingType(type)} 
                className={`px-4 py-2 whitespace-nowrap rounded border ${selectedWrappingType === type ? 'bg-orange-500 text-white' : 'bg-white text-gray-800 border-gray-300'} transition duration-200 ease-in-out`}
            >
                {type} ({wrappingTypeCounts[type] || 0}) {/* Display count */}
            </button>
        ))}
    </div>
</div>

                {/* Products Grid */}
                <div className="lg:w-3/4">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-lg text-center">
    {filteredProducts.map((product) => {
        const { price, priceAfterDiscount, promotions, imageCover, name } = product;
        const hasPromotion = promotions !== null;
        console.log(product)
        return (
           
                <div 
                    className={`relative flex flex-col bg-white p-2 sm:p-4 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl ${
                        hasPromotion ? 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100' : 'border border-gray-200'
                    }`}
                >
                    {/* Responsive image container with smaller height on mobile */}
                    <div className="relative h-40 sm:h-64 w-full overflow-hidden rounded-xl mb-2 sm:mb-4">
                        <Image 
                            src={imageCover} 
                            alt={name} 
                            layout="fill" 
                            objectFit="cover" 
                            className="rounded-xl transition-transform duration-300 transform hover:scale-110"
                        />
                        {hasPromotion && (
                            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-1 sm:px-2 py-1 rounded-full shadow-md">
                                {promotions.discountPercentage}% OFF
                            </span>
                        )}
                    </div>
                    
                    {/* Responsive text sizes */}
                    <h3 className="font-bold text-sm sm:text-lg text-gray-800 mb-1 sm:mb-2">{name}</h3>
                    <div className="text-center">
                        {hasPromotion ? (
                            <>
                                <p className="text-gray-400 line-through text-xs sm:text-sm">{price} Dt</p>
                                <p className="text-red-600 text-lg sm:text-xl font-semibold">{priceAfterDiscount} Dt</p>
                            </>
                        ) : (
                            <p className="text-gray-800 font-medium text-sm sm:text-lg">{price} Dt</p>
                        )}
                    </div>

                    {hasPromotion && (
                        <div className="mt-2 sm:mt-4 text-center">
                            <p className="text-green-600 text-xs sm:text-sm font-medium">
                                Promotion: {promotions.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                                Valid until {new Date(promotions?.endDate).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                                  <button
                onClick={() => handlePhotoDownload(product.numberOfPhotos, product._id)}
                className="block mt-2 px-3 py-1 text-center bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-all"
              >
                Télécharger Photos
              </button>
                </div>

        );
    })}
</div>
                </div>
            </div>
        </div>
    );
}