"use client"
import React, { useEffect, useState } from 'react'
import styles from  "./navweb.module.css"
import Link from 'next/link';
import { IoLockClosedOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdWork } from "react-icons/md";
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
    if (e.target.closest(`.${styles.navbar}`)) return;
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
       <nav className={styles.navbar}>
            <div >
                <ul className={styles.btn}>
                    <li><Link href={"/clientprive"} > <button className={styles.logo}>Clientèle privée <IoLockClosedOutline  className={styles.mgl}/> </button> </Link></li>
                    <li><Link href={"/serviceclient"} > <button className={styles.logo}>Service Client <BsInfoCircle className={styles.mgl} /> </button></Link></li>
                </ul>
            </div>
            <div className="relative inline-block text-left">
            <button
              onClick={() => handleButtonClick('menu1')}
              className=" text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 p-3 border-none	"
            >
              Mon Compte
            </button>
      
            {openMenu === 'menu1' && !user && (

              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul>
                    <li className={styles.navlink}><Link  href={"/login"}  >Mon Compte      </Link> <FaRegUserCircle /> </li>
                    <li className={styles.navlink}><Link  href={"/login"}> Statu de command  </Link> <TbTruckDelivery /> </li>
                    <li className={styles.navlink}><Link  href={"/login"}>Mes Projet sauvgarder   </Link>  <MdWork /> </li>
                </ul>   
              </div>
            )}
                        {openMenu === 'menu1' && user && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <ul>
                                <li className={styles.navlink}><Link  href={"/profile"}  >Mon Compte      </Link> <FaRegUserCircle /> </li>
                                <li className={styles.navlink}><Link  href={"/profile"}> Statu de command  </Link> <TbTruckDelivery /> </li>
                                <li className={styles.navlink}><Link  href={"/profile"}>Mes Projet sauvgarder   </Link>  <MdWork /> </li>
                            </ul>   
                          </div>
                          )}        
          </div>
            <div className={styles.right}>
                {user ? (
              <ul className={styles.btn}> 
                <li>
                  <button onClick={logout} className={styles.logo}> Déconnexion</button>
                </li>
              </ul>
            ) : (
              <ul className={styles.btn}>
              <li> <Link  href="/register"> <button className={styles.logo}> inscrivez-vous <CiCirclePlus className={styles.mgl} /> </button></Link></li>
              <li> <Link  href="/login"><button className={styles.logo}> connectez-vous <SiSimplelogin  className={styles.mgl}/> </button> </Link></li>
           </ul>
            )}
             {/* <ul className={styles.btn}>
                <li> <Link  href={"/register"}> <button className={styles.logo}> inscrivez-vous <CiCirclePlus className={styles.mgl} /> </button></Link></li>
                <li>  <Link  href={"/login"}><button className={styles.logo}> connectez-vous <SiSimplelogin  className={styles.mgl}/> </button> </Link></li>
             </ul> */}
            </div>
        </nav> 
    </header>
  )
}
