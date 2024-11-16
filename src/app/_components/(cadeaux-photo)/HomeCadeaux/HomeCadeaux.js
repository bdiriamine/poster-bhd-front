"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/_utils/AuthProvider';
import Slides from '../../slides/Slides';
import currentImage from '../../../../../public/assets/image/cadeaux.webp';
import { IoStarOutline } from 'react-icons/io5';
import { BiPaint } from 'react-icons/bi';
import { AiOutlineLike } from 'react-icons/ai';
import Link from 'next/link';
import Loader from '../../loader/loader';
const HomeCadeaux = () => {
  const [products, setProducts] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products in the "Cadeaux photos" category
        const productResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category=Cadeaux photos`);
        const productData = await productResponse.json();

        // Fetch category by name and populate sousCategories
        const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/name/Cadeaux photos`);
        const categoryData = await categoryResponse.json();

        // Set sousCategories based on category data
        if (categoryData?.data?.sousCategories) {
          setSousCategories(categoryData.data.sousCategories.map(sc => sc.name));
        }

        // Set products initially (will be filtered after sousCategories is set)
        setProducts(productData.data);
      } catch (err) {
        setError('Failed to load products or category data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Filter products after sousCategories are set
  const filteredProducts = products.filter(product =>
    product.name && sousCategories.includes(product.name)
  );

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
        <Slides setimage={currentImage} />
        <section className="flex flex-col md:flex-row md:container md:mx-auto">
        <div className="flex flex-col mx-3 pt-6 md:space-x-6 space-y-2 md:flex-row md:space-y-0">
          <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
            <IoStarOutline className="text-xl md:text-3xl text-red-600 icon-animation" />
            <p className="text-sm md:text-lg font-bold">Des cadeaux pour chaque occasion            </p>
            <p className="text-sm md:text-lg text-center">Anniversaires, mariages, anniversaires, remises de diplômes – célébrez chaque étape avec un cadeau personnalisé.</p>
          </div>
          <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
            <BiPaint className="text-xl md:text-3xl text-blue-600 icon-animation"  />
            <p className="text-sm md:text-lg font-bold">Qualité supérieure            </p>
            <p className="text-sm md:text-lg text-center">Nous utilisons des procédés d'impression durables et des matériaux de haute qualité afin que vous puissiez profiter longtemps de vos cadeaux.</p>
          </div>
          <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
            <AiOutlineLike className="text-xl md:text-3xl text-blue-300 icon-animation" />
            <p className="text-sm md:text-lg font-bold">Concevoir en quelques clics            </p>
            <p className="text-sm md:text-lg text-center">Quelques clics suffisent pour créer de magnifiques cadeaux personnalisés avec notre éditeur instantané.</p>
          </div>
        </div>
      </section>

      <section>
        <p className="mx-auto text-xl text-center mt-3 font-bold">Choisissez votre cadeau photo        </p>
      </section>
      <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
                    {filteredProducts.map((product) => {
                        const { price, discountedPrice, promotion, imageCover, name } = product;
                        const hasPromotion = promotion !== null;

                        return (
                            <Link href={`/cadeaux-photos/${name}`} key={product._id}>
                                <div 
                                    className={`relative flex flex-col bg-white p-4 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl ${
                                        hasPromotion ? 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100' : 'border border-gray-200'
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
    </div>

  );
};

export default HomeCadeaux;