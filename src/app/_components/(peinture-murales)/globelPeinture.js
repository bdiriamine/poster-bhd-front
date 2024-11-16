"use client";
import React, { useEffect, useState } from 'react';
import SideImage from './sideImage/sideImage';
import SideFormatandTaille from './sideFormatandTaille/sideFormatandTaille';

export default function GlobelPeinture({ msg }) {
  console.log(msg)
  const [img, setImg] = useState();
  const [formatdata, setForamtData] = useState();

useEffect(()=>{

fetchProductData();
},[])
const fetchProductData = async () => {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?sousCategoryName=${msg}`);
      const data = await response.json();
      if (response.ok) {
        console.log(data.data)
        localStorage.setItem("productName",data.data[0]._id)
        setImg(data.data[0].imageCover)
        setForamtData(data.data[0].formats);
       
      } else {
          console.error('Failed to fetch product data');
      }
  } catch (error) {
      console.error('Error fetching product data:', error);
  }
};
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-blue-200 to-blue-500"> {/* Gradient Background */}
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden max-w-6xl w-full h-[100%] md:h-4/5"> {/* Enhanced Box */}
        <div className="flex-1 h-full relative group"> {/* Added group for hover effect */}
          <SideImage img={img} />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div> {/* Overlay effect on hover */}
        </div>
        <div className="flex-1 h-full border-l border-gray-300 p-6"> {/* Padding for content */}
          <SideFormatandTaille setSelectedImage={setImg} formatData={formatdata} /> {/* Pass setImg here */}
        </div>
      </div>
    </div>
  );
}