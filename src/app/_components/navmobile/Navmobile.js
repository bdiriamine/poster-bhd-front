"use client"
import React, { useState } from 'react'
import img from"../../../../public/assets/image/post.svg"
import Image from 'next/image';
import { useAuth } from '@/app/_utils/AuthProvider';
import Link from 'next/link';
export default function Navmobile() {
   
    const [isOpen, setIsOpen] = useState(false);
    // const [tokenjws, setTokenjws] = useState();
    // setTokenjws(JSON.parse(localStorage.getItem('token')) )
    const { user, logout,loading } = useAuth();
    const toggleMenu = () => {
      setIsOpen(!isOpen);
      // setTokenjws(JSON.parse(localStorage.getItem('token')))
    };


  return (

        <div className="w-[100%]">
            <div className="flex flex-row space-y-1 "> 
                <div className="w-1/2">
                <button
          onClick={toggleMenu}
          className="flex items-center p-3 text-white bg-orange-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 shadow-lg shadow-red-300  md:hidden"
        >
                  Menu
        </button>
                </div>
                <div className="w-1/2 ">
                <Link href="/">
                    <Image src={img}  width={100} height={100} alt='logo' className="float-right mr-3"/>
                </Link>

                </div>
            </div>
        <div className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>
  
        <div className={`fixed top-0 right-0 w-64 bg-teal-700 border border-gray-200 h-full transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg font-semibold">  <Image src={img}  width={100} height={100} alt='logo' className="float-right mr-3"/></span>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="p-4 ">
            <ul className="text-white">


              <li className="mb-4">
                <Link href="/peinture-mural" className=" hover:text-teal-500" >
                      Peinture Mural
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/creer-livre " className=" hover:text-teal-500" >
                       Creer Livre
                </Link>
              </li>
              <li className="mb-4">
              <Link href="/calendrie-photo" className=" hover:text-teal-500" >
                     Calendrie photo
                </Link>
              </li>
              <li className="mb-4">
              <Link href="/carte-photo" className=" hover:text-teal-500" >
                   Carte Photo
              </Link>

              </li>
              <li className="mb-4">
              <Link href="/cadeaux-photo" className=" hover:text-teal-500" >
                    Cadeaux Photo
                </Link>
                
              </li>
              { user?.role==="admin" && (
              <ul> 
   <li><Link  href="/admin"> admin service</Link></li>
              <li><button onClick={logout} className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-all transform hover:scale-105"> Déconnexion</button></li>

              </ul>
                         )}   
            </ul>
          </nav>
          {!user&&(                      <div className="p-4">
                      <Link href="/register">
                          <button className="w-full bg-teal-600 text-white py-2 rounded-lg border-2 border-teal-600 hover:bg-teal-700 transition-all transform hover:scale-105 mb-2 hover:border-teal-700">
                                      Register
                          </button>
                      </Link>
                      <Link href="/login">
                      
                      <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-all transform hover:scale-105">
                                  Login
                      </button>
          
                      </Link>
          
                          </div>)

          }

        </div>
      </div>

  )
}
