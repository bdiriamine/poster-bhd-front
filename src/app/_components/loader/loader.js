import React from 'react'; 

export default function Loader() {
  return (
    <div className="flex md:h-64 flex-col items-center justify-center min-h-screen bg-gray-900">
      {/* Rotating Loader Circle */}
      <div className="w-16 h-16 border-8 border-t-transparent border-b-transparent border-l-orange-500 border-r-yellow-400 rounded-full animate-spin mb-4"></div>

      {/* Bouncing Loader Dot */}
      <div className="w-6 h-6 bg-orange-500 rounded-full animate-bounce mb-4"></div>

      {/* Loading Text */}
      <p className="text-lg font-semibold text-white">
        Loading BHD Poster...
      </p>
    </div>
  );
}