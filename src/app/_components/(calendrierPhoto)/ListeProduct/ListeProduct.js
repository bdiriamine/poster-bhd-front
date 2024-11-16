"use client";
import React, { useEffect, useState } from 'react';
import Slides from '../../slides/Slides';
import clBureau from '../../../../../public/assets/image/pfk-nachhaltig-hoch-quer-ki-pflanzen-ebenen-neutral_10214__1_.avif';
import clPhotos from '../../../../../public/assets/image/mr.avif';
import clFamilial from '../../../../../public/assets/image/fm.avif';
import Link from 'next/link';
import Image from 'next/image';

export default function ListeProduct({ msg }) {
  const [calendriePhotos, setCalendriePhotos] = useState([]);
  const [formatTypes, setFormatTypes] = useState([]);
  const [selectedFormatType, setSelectedFormatType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let currentImage;
  switch (msg) {
    case 'Calendrier de bureau':
      currentImage = clBureau;
      break;
    case 'Calendrier photos':
      currentImage = clPhotos;
      break;
    case 'Planificateur familial':
      currentImage = clFamilial;
      break;
    default:
      currentImage = clBureau;
  }

  useEffect(() => {
    const fetchCalendriePhotos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendriePhoto?sousCategoryName=${encodeURIComponent(msg)}`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        const products = data.data;
        const extractedFormatTypes = [
          ...new Set(products.flatMap((product) => product.formats.map((format) => format.type))),
        ];
        setFormatTypes(extractedFormatTypes);
        setCalendriePhotos(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendriePhotos();
  }, [msg]);

  const filteredProducts = selectedFormatType
    ? calendriePhotos.filter((product) =>
        product.formats.some((format) => format.type === selectedFormatType)
      )
    : calendriePhotos;

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  const handleProductClick = (productId,numPhoto) => {
    localStorage.setItem('produits', productId); // Save the product ID in local storage
    localStorage.setItem('numbres', numPhoto); // Save the product ID in local storage
    localStorage.setItem('type',"calendriePhoto")
  };

  return (
    <div className="py-12 px-4 md:px-12 lg:px-20 bg-gray-50">
      <Slides setimage={currentImage} />

      <div className="flex flex-col lg:flex-row mt-2">
        {/* Format Filter Buttons */}
        <div className="lg:w-1/4 mb-8 lg:mb-0 lg:mr-8 text-sm">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <p className="font-bold mb-4">Filter by Format Type:</p>
            <div className="flex lg:flex-col gap-2 lg:gap-4">
              <button
                onClick={() => setSelectedFormatType('')}
                className={`px-4 py-2 text-sm rounded-md font-semibold transition ${
                  selectedFormatType === '' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                All Formats
              </button>
              {formatTypes.map((formatType) => (
                <button
                  key={formatType}
                  onClick={() => setSelectedFormatType(formatType)}
                  className={`px-4 py-2 text-sm rounded-md font-semibold transition ${
                    selectedFormatType === formatType ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {formatType}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 flex-1">
          {filteredProducts.map((product) => {
            const { price, priceAfterDiscount, promotions, imageCover, name } = product;
            const hasPromotion = promotions !== null;

            return (
              <Link href={`/multiDetailes`} key={product._id} passHref>
                <div
                  onClick={() => handleProductClick(product._id,product.numberOfPhotos)} // Call the function to save the product ID
                  className={`relative flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${
                    hasPromotion ? 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100' : 'border border-gray-200'
                  }`}
                >
                  <div className="relative md:h-32 w-full overflow-hidden rounded-lg mb-4">
                    <Image
                      src={imageCover}
                      alt={name}
                      layout="responsive"
                      width={500} // Set based on your image's aspect ratio
                      height={500} // Set based on your image's aspect ratio
                      className="rounded-lg transition-transform duration-300 transform hover:scale-105"
                    />
                    {hasPromotion && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        {promotions.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm md:text-xl mb-2 text-center">{name}</h3>
                  <div className="text-center">
                    {hasPromotion ? (
                      <>
                        <p className="text-sm text-gray-400 line-through">{price} Dt</p>
                        <p className="text-red-500 text-xl font-semibold">{priceAfterDiscount} Dt</p>
                      </>
                    ) : (
                      <p className="text-gray-800 font-medium text-lg">{price} Dt</p>
                    )}
                  </div>
                  {hasPromotion && (
                    <div className="mt-4 text-center">
                      <p className="text-green-500 text-sm font-medium">Promotion: {promotions.name}</p>
                      <p className="text-gray-500 text-xs">Valid until {new Date(promotions.endDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}