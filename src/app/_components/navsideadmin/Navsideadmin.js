"use client";
import React, { useState } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from '../../_utils/AuthProvider';
import { TbArrowAutofitWidth, TbCategory, TbAdjustmentsFilled, TbTruckDelivery } from "react-icons/tb";
import { MdFormatShapes } from "react-icons/md";
import { FaCommentDollar } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import Contenusidemenu from '../(adminSideMenu)/contenusidemenu/Contenusidemenu';

export default function Navsideadmin() {
    const [msg, setMsg] = useState();
    const { user } = useAuth();

    return (
        <div className='container mx-auto flex flex-col'>
            <div className="flex overflow-x-auto whitespace-nowrap bg-slate-900 py-2">
                <button className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 mx-2 text-xs" onClick={() => setMsg('Taille')}>
                    <TbArrowAutofitWidth className='text-white text-xl' />
                    <span className="ms-2 whitespace-nowrap">Gerer Taille Format</span>
                </button>
                <button className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 mx-2 text-xs" onClick={() => setMsg('Format')}>
                    <MdFormatShapes className='text-white text-xl' />
                    <span className="ms-2 whitespace-nowrap">Gerer Format</span>
                </button>
                <button className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 mx-2 text-xs" onClick={() => setMsg('Categorie')}>
                    <TbCategory className='text-white text-xl' />
                    <span className="ms-2 whitespace-nowrap">Gerer Categorie</span>
                </button>
                <button className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 mx-2 text-xs" onClick={() => setMsg('Sous-Categories')}>
                    <TbAdjustmentsFilled className='text-white text-xl' />
                    <span className="ms-2 whitespace-nowrap">Sous-Catégories</span>
                </button>
                <button className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 mx-2 text-xs" onClick={() => setMsg('Produit')}>
                    <span className="ms-2 whitespace-nowrap">Produits</span>
                </button>
                <button className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 mx-2 text-xs" onClick={() => setMsg('Promotion')}>
                    <FaCommentDollar className='text-white text-xl' />
                    <span className="ms-2 whitespace-nowrap">Promotion</span>
                </button>
                <button className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 mx-2 text-xs" onClick={() => setMsg('Commande')}>
                    <IoBagAddOutline className='text-white text-xl' />
                    <span className="ms-2 whitespace-nowrap">Commande</span>
                </button>
                <button className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 mx-2 text-xs" onClick={() => setMsg('Livraison')}>
                    <TbTruckDelivery className='text-white text-xl' />
                    <span className="ms-2 whitespace-nowrap">Livraison</span>
                </button>
                <button className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 mx-2 text-xs" onClick={() => setMsg('Utilisateurs')}>
                    <span className="ms-2 whitespace-nowrap">Utilisateurs</span>
                </button>
                <button className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 mx-2 text-xs">
                    <span className="ms-2 whitespace-nowrap">Deconnection</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="p-4 w-full">
                <Contenusidemenu msg={msg} />
            </div>
        </div>
    );
}