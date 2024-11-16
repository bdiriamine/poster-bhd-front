"use client"; // Ensure client-side behavior

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/app/_utils/AuthProvider';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
export default function Downloadspace() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imageModified, setImageModified] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [blur, setBlur] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);
  const { token, user } = useAuth();
  const router = useRouter(); 
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const objectURL = URL.createObjectURL(file);
      setImageURL(objectURL);
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const objectURL = URL.createObjectURL(file);
      setImageURL(objectURL);
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Please drop a valid image file.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleModifyImage = () => {
    if (imageURL && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.filter = `
          brightness(${brightness}%) 
          contrast(${contrast}%) 
          blur(${blur}px) 
          hue-rotate(${hue}deg) 
          saturate(${saturation}%) 
          grayscale(${grayscale}%)
        `;

        ctx.save();
        if (rotation !== 0) {
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        const modifiedURL = canvas.toDataURL('image/png');
        setImageModified(modifiedURL);
      };

      img.src = imageURL;
    }
  };

  useEffect(() => {
    const debounceModifyImage = setTimeout(() => {
      handleModifyImage();
    }, 100);

    return () => clearTimeout(debounceModifyImage);
  }, [brightness, contrast, blur, rotation, hue, saturation, grayscale, imageURL]);

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = imageModified || imageURL;
    link.download = selectedImage ? selectedImage.name : 'modified-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded successfully!");
  };

  const handleAddToPanier = async () => {
    const tailleId = localStorage.getItem('taille');
    const productName = localStorage.getItem('productName');

    if (tailleId && productName) {
      const imageToAdd = imageModified || imageURL;

      if (imageToAdd && selectedImage) {
        const formData = new FormData();
        formData.append('tailles', tailleId);
        formData.append('product', productName);
        formData.append('user', user?._id);

        try {
          const responsedata = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles/${tailleId}`);
          const data = await responsedata.json();
          if (data.status === 'success') {
            formData.append('totalPrice', data.data?.price);
          } else {
            toast.error("Failed to fetch image information");
          }

          if (imageToAdd.startsWith('data:image')) {
            formData.append('images', imageToAdd);
          } else {
            const imageBlob = await fetch(imageToAdd).then((res) => {
              if (!res.ok) throw new Error("Image fetching failed");
              return res.blob();
            });
            formData.append('images', imageBlob, selectedImage.name);
          }

          const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/panier`;
          setLoading(true);

          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          if (response.ok) {
            toast.success("Product added to panier successfully!");
            router.push('/panier')
          } else {
            const errorData = await response.json();
            console.error("Error adding product:", errorData.errors || errorData);

              toast.error("Ton token a expiré. Veuillez vous connecter s'il vous plaît.");
              window.location.reload()
          }
        } catch (error) {
          console.error("Error adding to panier:", error);
          toast.error("An error occurred while adding to panier. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        toast.warning("No image available to add to panier.");
      }
    } else {
      toast.warning("Taille or product name not found in local storage.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-r from-purple-100 to-blue-200 min-h-screen">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-4">Image Editor</h1>
      {/* Drag & Drop and File Upload Section */}
      <div
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  className="border-2 border-dashed border-gray-500 p-4 w-full max-w-lg flex flex-col items-center justify-center space-y-2 rounded-lg shadow-lg bg-white mx-4 sm:mx-auto"
>
  <p className="text-sm text-gray-600">Drag & drop your image here or</p>
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="border border-gray-300 p-1 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full max-w-xs"
  />
  <p className="text-sm text-gray-600">or click to upload</p>
</div>

      {imageURL && (
        <div className="flex flex-col md:flex-row w-full max-w-5xl justify-between mt-4">
          {/* Adjustments Section */}
          <div className="flex flex-col space-y-4 bg-gray-50 p-4 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-700">Adjustments</h2>
            {/* Sliders for adjustments */}
            {[
              { label: 'Brightness', value: brightness, setter: setBrightness, min: 0, max: 200 },
              { label: 'Contrast', value: contrast, setter: setContrast, min: 0, max: 200 },
              { label: 'Blur', value: blur, setter: setBlur, min: 0, max: 10 },
              { label: 'Saturation', value: saturation, setter: setSaturation, min: 0, max: 200 },
              { label: 'Grayscale', value: grayscale, setter: setGrayscale, min: 0, max: 100 },
            ].map(({ label, value, setter, min, max }) => (
              <label key={label} className="flex items-center space-x-2 text-sm">
                <span>{label}:</span>
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full"
                />
              </label>
            ))}
            <div className="flex items-center space-x-2 text-sm">
              <label>Rotation:</label>
              <input
                type="number"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="border rounded-lg w-20 p-1 text-sm"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <label>Hue:</label>
              <input
                type="number"
                value={hue}
                onChange={(e) => setHue(Number(e.target.value))}
                className="border rounded-lg w-20 p-1 text-sm"
              />
            </div>
            <button
              onClick={handleModifyImage}
              className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600"
            >
              Apply Changes
            </button>
          </div>

          {/* Canvas for modified image */}
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <canvas ref={canvasRef} className="w-full h-auto bg-gray-100 rounded-lg" />
            {imageModified && (
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleDownloadImage}
                  className="bg-green-500 text-white p-2 rounded-lg w-full hover:bg-green-600"
                >
                  Download Image
                </button>
                <button
                  onClick={handleAddToPanier}
                  className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add to Panier'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}