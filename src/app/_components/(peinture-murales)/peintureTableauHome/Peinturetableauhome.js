"use client"
import React from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname hook
import img from '../../../../../public/assets/image/peinture murales.webp';
import img2 from '../../../../../public/assets/image/peintureavecCadre.webp';
import { AiOutlineLike } from "react-icons/ai";
import { BiPaint } from "react-icons/bi";
import { IoStarOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import DisplayFormProducts from '../displayFormProducts/displayFormProducts';
import Slides from '../../slides/Slides';

export default function Peinturetableauhome() {
  const pathname = usePathname(); // Get the current pathname

  // Conditionally set the image based on the current path
  const currentImage = pathname === '/peinture-murales' ? img : img2;

  return (
    <div>
      <div>
        {/* Use the selected image in Slides */}
        <Slides setimage={currentImage} />
        <section className="flex flex-col md:flex-row md:container md:mx-auto">
          <div className="flex flex-col mx-3 pt-6 md:space-x-6 space-y-2 md:flex-row md:space-y-0">
            <div className="flex flex-col mx-3 pt-6 md:space-x-6 space-y-2 md:flex-row md:space-y-0">
              <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
                <IoStarOutline className="text-xl md:text-3xl text-red-600 icon-animation"  />
                <p className="text-sm md:text-lg font-bold">Haute qualité à des prix abordables</p>
                <p className="text-sm md:text-lg text-center">Des produits de qualité qui s'intègrent parfaitement dans n'importe quelle pièce - avec satisfaction garantie !</p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
                <BiPaint className="text-xl md:text-3xl text-blue-600 icon-animation" />
                <p className="text-sm md:text-lg font-bold">Facile à concevoir</p>
                <p className="text-sm md:text-lg text-center">Téléchargez vos photos préférées et créez une œuvre d'art unique en quelques clics.</p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
                <AiOutlineLike className="text-xl md:text-3xl text-blue-300 icon-animation" />
                <p className="text-sm md:text-lg font-bold">Un grand choix pour tous les goûts</p>
                <p className="text-sm md:text-lg text-center">Du moderne au classique et tout le reste, notre décoration murale personnalisable s'adaptera à votre style.</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <p className="mx-auto text-xl text-center mt-3 font-bold">Choisissez votre fresque murale</p>
          <DisplayFormProducts />
        </section>
      </div>
    </div>
  );
}