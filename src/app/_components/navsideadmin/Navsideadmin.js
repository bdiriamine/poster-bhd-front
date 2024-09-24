"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from '../../_utils/AuthProvider';
import { TbArrowAutofitWidth } from "react-icons/tb";
import { TbCategory } from "react-icons/tb";
import { MdFormatShapes } from "react-icons/md";
import { TbAdjustmentsFilled } from "react-icons/tb";
import { FaCommentDollar } from "react-icons/fa";
import { IoBagAddOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import Contenusidemenu from '../(adminSideMenu)/contenusidemenu/Contenusidemenu';

export default function Navsideadmin() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [msg,setMsg] = useState();
    const { user, } = useAuth();
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div className='container mx-auto'>
      <button  onClick={toggleSidebar} data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">

      </button>
    <div className=" flex flex-row mt-8">
    <aside    className="px-5  w-full mt-3 transition-transform -translate-x-full sm:translate-x-0 md:w-1/3 " >
    <div className=" h-full py-4  bg-gray-50 dark:bg-gray-800 rounded-md md:ml-4">
        <ul className="space-y-2 font-medium ">
            <li className='  flex flex-col justify-center items-center p-3'>
              <p><FaRegCircleUser className='text-7xl	text-white mb-2'/></p> 
              <p className='text-white'> {user.name} </p>
              <p className='text-white'> {user.role} </p>
            </li>
            <li>
                <button className="flex  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  w-full" onClick={(()=>{setMsg('Taille')})}>
                <TbArrowAutofitWidth className='text-white text-2xl' />
                <span className="ms-3 whitespace-nowrap">Gerer Taille Format</span>
                </button>
            </li>
            <li>
                <button  className="flex  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  w-full" onClick={(()=>{setMsg('Format')})}>
        <MdFormatShapes className='text-white text-2xl'/>
                <span className=" ms-3 whitespace-nowrap">Gerer Format</span>
               
                </button>
            </li>
            <li>
                <button  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  w-full" onClick={(()=>{setMsg('Categorie')})}>
        <TbCategory  className='text-white text-2xl' />
                <span className=" ms-3 whitespace-nowrap">Gerer Categorie</span>
              
                </button>
            </li>
            <li>
                <button  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full" onClick={(()=>{setMsg('Sous-Categories')})}>
                <TbAdjustmentsFilled className='text-white text-2xl' />
                <span className=" ms-3 whitespace-nowrap">Sous-Ctegories</span>
                </button>
            </li>
            <li>
                <button  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full" onClick={(()=>{setMsg('Produit')})}>

                <span className=" ms-3 whitespace-nowrap">Produits</span>
                </button>
            </li>
            <li>
                <button  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full" onClick={(()=>{setMsg('Promotion')})}>
                <FaCommentDollar className='text-white text-2xl' />
                <span className=" ms-3 whitespace-nowrap">Promotion</span>
                </button>
            </li>
            <li>
                <button  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full" onClick={(()=>{setMsg('Comande')})}>
                    <IoBagAddOutline className='text-white text-2xl'  />
                <span className=" ms-3 whitespace-nowrap">Commande</span>
                </button>
            </li>
            <li>
                <button  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full" onClick={(()=>{setMsg('Livraison')})}>
                 <TbTruckDelivery  className='text-white text-2xl'/>
                <span className=" ms-3 whitespace-nowrap">Livraison</span>
                </button>
            </li>
            <li>
                <button  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full" onClick={(()=>{setMsg('Utilisateurs')})}>

                <span className=" ms-3 whitespace-nowrap">Utilisateurs</span>
                </button>
            </li>

            <li>
                <button  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full">

                <span className="ms-3 whitespace-nowrap">Deconnection</span>
                </button>
            </li>
        </ul>

    </div>
    </aside>

    <div className="p-4  w-full md:w-full">
            <Contenusidemenu msg={msg} />
    </div>
    </div>

    </div>
  )
}
