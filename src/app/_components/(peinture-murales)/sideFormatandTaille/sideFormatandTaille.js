"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SideFormatandTaille({ setSelectedImage, formatData }) {
  const [formats, setFormats] = useState([]);
  const [selectedTaille, setSelectedTaille] = useState(null);
  const [expandedFormat, setExpandedFormat] = useState(null);
  const router = useRouter();
  // Directly use formatData prop
  useEffect(() => {
    if (formatData) {
      setFormats(formatData);
    }
  }, [formatData]);

  const handleTailleChange = (tailleId, image) => {
    setSelectedTaille(tailleId);
    setSelectedImage(image);
  };

  const toggleFormat = (formatId) => {
    setExpandedFormat((prevFormat) => (prevFormat === formatId ? null : formatId));
  };

  const handleDownloadImage = () => {
    if (selectedTaille) {
      localStorage.setItem("taille", selectedTaille);
      router.push("/download");
    } else {
      console.log("No taille selected.");
    }
  };

  return (
    <div className="flex flex-col p-6 border border-gray-300 rounded-lg shadow-md bg-white max-w-lg mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Formats</h2>
      {formats.length === 0 ? (
        <p className="text-center text-gray-500">No formats available</p>
      ) : (
        formats.map((format) => (
          <div key={format._id} className="mb-4">
            <div 
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 cursor-pointer" 
              onClick={() => toggleFormat(format._id)}
            >
              <h3 className="font-semibold text-xl">{format.type}</h3>
              <span className="text-gray-600">{expandedFormat === format._id ? '-' : '+'}</span>
            </div>
            {expandedFormat === format._id && (
              <div className="p-4 transition-all duration-300 ease-in-out">
                <h4 className="text-md text-gray-600 mb-2">Sizes:</h4>
                <div className="flex flex-col space-y-2">
                  {format.tailles.map((taille) => ( // Map over tailles if it's an array
                    <label key={taille._id} className="flex items-center p-2 rounded-md hover:bg-gray-200 transition duration-200">
                      <input
                        type="radio"
                        name="taille"
                        checked={selectedTaille === taille._id} // Use taille._id
                        onChange={() => handleTailleChange(taille._id, taille.image)} // Use taille.image
                        className="form-radio h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring focus:ring-indigo-200"
                      />
                      <span className="ml-2 text-gray-800">{`${taille.width} ${taille.unit} x ${taille.height} ${taille.unit} - dt ${taille.price.toFixed(2)}`}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}
      <button
        onClick={handleDownloadImage}
        className="border bg-green-700 border-white rounded-lg h-12 w-full text-white mx-auto mt-4 hover:bg-green-800 transition duration-200"
      >
        Téléchargez une photo
      </button>
    </div>
  );
}