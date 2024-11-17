"use client"; // Assurez le comportement côté client

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
      toast.success("Image téléchargée avec succès !");
    } else {
      toast.error("Veuillez télécharger un fichier image valide.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const objectURL = URL.createObjectURL(file);
      setImageURL(objectURL);
      toast.success("Image téléchargée avec succès !");
    } else {
      toast.error("Veuillez déposer un fichier image valide.");
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
      const maxWidth = 1000; // Set your desired max width
      const maxHeight = 1000; // Set your desired max height
      let width = img.width;
      let height = img.height;

      // Resize image if necessary
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.filter = `
        brightness(${brightness}%) 
        contrast(${contrast}%) 
        blur(${blur}px) 
        hue-rotate(${hue}deg) 
        saturate(${saturation}%) 
        grayscale(${grayscale}%)
      `;

      ctx.drawImage(img, 0, 0, width, height);
      const modifiedURL = canvas.toDataURL('image/png'); // Now the image is resized
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
    toast.success("Image téléchargée avec succès !");
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
            toast.error("Échec de la récupération des informations de l'image");
          }

          if (imageToAdd.startsWith('data:image')) {
            formData.append('images', imageToAdd);
          } else {
            const imageBlob = await fetch(imageToAdd).then((res) => {
              if (!res.ok) throw new Error("Échec du téléchargement de l'image");
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
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur serveur:", errorData);
            toast.error(`Erreur: ${errorData.message || 'Échec de l\'ajout au panier'}`);
          }

          if (response.ok) {
            toast.success("Produit ajouté au panier avec succès !");
            router.push('/panier');
          } else {
            const errorData = await response.json();
            console.error("Erreur lors de l'ajout du produit :", errorData.errors || errorData);

            toast.error("Votre token a expiré. Veuillez vous connecter, s'il vous plaît.");
            window.location.reload();
          }
        } catch (error) {
          console.error("Erreur lors de l'ajout au panier :", error);
          toast.error("Une erreur s'est produite lors de l'ajout au panier. Veuillez réessayer.");
        } finally {
          setLoading(false);
        }
      } else {
        toast.warning("Aucune image disponible pour ajouter au panier.");
      }
    } else {
      toast.warning("Taille ou nom de produit non trouvé dans le local storage.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-r from-purple-100 to-blue-200 min-h-screen">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-4">Éditeur d'images</h1>
      {/* Section de glisser-déposer et de téléchargement de fichier */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-500 p-4 w-full max-w-lg flex flex-col items-center justify-center space-y-2 rounded-lg shadow-lg bg-white mx-4 sm:mx-auto"
      >
        <p className="text-sm text-gray-600">Glissez-déposez votre image ici ou</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border border-gray-300 p-1 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full max-w-xs"
        />
        <p className="text-sm text-gray-600">ou cliquez pour télécharger</p>
      </div>

      {imageURL && (
        <div className="flex flex-col md:flex-row w-full max-w-5xl justify-between mt-4">
          {/* Section des ajustements */}
          <div className="flex flex-col space-y-4 bg-gray-50 p-4 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-700">Ajustements</h2>
            {/* Curseurs pour les ajustements */}
            {[
              { label: 'Luminosité', value: brightness, setter: setBrightness, min: 0, max: 200 },
              { label: 'Contraste', value: contrast, setter: setContrast, min: 0, max: 200 },
              { label: 'Flou', value: blur, setter: setBlur, min: 0, max: 10 },
              { label: 'Saturation', value: saturation, setter: setSaturation, min: 0, max: 200 },
              { label: 'Gris', value: grayscale, setter: setGrayscale, min: 0, max: 100 },
            ].map(({ label, value, setter, min, max }) => (
              <label key={label} className="flex items-center space-x-2 text-sm">
                <span>{label} :</span>
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
              <label>Rotation :</label>
              <input
                type="number"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="border rounded-lg w-20 p-1"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <label>Teinte :</label>
              <input
                type="number"
                value={hue}
                onChange={(e) => setHue(Number(e.target.value))}
                className="border rounded-lg w-20 p-1"
              />
            </div>
          </div>
          {/* Section de l'aperçu de l'image */}
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg w-full max-w-md mt-4 md:mt-0">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Aperçu de l'image</h2>
            <canvas ref={canvasRef} className="border border-gray-300 w-full max-h-64 object-contain"></canvas>
            <div className="flex mt-4 space-x-4">
              <button
                onClick={handleDownloadImage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Télécharger l'image
              </button>
              <button
                onClick={handleAddToPanier}
                className={`px-4 py-2 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} transition duration-200`}
                disabled={loading}
              >
                {loading ? 'Ajout en cours...' : 'Ajouter au panier'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
