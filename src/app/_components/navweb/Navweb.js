"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsInfoCircle } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { CiCirclePlus } from "react-icons/ci";
import { SiSimplelogin } from "react-icons/si";
import { useAuth } from '@/app/_utils/AuthProvider';

export default function Navweb() {
  const [openMenu, setOpenMenu] = useState(null);
  const { user, logout } = useAuth();

  const handleButtonClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleClickOutside = (e) => {
    if (e.target.closest('.navbar')) return;
    setOpenMenu(null);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav className="navbar flex justify-end items-center gap-2 p-2  text-white">
        <div>
          <ul className="flex items-center">
            <li>
              <Link href="/chat">
                <button className="flex items-center border-l border-r border-gray-300 p-2 text-sm font-bold">
                  Service Client <BsInfoCircle className="ml-1" />
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="relative inline-block text-left">
        <div className="relative inline-block text-left">
  <button
    onClick={() => handleButtonClick('menu1')}
    className="text-white rounded-md p-2 text-sm font-bold focus:outline-none"
  >
    Mon Compte
  </button>

  {openMenu === 'menu1' && (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-black">
      <ul>
        {user ? (
          <>
            <li className="flex items-center p-2 text-sm hover:bg-gray-200">
              <Link href="/profile">Mon Compte</Link>
              <FaRegUserCircle className="ml-1" />
            </li>
            <li className="flex items-center p-2 text-sm hover:bg-gray-200">
              <Link href="/commande">Statut de la commande</Link>
              <TbTruckDelivery className="ml-1" />
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center p-2 text-sm hover:bg-gray-200">
              <Link href="/login">Mon Compte</Link>
              <FaRegUserCircle className="ml-1" />
            </li>
            <li className="flex items-center p-2 text-sm hover:bg-gray-200">
              <Link href="/login">Statut de la commande</Link>
              <TbTruckDelivery className="ml-1" />
            </li>
          </>
        )}
      </ul>
    </div>
  )}
</div>
        </div>
        <div className="flex items-center">
          {user ? (
            <ul className="flex items-center gap-2">
              {user.role === "admin" && (
                <li>
                  <Link href="/admin">
                    <button className="flex items-center border-l border-gray-300 p-2 text-sm font-bold">
                      Admin service
                    </button>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/panier">
                  <button className="flex items-center border-l border-gray-300 p-2 text-sm font-bold">
                    Panier
                  </button>
                </Link>
              </li>
              <li>
                <button onClick={logout} className="flex items-center border-l border-gray-300 p-2 text-sm font-bold">
                  Déconnexion
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center gap-2">
              <li>
                <Link href="/register">
                  <button className="flex items-center border-l border-gray-300 p-2 text-sm font-bold">
                    Inscrivez-vous <CiCirclePlus className="ml-1" />
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <button className="flex items-center border-l border-gray-300 p-2 text-sm font-bold">
                    Connectez-vous <SiSimplelogin className="ml-1" />
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}