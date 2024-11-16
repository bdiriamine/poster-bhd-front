"use client"
import React, { useEffect, useState } from 'react';
import Slides from '../../slides/Slides';
import { IoStarOutline } from 'react-icons/io5';
import { BiPaint } from 'react-icons/bi';
import { AiOutlineLike } from 'react-icons/ai';
import Image from 'next/image';
import currentImage from '../../../../../public/assets/image/pp_main_banner.webp';
import Link from 'next/link';

export default function Tiragehome() {
  const [tirages, setTirages] = useState([]);

  useEffect(() => {
    // Fetch the tirages data from the API
    const fetchTirages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tirage`);
        const data = await response.json();
        setTirages(data.data); // Assuming 'data' is the array of tirages
      } catch (error) {
        console.error('Error fetching tirages:', error);
      }
    };

    fetchTirages();
  }, []);

  return (
    <div>
      <Slides setimage={currentImage} />
      
      {/* Section 1 */}
      <section className="flex flex-col md:flex-row md:container md:mx-auto">
        <div className="flex flex-col mx-3 pt-6 md:space-x-6 space-y-2 md:flex-row md:space-y-0">
          <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50 justify-center items-center">
            <IoStarOutline className="text-xl md:text-3xl text-red-600 icon-animation" />
            <p className="text-sm md:text-lg font-bold">Papier et impression de qualité supérieure</p>
            <p className="text-sm md:text-lg text-center">Nous couvrons toutes les options. Choisissez entre mat et brillant pour une finition parfaite – satisfaction garantie.</p>
          </div>
          <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50 justify-center items-center">
            <BiPaint className="text-xl md:text-3xl text-blue-600 icon-animation" />
            <p className="text-sm md:text-lg font-bold">Facile à concevoir, même en déplacement</p>
            <p className="text-sm md:text-lg text-center">Que vous soyez à la maison ou en déplacement, il est facile de créer vos tirages photo avec notre logiciel de bureau, en ligne ou pour smartphone.</p>
          </div>
          <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50 justify-center items-center">
            <AiOutlineLike className="text-xl md:text-3xl text-blue-300 icon-animation" />
            <p className="text-sm md:text-lg font-bold">Parfait comme cadeau</p>
            <p className="text-sm md:text-lg text-center">Nos tirages photo sont livrés dans un joli emballage – parfaits comme cadeau pour vos amis, votre famille ou vous-même.</p>
          </div>
        </div>
      </section>

      {/* Section 2 - Displaying Tirages */}
      <p className="text-center font-bold text-2xl my-4">Nos tirages photos</p>
      <section className="container mx-auto my-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
      
  {tirages.map((tirage) => (
    <Link href={`/tirages-photo/${tirage.name}`} key={tirage._id} className="transform transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl">
        <Image
          src={tirage.imageCover}
          alt={tirage.name}
          width={250}
          height={250}
          className="object-cover rounded-lg w-full h-64"
        />
        <div className="mt-6 flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold text-gray-800">{tirage.name}</h3>
          <p className="text-gray-600 mt-2 text-sm">{tirage.description}</p>
          <p className="text-blue-600 font-bold mt-3 text-lg">${tirage.price}</p>
        </div>
        {tirage.formats && (
          <div className="mt-4 w-full flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            {tirage.formats.map((format) =>
              format.tailles.map((taille) => (
                <span key={taille._id} className="px-2 py-1 rounded-full bg-gray-100 border border-gray-300">
                  {taille.width} x {taille.height} {taille.unit}
                </span>
              ))
            )}
          </div>
        )}
      </div>
    </Link>
  ))}
</section>
    </div>
  );
}