"use client";
import React, { useState, useEffect } from 'react';

export default function Downloadspace() {
  const [imageInfo, setImageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State for image toggle
  const [productInfo, setProductInfo] = useState(null); // State for product info
  const [loadingProduct, setLoadingProduct] = useState(false); // Loading state for product
  const [errorProduct, setErrorProduct] = useState(null); // Error state for product
  const [isProductOpen, setIsProductOpen] = useState(false); // State for product toggle

  // Fetch image info from the API
  useEffect(() => {
    const fetchImageInfo = async () => {
      const taille = localStorage.getItem('taille');
      if (!taille) {
        setError("No taille found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles/${taille}`);
        const data = await response.json();
        if (data.status === 'success') {
          setImageInfo(data.data);
        } else {
          setError("Failed to fetch image information");
        }
      } catch (err) {
        setError("Error fetching image information");
      } finally {
        setLoading(false);
      }
    };

    fetchImageInfo();
  }, []);

  // Fetch product info from the API when the product toggle is opened
  const fetchProductInfo = async () => {
    const productId = localStorage.getItem('productName');
    if (!productId) {
      setErrorProduct("No productId found in localStorage");
      setLoadingProduct(false);
      return;
    }

    setLoadingProduct(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${productId}`);
      const data = await response.json();
      if (data.status === 'success') {
        setProductInfo(data.data);
      } else {
        setErrorProduct("Failed to fetch product information");
      }
    } catch (err) {
      setErrorProduct("Error fetching product information");
    } finally {
      setLoadingProduct(false);
    }
  };

  // Toggle product info fetch
  const handleProductToggle = () => {
    setIsProductOpen(prev => {
      if (!prev) {
        fetchProductInfo(); // Fetch product info when opening the toggle
      }
      return !prev;
    });
  };

  if (loading) return <p className="text-gray-500 text-sm">Loading...</p>;
  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  const { width, height, unit, price, image, format, discountedPrice } = imageInfo;

  return (
    <div className="flex flex-col items-center bg-purple-50 shadow-md rounded-lg p-4 md:p-6 max-w-md mx-auto transition-all duration-300">
      {/* Toggle Button with Dimensions */}
      <button 
        className={`flex items-center justify-between w-full px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 ${isOpen ? 'bg-teal-600' : ''}`} 
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="font-semibold  md:text-lg text-gray-800">
          Dimensions: {width} {unit} x {height} {unit}
        </span>
        <span className="ml-2 text-base md:text-lg">{isOpen ? '-' : '+'}</span>
      </button>

      {/* Additional Details for Image */}
      {isOpen && (
        <div className="flex flex-col items-center space-y-2 mt-4 p-4 bg-white rounded-lg shadow-lg transition-all duration-300">
          {image && (
            <img 
              src={image} 
              alt="Fetched Image" 
              className="border p-2 rounded-lg max-w-full h-auto shadow-md transition-transform duration-200 transform hover:scale-105"
            />
          )}
          <div className="text-center ">
            <p className="text-sm  text-teal-600">
              <span className="font-semibold">Price:</span> {price.toFixed(2)} dt
            </p>
            <p className="text-sm  transition-colors duration-500 text-red-500">
              <span className="font-semibold">Discounted Price:</span>
              <span className="animate-pulse text-teal-500">
                {' '}{discountedPrice.toFixed(2)} dt
              </span>
            </p>
            <p className="text-sm  text-gray-700">
              <span className="font-semibold">Format:</span> {format.type}
            </p>
          </div>
        </div>
      )}

      {/* Toggle Button for Product Info */}
      <button 
        className={`flex items-center justify-between w-full px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 mt-2 ${isProductOpen ? 'bg-teal-600' : ''}`} 
        onClick={handleProductToggle}
      >
        <span className="font-semibold text-base md:text-lg text-gray-800">
          Product Information
        </span>
        <span className="ml-2 md:text-lg">{isProductOpen ? '-' : '+'}</span>
      </button>

      {/* Additional Details for Product */}
      {isProductOpen && (
        <div className="flex flex-col items-center space-y-2 mt-4 p-4 bg-white rounded-lg shadow-lg transition-all duration-300">
          {loadingProduct && <p className="text-gray-500 text-sm">Loading product info...</p>}
          {errorProduct && <p className="text-red-500 text-sm">{errorProduct}</p>}
          {productInfo && (
            <div>
              <p className="text-sm  text-gray-700">
                <span className="font-semibold text-sm ">Product Name:</span> {productInfo.name}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}