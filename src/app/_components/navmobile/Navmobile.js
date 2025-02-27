"use client"
import React, { useState } from 'react';
import img from "../../../../public/assets/image/test1.png";
import Image from 'next/image';
import { useAuth } from '@/app/_utils/AuthProvider';
import Link from 'next/link';

export default function Navmobile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-[100%]">
      <div className="flex flex-row space-y-1">
        <div className="w-1/2">
          <button
            onClick={toggleMenu}
            className="flex items-center p-3 text-white rounded-md focus:outline-none focus:ring-2 shadow-lg  md:hidden"
          >
            Menu
          </button>
        </div>
        <div className="w-1/2 ">
          <Link href="/">
            <Image src={img} width={100} height={100} alt='logo' className="float-right mr-3" />
          </Link>
        </div>
      </div>

      <div className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>

      <div className={`fixed top-13 right-0 w-[80%] bg-cyan-700 border border-gray-200 h-full transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-lg font-semibold">
            <Image src={img} width={100} height={100} alt='logo' className="float-right mr-3" />
          </span>
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4">
          <ul className="text-white">

            <li className="mb-4" onClick={toggleMenu}>
              <Link href="/peinture-murales" className="hover:text-blue-500">
                Peinture Mural
              </Link>
            </li>
            <li className="mb-4" onClick={toggleMenu}>
              <Link href="/tableaux-muraux-avec-cadres" className="hover:text-blue-500">
                Tableaux muraux avec cadres
              </Link>
            </li>
            <li className="mb-4" onClick={toggleMenu}>
              <Link href="/creer-un-livre-photo" className="hover:text-blue-500">
                Créer Livre
              </Link>
            </li>
            <li className="mb-4" onClick={toggleMenu}>
              <Link href="/calendrier-photos" className="hover:text-blue-500">
                Calendrier photo
              </Link>
            </li>
            <li className="mb-4" onClick={toggleMenu}>
              <Link href="/tirages-photo" className="hover:text-blue-500">
                Tirages Photo
              </Link>
            </li>
            <li className="mb-4" onClick={toggleMenu}>
              <Link href="/cadeaux-photos" className="hover:text-blue-500">
                Cadeaux Photo
              </Link>
            </li>
            {user?.role === "admin" && (
              <ul>
                <li><Link href="/admin"> Service Admin</Link></li>
              </ul>
            )}
          </ul>
        </nav>
        {!user ? (
          <div className="p-4">
            <Link href="/register">
              <button onClick={toggleMenu} className="relative w-full text-white py-2 rounded-lg transition-all transform hover:scale-105 mb-2 overflow-hidden animated-border">
                <span className="relative z-10">S'inscrire</span>
              </button>
            </Link>
            <Link href="/login">
              <button onClick={toggleMenu} className="relative w-full text-white py-2 rounded-lg transition-all transform hover:scale-105 mb-2 overflow-hidden animated-border">
                <span className="relative z-10">Se connecter</span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="p-4">
            <Link href="/profile">
              <button onClick={toggleMenu} className="relative w-full text-white py-2 rounded-lg transition-all transform hover:scale-105 mb-2 overflow-hidden animated-border">
                <span className="relative z-10">Profil</span>
              </button>
            </Link>
            <Link href="/panier">
                  <button onClick={toggleMenu} className="relative w-full text-white py-2 rounded-lg transition-all transform hover:scale-105 mb-2 overflow-hidden animated-border">
                  <span className="relative z-10">Panier</span> 
                  </button>
                </Link>
            <button onClick={logout} className="relative w-full text-white py-2 rounded-lg transition-all transform hover:scale-105 mb-2 overflow-hidden animated-border">
              <span className="relative z-10">Déconnexion</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
