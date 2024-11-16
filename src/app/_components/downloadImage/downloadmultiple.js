
"use client";    
import React, { useState, useRef, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useAuth } from '@/app/_utils/AuthProvider';

export default function DownloadMultiple() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [maxImages, setMaxImages] = useState(5);
  const [imageFilters, setImageFilters] = useState([]);
  const canvasRef = useRef(null);
  const dropzoneRef = useRef(null);
  const { token, user } = useAuth();
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedMaxImages = localStorage.getItem("numbres");
    const idlivre = localStorage.getItem('produits');
    const typeProduit = localStorage.getItem('type');
    if (storedMaxImages) {
      setMaxImages(parseInt(storedMaxImages, 10));
    }
    
    const fetchPrice = async () => {
      try {
        let url = '';
        
        // Set the URL based on the type of product
        switch (typeProduit) {
          case 'livrephotos':
            url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/livrephotos/${idlivre}`;
            break;
          case 'calendriePhoto':
            url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendriePhoto/${idlivre}`;
            break;
          default:
            throw new Error('Unknown product type');
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch price data');
        }
        
        const data = await response.json();
        setPriceAfterDiscount(data.data.priceAfterDiscount);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPrice();
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFilesUpload(files);
    }
  };

  const handleFilesUpload = (files) => {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (selectedImages.length + imageFiles.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    const imagePreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imagePreviews]);

    const newFilters = imageFiles.map(() => ({
      brightness: 100,
      contrast: 100,
      blur: 0,
      hue: 0,
      saturation: 100,
      grayscale: 0,
    }));

    setImageFilters((prevFilters) => [...prevFilters, ...newFilters]);
    simulateUploadProgress(imageFiles.length);
  };

  const simulateUploadProgress = (totalImages) => {
    setLoading(true);
    setProgress(0);
    
    let uploadedImages = 0;
    const interval = setInterval(() => {
      if (uploadedImages >= totalImages) {
        clearInterval(interval);
        setLoading(false);
        setProgress(100);
      } else {
        uploadedImages++;
        setProgress((prev) => Math.min(prev + (100 / totalImages), 100));
      }
    }, 100);
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    setImageFilters((prevFilters) =>
      prevFilters.filter((_, i) => i !== index)
    );
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    await Promise.all(
      selectedImages.map(async (imageURL, index) => {
          console.log(`Downloading image ${index + 1}:`, imageURL); // Debugging log
          const response = await fetch(imageURL);
          if (!response.ok) {
              console.error(`Failed to fetch image ${index + 1}`);
              return; // Skip this image if it fails
          }
          const blob = await response.blob();
          zip.file(`image-${index + 1}.png`, blob);
      })
    );

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
};

  const applyFilters = (imageSrc, filters) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        blur(${filters.blur}px)
        hue-rotate(${filters.hue}deg)
        saturate(${filters.saturation}%)
        grayscale(${filters.grayscale}%)
      `;
      ctx.drawImage(img, 0, 0);
    };
  };

  const handleFilterChange = (index, e) => {
    const { name, value } = e.target;
    setImageFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index] = { ...newFilters[index], [name]: parseFloat(value) };
      return newFilters;
    });

    const currentImage = selectedImages[index];
    if (currentImage) {
      applyFilters(currentImage, { ...imageFilters[index], [name]: parseFloat(value) });
    }
  };

  const convertToBase64 = (imageSrc) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Set crossOrigin for images from other domains
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const base64 = canvas.toDataURL("image/png");
            resolve(base64);
        };

        img.onerror = (error) => {
            reject(error);
        };
    });
};

  const addToCart = async () => {
    const productid = localStorage.getItem('produits')
    const userId = user._id; // Ensure user._id is available
    const productImages = await Promise.all(
        selectedImages.map(imageSrc => convertToBase64(imageSrc))
    );
    console.log("Converted Images: ", productImages); // Log the converted images

    const payload = {
      user: userId,
      images: productImages, // Adding the selected images as imageCover
      totalPrice: priceAfterDiscount,
      product:productid,
    };
  
    console.log(payload);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/panier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
  
      alert("Images added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart.");
    }
  };

  useEffect(() => {
    return () => {
      selectedImages.forEach((imageURL) => URL.revokeObjectURL(imageURL));
    };
  }, [selectedImages]);

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-blue-400 to-teal-500 rounded-lg shadow-lg">
      <div
        ref={dropzoneRef}
        className="border-2 border-dashed border-white p-4 text-white text-lg font-semibold text-center mb-4 rounded-lg transition-transform transform hover:scale-105"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        Drag & Drop Images Here or Click to Upload
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFilesUpload(e.target.files)}
          className="mt-4 cursor-pointer text-transparent"
        />
      </div>
  
      {loading && (
        <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
  
      {selectedImages.length > 0 && (
        <div className="grid md:grid-cols-5 gap-4">
          {selectedImages.map((imageURL, index) => (
            <div
              key={index}
              className="relative group transition-transform transform hover:scale-105 border-2 border-gray-300 bg-slate-800 rounded-lg p-2"
            >
              <div className="bg-gray-100">
                <img
                  src={imageURL}
                  alt={`Preview ${index}`}
                  className="w-full h-auto max-w-xs rounded-lg shadow-lg mx-auto bg-gray-100"
                  style={{
                    filter: `
                      brightness(${imageFilters[index]?.brightness || 100}%) 
                      contrast(${imageFilters[index]?.contrast || 100}%) 
                      blur(${imageFilters[index]?.blur || 0}px) 
                      hue-rotate(${imageFilters[index]?.hue || 0}deg) 
                      saturate(${imageFilters[index]?.saturation || 100}%) 
                      grayscale(${imageFilters[index]?.grayscale || 0}%)
                    `,
                  }}
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1"
                >
                  X
                </button>
              </div>
  
              <div className="flex flex-col mt-2">
                {Object.keys(imageFilters[index]).map((filter) => (
                  <input
                    key={filter}
                    type="range"
                    name={filter}
                    min={filter === "blur" ? 0 : 0}
                    max={filter === "brightness" || filter === "contrast" ? 200 : 100}
                    value={imageFilters[index][filter]}
                    onChange={(e) => handleFilterChange(index, e)}
                    className="mb-2"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
  
      <div className="mt-4 flex justify-between">
        <button
          onClick={addToCart}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
        <button
          onClick={handleDownloadAll}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Download All
        </button>
      </div>
      
      <div className="mt-4 text-white">
        {selectedImages.length} / {maxImages} images uploaded
      </div>
      
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}