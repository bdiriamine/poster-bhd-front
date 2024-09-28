import React from 'react'
import img1 from '../../../../public/assets/image/mc.svg'
import img2 from '../../../../public/assets/image/paypal.svg'
import img3 from '../../../../public/assets/image/visa.svg'
import img4 from '../../../../public/assets/image/mhd.png'
import img5 from '../../../../public/assets/image/bhd.jpg'
import Image from 'next/image'
import { FaFacebook } from "react-icons/fa6";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialYoutube } from "react-icons/ti";

export default function Footer() {
  return (
    <>
    <div className="mt-16 hidden  md:grid   md:grid-cols-4 lg:grid-cols-4 gap-4  md:container  md:mx-auto ">
            <div className="flex  flex-col gap-y-2 px-3 bg-gray-100  w-[100%] ">
                   <p className="font-light text-lg border-b-4 border-indigo-500 h-10  text-center py-1 "> Produit</p>
                   <p>Créer un livre photo</p>
                   <p>Livres photos thématiques</p>
                   <p>Exemples de livres photo</p>
                   <p>Peintures murales</p>
                   <p>Tirages photo</p>
                   <p>Cartes photos</p>
                   <p>Calendrier photos</p>
                   <p>Imprimer des tasses</p>
                   <p>Tous les produits photo</p>
            </div>
            <div className="flex  flex-col gap-y-2 px-3 bg-gray-100   w-[100%] ">
                   <p className="font-light text-lg border-b-4 border-indigo-500 h-10  text-center py-1 "> Favoris</p>
                   <p>Imprimer des affiches</p>
                   <p>Photo sur toile</p>
                   <p>Panneau de mousse dure Photoboard</p>
                   <p>Photo sur aluminium</p>
                   <p>Photo en verre acrylique</p>
                   <p>Cartes de remerciement</p>
                   <p>Cartes d'invitation</p>
                   <p>Cartes de mariage</p>
                   <p>Cartes de Noël</p>
                   <p>Cartes du Nouvel An</p>
            </div>
            <div className="flex  flex-col gap-y-2 px-3 bg-gray-100  ">
                   <p className="font-light text-lg border-b-4 border-indigo-500 h-10 w-[100%] text-center py-1 "> Aide</p>
                   <p>Délais de livraison</p>
                   <p>Statut de la commande</p>
                   <p>contact</p>
                   <p>Aperçu des prix</p>
            </div>
            <div className="flex  flex-col gap-y-2 px-3 bg-gray-100   ">
                   <p className="font-lighttext-lg border-b-4 border-indigo-500 h-10 w-[100%] text-center py-1"> À propos de nous</p>
                   <p>La société</p>
                   <p>durabilité</p>
                   <p>Devenez partenaire</p>
                   <p>Clients professionnels</p>
                   <p>Blogue</p>

            </div>
    </div>
        <div className="mt-16 hidden  md:grid   md:grid-cols-3 lg:grid-cols-3 gap-4  md:container  md:mx-auto ">
        <div className=" bg-gray-100 w-[100%] justify-center ">
               <p className="font-lighttext-lg border-b-4 border-indigo-500 h-10 w-[100%] text-center py-1 "> Options de paiement</p>
            <div className="flex flex-row mt-2 space-x-4 px-2">
                <Image src={img1} width={0} alt='master'
  height={0}
  sizes="10vw"
  style={{ width: '20%', height: 'auto' }}/>
                  <Image src={img2} width={0}   alt='paypal'
  height={0}
  sizes="10vw"
  style={{ width: '20%', height: 'auto' }}/>
                  <Image src={img3} width={0}   alt='visa'
  height={0}
  sizes="10vw"
  style={{ width: '20%', height: 'auto' }}/>
            </div>
        </div>
        <div className=" bg-gray-100 w-[100%] justify-center ">
               <p className="font-lighttext-lg border-b-4 border-indigo-500 h-10 w-[100%] text-center py-1 "> durabilité</p>
            <div className="flex flex-row mt-2 space-x-4 px-2 ">
                <Image src={img4} width={0}   alt='mahdia highlits'
  height={0}
  sizes="10vw"
  style={{ width: '20%', height: 'auto' }}/>
                <Image src={img5} width={0}   alt='bhd'
  height={0}
  sizes="10vw"
  style={{ width: '20%', height: 'auto' }}/>

            </div>
        </div>
        <div className=" bg-gray-100 w-[100%] justify-center ">
               <p className="font-lighttext-lg border-b-4 border-indigo-500 h-10 w-[100%] text-center py-1"> Restez en contact avec nous</p>
            <div className="flex flex-row mt-2 space-x-4 px-2">
            <FaFacebook className='bg-gray-50 text-3xl text-cyan-900' />
            <SlSocialInstagram  className='bg-gray-50 text-3xl text-pink-500'/>
            <TiSocialYoutube className='bg-gray-50 text-4xl text-red-700' />
            </div>
        </div>

</div>
<div className=' bottom-0 flex flex-col md:flex-row  justify-evenly  bg-slate-100  items-center py-4	mt-2 '>
    <p>afficheXXL © 2024 </p>
    <div className='flex flex-col md:flex-row  justify-evenly space-x-4'>
    <p>politique de confidentialité</p>
<p>Déclaration relative aux cookies</p>
<p>Termes et conditions</p>

    </div>

</div>
</>
  )
}
