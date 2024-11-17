"use client";
import React, { useEffect, useState } from 'react';
import Slides from '../../slides/Slides';
import { IoStarOutline } from 'react-icons/io5';
import { BiPaint } from 'react-icons/bi';
import { AiOutlineLike } from 'react-icons/ai';
import currentImage from '../../../../../public/assets/image/type-selection-DE.webp';
import Link from 'next/link';
import Image from 'next/image';

export default function CalendrierphotoHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category=Calendrier photos`);
        const data = await response.json();

        if (Array.isArray(data.data)) {
          // Filtrer les produits en fonction des valeurs de `sousCategories`
          const filteredProducts = data.data.filter(product =>
            ["Calendrier de bureau", "Calendrier mural", "Planificateur familial"].includes(product.name)
          );
          setProducts(filteredProducts);
        } else {
          console.error('Format de données inattendu:', data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Slides setimage={currentImage} />

      <section className="flex flex-col md:flex-row md:container md:mx-auto">
        <div className="flex flex-col mx-3 pt-6 md:space-x-6 space-y-2 md:flex-row md:space-y-0">
          <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
            <IoStarOutline className="text-xl md:text-3xl text-red-600 icon-animation" />
            <p className="text-sm md:text-lg font-bold">Papier et impression de qualité supérieure</p>
            <p className="text-sm md:text-lg text-center">Imprimé sur du papier mat, extra mat ou brillant de haute qualité - satisfaction garantie.</p>
          </div>
          <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
            <BiPaint className="text-xl md:text-3xl text-blue-600 icon-animation" />
            <p className="text-sm md:text-lg font-bold">Achetez plus et économisez plus</p>
            <p className="text-sm md:text-lg text-center">Partagez vos moments et économisez grâce à nos remises sur volume en achetant plusieurs exemplaires de votre calendrier à la fois.</p>
          </div>
          <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
            <AiOutlineLike className="text-xl md:text-3xl text-blue-300 icon-animation" />
            <p className="text-sm md:text-lg font-bold">Calendriers créatifs et personnels</p>
            <p className="text-sm md:text-lg text-center">Découvrez nos magnifiques designs et nos mises en page intelligentes et pratiques et ajoutez tous vos événements personnels.</p>
          </div>
        </div>
      </section>

      <section>
        <p className="mx-auto text-xl text-center mt-3 font-bold">Choisissez votre variante de calendrier</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10 lg:px-16 mt-6 max-w-screen-xl mx-auto">
        {products.map((product) => {
          const { price, discountedPrice, promotion, imageCover, name } = product;
          const hasPromotion = promotion !== null;

          return (
            <Link href={`/calendrier-photos/${product.sousCategories.name}`} key={product._id}>
              <div
                className={`relative flex flex-col bg-white p-4 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl ${
                  hasPromotion
                    ? 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100'
                    : 'border border-gray-200'
                }`}
              >
                <div className="relative h-64 w-full overflow-hidden rounded-xl mb-4">
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
                <h3 className="font-bold text-lg text-gray-800 mb-2">{name}</h3>
                <div className="text-center">
                  {hasPromotion ? (
                    <>
                      <p className="text-gray-400 line-through text-sm">{price} Dt</p>
                      <p className="text-red-600 text-xl font-semibold">{discountedPrice} Dt</p>
                    </>
                  ) : (
                    <p className="text-gray-800 font-medium text-lg">{price} Dt</p>
                  )}
                </div>
                {hasPromotion && (
                  <div className="mt-4 text-center">
                    <p className="text-green-600 text-sm font-medium">
                      Promotion: {promotion.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Valide jusqu'au {new Date(promotion.endDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
