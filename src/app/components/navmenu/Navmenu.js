"use client"
import React, { useEffect, useState } from 'react'
import  style  from "./navmenu.module.css";
import  img  from "../../../../public/assets/image/logoorange.svg";
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineCaretDown } from "react-icons/ai";

export default function Navmenu() {
  const [openMenu, setOpenMenu] = useState(null);
  const handleButtonClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
  const handleClickOutside = (e) => {
    if (e.target.closest(`.${style.nav}`)) return;
    setOpenMenu(null);
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);

    };
  }, []);

  return (
    <div className={style.nav}>
    <div className="hidden  md:flex md:flex-wrap justify-center items-center" >
      <div className="relative">
           <Image src={img}  alt='mahdia highlits'
  height={0}
  sizes="10vw"
  style={{ width: '80%', height: 'auto' }} />
      </div>
  
     
      <div className="relative inline-block text-left">
            <button
              className=" text-black rounded-md  focus:outline-none   p-3 border-none flex flex-wrap  justify-between items-center text-sm font-bold"
              aria-expanded={openMenu === 'menu1'}
              onClick={() => handleButtonClick('menu1')}
            >
             Peinture murales   <AiOutlineCaretDown />
            </button>
      
            {openMenu === 'menu1' && (

          <div className="absolute right-0 mt-2 w-[100%] bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="flex flex-col gap-y-2 px-3">
              <li ><Link  href={"/moncompte"}  >Imprimer des affiches </Link>  </li>
              <li ><Link  href={"/statucommand"}> Photo sur toile </Link> </li>
              <li ><Link  href={"/mesprojets"}>Tableaux photo  </Link>  </li>
              <li ><Link  href={"/mesprojets"}>Photo sur aluminium  </Link>  </li>
              <li ><Link  href={"/mesprojets"}>Photo en verre acrylique </Link>  </li>
              <li ><Link  href={"/mesprojets"}>Toutes les peintures murales </Link>  </li>
          </ul>   
          </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button
              className=" text-black rounded-md  focus:outline-none   p-3 border-none flex flex-wrap  justify-between items-center	text-sm font-bold"
              aria-expanded={openMenu === 'menu2'}
              onClick={() => handleButtonClick('menu2')}
            >
              Tableaux muraux avec cadres  <AiOutlineCaretDown />
            </button>
      
            {openMenu === 'menu2'&& (
              <div className="absolute right-0 mt-2 w-[100%] bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="flex flex-col gap-y-2 px-3">
                    <li ><Link  href={"/moncompte"}  >Affiche avec  cadre     </Link>  </li>
                    <li ><Link  href={"/statucommand"}> Toile avec cadre   </Link> </li>
                    <li ><Link  href={"/mesprojets"}>Tableau photo avec cadre  </Link>  </li>
                    <li ><Link  href={"/mesprojets"}>Aluminium avec cadre photo avec cadre  </Link>  </li>
                    <li ><Link  href={"/mesprojets"}>Verre acrylique avec cadre </Link>  </li>
                    <li ><Link  href={"/mesprojets"}>Toute les peinture murales avec cadres  </Link>  </li>
                </ul>   
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button
                aria-expanded={openMenu === 'menu3'}
                onClick={() => handleButtonClick('menu3')}
              className=" text-black rounded-md  focus:outline-none   p-3 border-none flex flex-wrap  justify-between items-center text-sm font-bold	"
            >
              Créer un livre photo <AiOutlineCaretDown />
            </button>
      
            {openMenu === 'menu3' && (

              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul>
                    <li ><Link  href={"/moncompte"}  >Créer un livre photo      </Link>  </li>
                    <li ><Link  href={"/statucommand"}> Commencez a concevoir </Link> </li>
                    <li ><Link  href={"/mesprojets"}>Livres photos thématiques   </Link>  </li>
                    <li ><Link  href={"/mesprojets"}>Galerie d'inspirations  </Link>  </li>
                </ul>   
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button
             
              className=" text-black rounded-md  focus:outline-none  p-3 border-none	 text-sm font-bold"
            >
              Tirages photo 
            </button>
          </div>
          <div className="relative inline-block text-left">
            <button
                  aria-expanded={openMenu === 'menu4'}
                  onClick={() => handleButtonClick('menu4')}
              className=" text-black rounded-md  focus:outline-none   p-3 border-none flex flex-wrap  justify-between items-center	text-sm font-bold"
            >
              Calendrier photo <AiOutlineCaretDown />
            </button>
      
            {openMenu === 'menu4' && (

              <div className="absolute right-0 mt-2 w-[100%] bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="flex flex-col gap-y-2 px-3">
                  <li ><Link  href={"/moncompte"}  > Calendrier mural     </Link>  </li>
                  <li ><Link  href={"/statucommand"}> Calendrier de bureau  </Link> </li>
                  <li ><Link  href={"/mesprojets"}> Tous les calendries photos  </Link>  </li>
              </ul>   
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button
                 aria-expanded={openMenu === 'menu5'}
                 onClick={() => handleButtonClick('menu5')}
              className=" text-black rounded-md  focus:outline-none   p-3 border-none flex flex-wrap  justify-between items-center text-sm font-bold	"
            >
              Cartes photos <AiOutlineCaretDown />
            </button>
      
            {openMenu === 'menu5' && (

              <div className="absolute right-0 mt-2 w-[100%] bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="flex flex-col gap-y-2 px-3">
                  <li ><Link  href={"/moncompte"}  >créer vos propres cartes       </Link>  </li>
                  <li ><Link  href={"/statucommand"}> carte de naissance </Link> </li>
                  <li ><Link  href={"/mesprojets"}>Carte d'invitation d'anniversaire   </Link>  </li>
                  <li ><Link  href={"/mesprojets"}>Carte de mariage   </Link>  </li>
                  <li ><Link  href={"/mesprojets"}>Cartes de remerciement  </Link>  </li>
                  <li ><Link  href={"/mesprojets"}>Cartes de confirmation  </Link>  </li>
                  <li ><Link  href={"/mesprojets"}>Cartes de noel  </Link>  </li>
                  <li ><Link  href={"/mesprojets"}>Cartes de Vouvel an  </Link>  </li>
                  <li ><Link  href={"/mesprojets"}>toutes les Cartes photo  </Link>  </li>
              </ul>   
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button
                  aria-expanded={openMenu === 'menu6'}
                  onClick={() => handleButtonClick('menu6')}
              className=" text-black rounded-md  focus:outline-none   p-3 border-none flex flex-wrap  justify-between items-center	text-sm font-bold"
            >
              Cadeaux Photos <AiOutlineCaretDown />
            </button>
      
            {openMenu === 'menu6' && (

              <div className="absolute right-0 mt-2 w-[100%] bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="flex flex-col gap-y-2 px-3">
                  <li ><Link  href={"/moncompte"}  >imprimer des tasses     </Link>  </li>
                  <li ><Link  href={"/statucommand"}> aimants photo  </Link> </li>
                  <li ><Link  href={"/mesprojets"}>casse-tete photo  </Link>  </li>
                  <li ><Link  href={"/mesprojets"}>imprimer des oreillers  </Link>  </li>
                  <li ><Link  href={"/mesprojets"}>cadeaux noel</Link>  </li>
              </ul>   
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <button className=" text-black rounded-md  focus:outline-none   p-3 border-none flex flex-wrap  justify-between items-center	text-sm font-bold	">
              Blogue 
            </button>
      
          </div>
   
    </div>
    </div>

  )
}
