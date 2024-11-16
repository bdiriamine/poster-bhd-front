"use client";
import React, { useEffect, useState } from 'react';
import { TbArrowAutofitWidth, TbCategory, TbAdjustmentsFilled, TbTruckDelivery } from "react-icons/tb";
import { MdFormatShapes } from "react-icons/md";
import { FaCommentDollar } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import Contenusidemenu from '../(adminSideMenu)/contenusidemenu/Contenusidemenu';

export default function Navsideadmin() {
    const [msg, setMsg] = useState(() => {
        // Set the initial state to the value stored in localStorage if available
        return localStorage.getItem('msg') || ''; 
    });
    const [activeButton, setActiveButton] = useState(''); // New state for active button

    useEffect(() => {
        console.log(msg);
        // Store the current 'msg' in localStorage whenever it changes
        if (msg) {
            localStorage.setItem('msg', msg);
        }
    }, [msg]);

    const handleButtonClick = (name) => {
        setMsg(name);
        setActiveButton(name); // Set the active button
    };

    return (
        <div className='container mx-auto flex flex-col'>
            <div className="flex overflow-x-auto whitespace-nowrap bg-gray-800 py-2">
                {/* Navigation Buttons */}
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Taille' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Taille')}>
                    <TbArrowAutofitWidth className='text-white text-lg' />
                    <span className="ml-1">Gérer Taille Format</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Format' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Format')}>
                    <MdFormatShapes className='text-white text-lg' />
                    <span className="ml-1">Gérer Format</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Categorie' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Categorie')}>
                    <TbCategory className='text-white text-lg' />
                    <span className="ml-1">Gérer Categorie</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Sous-Categories' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Sous-Categories')}>
                    <TbAdjustmentsFilled className='text-white text-lg' />
                    <span className="ml-1">Sous-Catégories</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Produit' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Produit')}>
                    <span className="ml-1">Peinture & Tableaux murales</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Livre' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Livre')}>
                    <span className="ml-1">Livre</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Calendrier' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Calendrier')}>
                    <span className="ml-1">Calendrier</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Cadeaux' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Cadeaux')}>
                    <span className="ml-1">Cadeaux</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Carte' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Carte')}>
                    <span className="ml-1">Carte</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Promotion' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Promotion')}>
                    <FaCommentDollar className='text-white text-lg' />
                    <span className="ml-1">Promotion</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'TiragePhoto' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('TiragePhoto')}>
                    <FaCommentDollar className='text-white text-lg' />
                    <span className="ml-1">Tirage Photo</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Commande' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Commande')}>
                    <IoBagAddOutline className='text-white text-lg' />
                    <span className="ml-1">Commande</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Livraison' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Livraison')}>
                    <TbTruckDelivery className='text-white text-lg' />
                    <span className="ml-1">Livraison</span>
                </button>
                <button className={`flex items-center p-1.5 text-sm text-white ${activeButton === 'Utilisateurs' ? 'bg-orange-600' : 'hover:bg-gray-700'} mx-1 transition duration-200 ease-in-out`} onClick={() => handleButtonClick('Utilisateurs')}>
                    <span className="ml-1">Utilisateurs</span>
                </button>
            </div>
            <div className="p-2 w-full bg-gray-50 shadow-inner mt-2">
                <Contenusidemenu msg={msg} />
            </div>
        </div>
    );
}