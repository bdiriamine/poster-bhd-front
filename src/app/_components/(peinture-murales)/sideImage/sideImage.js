"use client";
import Image from 'next/image';

const SideImage = ({ img }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg transition-transform duration-300 transform hover:scale-105 ">
      {img ? (
        <Image
          src={img}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 transform hover:scale-110 rounded-lg md:p-12"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No Image Available</p>
        </div>
      )}
    </div>
  );
};

export default SideImage;