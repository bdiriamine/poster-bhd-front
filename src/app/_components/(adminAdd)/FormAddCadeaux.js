"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/_utils/AuthProvider'; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
const FormAddCadeaux = () => {
    const { token } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [occasion, setOccasion] = useState('');
    const [personalizedMessage, setPersonalizedMessage] = useState('');
    const [wrappingType, setWrappingType] = useState('');
    const [giftSize, setGiftSize] = useState('');
    const [numberOfPhoto, setNumberOfPhoto] = useState(1); // Default to 1
    const [sousCategories, setSousCategories] = useState([]);
    const [selectedSousCategory, setSelectedSousCategory] = useState('');
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState('');
    const [formats, setFormats] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [imageCover, setImageCover] = useState(null);

    // Fetch data for sous categories, promotions, and formats
    useEffect(() => {
        const fetchSousCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setSousCategories(data.data);
                } else {
                    toast.error("Erreur lors de la récupération des sous-catégories :", data.message , {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération des sous-catégories :", error , {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
            }
        };

        const fetchPromotions = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setPromotions(data.data);
                } else {
                    toast.error("Erreur lors de la récupération des promotions :", data.message , {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération des promotions :", error , {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
            }
        };

        const fetchFormats = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setFormats(data.data);
                } else {
                    toast.error("Erreur lors de la récupération des formats :", data.message , {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération des formats :", error , {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
            }
        };

        fetchSousCategories();
        fetchPromotions();
        fetchFormats();
    }, [token]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const cadeauxData = new FormData();
        cadeauxData.append('name', name);
        cadeauxData.append('price', parseFloat(price));
        cadeauxData.append('description', description);
        cadeauxData.append('occasion', occasion);
        cadeauxData.append('personalizedMessage', personalizedMessage);
        cadeauxData.append('wrappingType', wrappingType);
        cadeauxData.append('giftSize', giftSize);
        cadeauxData.append('numberOfPhotos', numberOfPhoto);
        cadeauxData.append('sousCategories', selectedSousCategory);
        
        if (selectedPromotion) {
            cadeauxData.append('promotions', selectedPromotion);
        }
        
        selectedFormats.forEach(format => cadeauxData.append('formats', format));
        
        if (imageCover) {
            cadeauxData.append('imageCover', imageCover);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cadeauxphotos?ts=${new Date().getTime()}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: cadeauxData,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Cadeaux ajouté avec succès !', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
                resetForm();
                setTimeout(() => {
                    router.push('/');
                }, 2000); 
            } else {
                toast.error("Erreur lors de l'ajout du cadeaux :", data.message , {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
            }
        } catch (error) {
            toast.error("Erreur lors de l'ajout du cadeaux :", error , {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
        }
    };

    // Reset form fields
    const resetForm = () => {
        setName('');
        setPrice('');
        setDescription('');
        setOccasion('');
        setPersonalizedMessage('');
        setWrappingType('');
        setGiftSize('');
        setNumberOfPhoto(1);
        setSelectedSousCategory('');
        setSelectedPromotion('');
        setSelectedFormats([]);
        setImageCover(null);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Ajouter Cadeaux Photo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-600">Nom :</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Prix :</span>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Description :</span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Occasion:</span>
                    <input
                        type="text"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Message personnalisé :</span>
                    <textarea
                        value={personalizedMessage}
                        onChange={(e) => setPersonalizedMessage(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Catégorie :</span>
                    <input
                        type="text"
                        value={wrappingType}
                        onChange={(e) => setWrappingType(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Taille du cadeau:</span>
                    <input
                        type="text"
                        value={giftSize}
                        onChange={(e) => setGiftSize(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Nombre de photos:</span>
                    <input
                        type="number"
                        value={numberOfPhoto}
                        onChange={(e) => setNumberOfPhoto(Math.max(1, parseInt(e.target.value)))}
                        min="1"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Sous-catégories :</span>
                    <select
                        value={selectedSousCategory}
                        onChange={(e) => setSelectedSousCategory(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="" disabled>Sélectionner une sous-catégorie</option>
                        {sousCategories.map((sousCategory) => (
                            <option key={sousCategory._id} value={sousCategory._id}>{sousCategory.name}</option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Promotions:</span>
                    <select
                        value={selectedPromotion}
                        onChange={(e) => setSelectedPromotion(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="" disabled>Sélectionner une promotion</option>
                        {promotions.map((promotion) => (
                            <option key={promotion._id} value={promotion._id}>{promotion.name}</option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Formats:</span>
                    <select
                        multiple
                        value={selectedFormats}
                        onChange={(e) => {
                            const options = e.target.options;
                            const selectedValues = [];
                            for (let i = 0; i < options.length; i++) {
                                if (options[i].selected) {
                                    selectedValues.push(options[i].value);
                                }
                            }
                            setSelectedFormats(selectedValues);
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {formats.map((format) => (
                            <option key={format._id} value={format._id}>{format.type}</option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Image de couverture :</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageCover(e.target.files[0])}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-200"
                >
                      Ajouter Cadeaux
                </button>
            </form>
        </div>
    );
};

export default FormAddCadeaux;