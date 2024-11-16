"use client"; 
import React, { useEffect, useState } from 'react';
import style from "./navmenu.module.css";
import img from "../../../../public/assets/image/test1.png";
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineCaretDown } from "react-icons/ai";

export default function Navmenu() {
  const [openMenu, setOpenMenu] = useState(null);
  const [categories, setCategories] = useState([]);

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

  // Fetch categories data from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories?ts=${new Date().getTime()}`);
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setCategories(data.data); // Ensure data.data is an array
          console.log(categories)
        } else {
          console.error('Data format is incorrect:', data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

  return (
    <div className={style.nav}>
      <div className="hidden md:flex md:flex-wrap justify-center items-center">
        <div className="relative">
          <Link href={'/'}>
            <Image src={img} alt='logo' height={0} sizes="10vw" style={{ width: '80%', height: 'auto' }} />
          </Link>
        </div>

        {/* Map through categories to display buttons */}
        {Array.isArray(categories) && categories.map((category) => (
          <div key={category._id} className="relative inline-block text-left">
            <button
              className="text-black rounded-md focus:outline-none p-3 border-none flex flex-wrap justify-between items-center text-sm font-bold"
              aria-expanded={openMenu === category._id}
              onClick={() => handleButtonClick(category._id)}
            >
              <Link href={`/${category.slug}`}>{category.name} </Link> 
              {category.sousCategories?.length > 0 && category.name !== "Tirages photo" ? <AiOutlineCaretDown /> : null}
            </button>

            {/* Display subcategories in a dropdown, but not for "Tirages photo" */}
            {openMenu === category._id && category.name !== "Tirages photo" && (
              <div className="absolute right-0 mt-2 w-[100%] bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="flex flex-col gap-y-2 px-3">
                  {category.sousCategories.map((subCategory) => (
                    <li key={subCategory._id}>
                      <Link href={`/${category.slug}/${subCategory.name}`}>{subCategory.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}