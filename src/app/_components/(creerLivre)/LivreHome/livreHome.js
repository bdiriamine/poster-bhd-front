import React from 'react'
import Slides from '../../slides/Slides'
import { IoStarOutline } from 'react-icons/io5'
import { BiPaint } from 'react-icons/bi'
import { AiOutlineLike } from 'react-icons/ai'
import currentImage from '../../../../../public/assets/image/creerLivre.webp'
import LivreProduct from '../LivreProduct/LivreProduct'
export default function LivreHome() {
  return (
    <div>
              <Slides setimage={currentImage} />
        <section className="flex flex-col md:flex-row md:container md:mx-auto">
          <div className="flex flex-col mx-3 pt-6 md:space-x-6 space-y-2 md:flex-row md:space-y-0">
            <div className="flex flex-col mx-3 pt-6 md:space-x-6 space-y-2 md:flex-row md:space-y-0">
              <div className="w-full md:w-1/3 flex flex-col p-6 space-y-3 rounded-lg border border-slate-300 bg-gray-50-100 justify-center items-center">
                <IoStarOutline className="text-xl md:text-3xl text-red-600 icon-animation" />
                <p className="text-sm md:text-lg font-bold">Papier et impression de qualité supérieure                </p>
                <p className="text-sm md:text-lg text-center">De l'impression au papier et aux couvertures, nos livres photo sont réalisés avec le plus grand soin et la plus haute qualité - satisfaction garantie.</p>
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
        <LivreProduct />
        </section>
    </div>
  )
}
