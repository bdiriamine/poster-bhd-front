"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa6';
import { SlSocialInstagram } from 'react-icons/sl';
import { TiSocialYoutube } from 'react-icons/ti';
import img1 from '../../../../public/assets/image/mc.svg';
import img2 from '../../../../public/assets/image/paypal.svg';
import img3 from '../../../../public/assets/image/visa.svg';
import img4 from '../../../../public/assets/image/mhd.png';
import img5 from '../../../../public/assets/image/bhd.jpg';
import img6 from '../../../../public/assets/image/footer-bg.png';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footerElement = document.getElementById('footer');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set to true when the footer is in view
        }
      },
      { threshold: 0.1 }
    );
    if (footerElement) observer.observe(footerElement);

    // Clean up the observer on component unmount
    return () => {
      if (footerElement) observer.unobserve(footerElement);
    };
  }, []);

  return (
    <div
      className="mt-16 bg-cover bg-center py-8 relative h-[40vh] md:h-[95vh]"
      style={{ backgroundImage: `url(${img6.src})` }}
    >
      <div className={`container mx-auto max-w-7xl relative h-full transition-all duration-700 ease-in-out transform ${
            isVisible ? 'animate-slide-up' : 'opacity-0'  }`}>
        {/* Grid with four columns */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-4 gap-4 pt-48">
          <div className="flex flex-col gap-y-2 px-3 w-full">
            <p className="font-light text-lg border-b-4 border-indigo-500 h-10 text-center py-1">
              Produit
            </p>
            <Link href="/creer-un-livre-photo">Créer un livre photo</Link>
            <Link href="/peinture-murales">Peintures murales</Link>
            <Link href="/tirages-photo">Tirages photo</Link>
            <Link href="/calendrier-photos">Calendrier photos</Link>
            <Link href="/cadeaux-photos/Gobelet%20imprimé">Imprimer des tasses</Link>
          </div>
          <div className="flex flex-col gap-y-2 px-3 w-full">
            <p className="font-light text-lg border-b-4 border-indigo-500 h-10 text-center py-1">
              Favoris
            </p>
            <Link href="/peinture-murales/Imprimer%20des%20affiches">
              Imprimer des affiches
            </Link>
            <Link href="/tableaux-muraux-avec-cadres/Toile%20avec%20cadre">
              Photo sur toile
            </Link>
            <Link href="/peinture-murales/Photo%20sur%20aluminium">Photo sur aluminium</Link>
            <Link href="/peinture-murales/Photo%20en%20verre%20acrylique">
              Photo en verre acrylique
            </Link>
          </div>
          <div className="flex flex-col gap-y-2 px-3">
            <p className="font-light text-lg border-b-4 border-indigo-500 h-10 w-full text-center py-1">
              Aide
            </p>
            <Link href="/chat">Contact</Link>
            <p>Aperçu des prix</p>
          </div>
          <div className="flex flex-col gap-y-2 px-3">
            <p className="font-light text-lg border-b-4 border-indigo-500 h-10 w-full text-center py-1">
              À propos de nous
            </p>
            <p>La société</p>
            <p>Durabilité</p>
            <p>Devenez partenaire</p>
            <p>Clients professionnels</p>
            <p>Blogue</p>
          </div>
        </div>

        {/* Grid with three columns for payment options, sustainability, and social media */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-3 gap-4 mt-16">
          <div className="w-full justify-center">
            <p className="font-light text-lg border-b-4 border-indigo-500 h-10 w-full text-center py-1">
              Options de paiement
            </p>
            <div className="flex flex-row mt-2 space-x-4 px-2">
              <Image
                src={img1}
                alt="master"
                width={0}
                height={0}
                sizes="10vw"
                style={{ width: '20%', height: 'auto' }}
              />
              <Image
                src={img2}
                alt="paypal"
                width={0}
                height={0}
                sizes="10vw"
                style={{ width: '20%', height: 'auto' }}
              />
              <Image
                src={img3}
                alt="visa"
                width={0}
                height={0}
                sizes="10vw"
                style={{ width: '20%', height: 'auto' }}
              />
            </div>
          </div>
          <div className="w-full justify-center">
            <p className="font-light text-lg border-b-4 border-indigo-500 h-10 w-full text-center py-1">
              Durabilité
            </p>
            <div className="flex flex-row mt-2 space-x-4 px-2">
              <Image
                src={img4}
                alt="mahdia highlights"
                width={0}
                height={0}
                sizes="10vw"
                style={{ width: '20%', height: 'auto' }}
              />
              <Image
                src={img5}
                alt="bhd"
                width={0}
                height={0}
                sizes="10vw"
                style={{ width: '20%', height: 'auto' }}
              />
            </div>
          </div>
          <div className="w-full justify-center">
            <p className="font-light text-lg border-b-4 border-indigo-500 h-10 w-full text-center py-1">
              Restez en contact avec nous
            </p>
            <div className="flex flex-row mt-2 space-x-4 px-2">
              <FaFacebook className=" text-3xl text-cyan-900" />
              <SlSocialInstagram className=" text-3xl text-pink-500" />
              <TiSocialYoutube className=" text-4xl text-red-700" />
            </div>
          </div>
        </div>

        {/* Footer bottom section */}
        <div
          id="footer"
          className={`absolute bottom-0 w-full flex flex-col md:flex-row justify-evenly  items-center py-4 transition-all duration-700 ease-in-out transform ${
            isVisible ? 'animate-slide-up' : 'opacity-0'
          }`}
        >
          <p>Poster BHD © 2024</p>
          <div className="flex flex-col md:flex-row justify-evenly space-x-4">
            <p>Politique de confidentialité</p>
            <p>Déclaration relative aux cookies</p>
            <p>Termes et conditions</p>
          </div>
        </div>
      </div>
    </div>
  );
}