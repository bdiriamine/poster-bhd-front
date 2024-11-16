"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/_utils/AuthProvider'; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
const FormAddCalendrier = () => {
    const { token } = useAuth(); // Get the authorization token
    const router = useRouter();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [sousCategories, setSousCategories] = useState([]);
    const [selectedSousCategory, setSelectedSousCategory] = useState('');
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState('');
    const [formats, setFormats] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [imageCover, setImageCover] = useState(null); // Change to store the file
    const [year, setYear] = useState('');
    const [paperQuality, setPaperQuality] = useState('');
    const [numberOfPhotos, setNumberOfPhotos] = useState(''); // New state for number of photos

    useEffect(() => {
        const fetchSousCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories?ts=` + new Date().getTime(), {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setSousCategories(data.data);
                } else {
                    toast.error("Erreur lors de la récupération des sous-catégories :", data.message ,{
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération des sous-catégories :", error ,{
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
                    toast.error("Erreur lors de la récupération des promotions :", data.message ,{
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération des promotions :", error ,{
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
                    toast.error("Erreur lors de la récupération des formats :", data.message ,{
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération des formats :", error ,{
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const calendrierData = new FormData(); // Use FormData to handle file upload
        calendrierData.append('name', name);
        calendrierData.append('price', parseFloat(price));
        calendrierData.append('description', description);
        calendrierData.append('sousCategories', selectedSousCategory);
        if (selectedPromotion) {
            calendrierData.append('promotions', selectedPromotion);
        } else {
            calendrierData.append('promotions', null); 
        }

        calendrierData.append('imageCover', imageCover); // Append the file
        selectedFormats.forEach(format => calendrierData.append('formats', format));
        calendrierData.append('year', parseInt(year, 10));
        calendrierData.append('paperQuality', paperQuality);
        calendrierData.append('numberOfPhotos', parseInt(numberOfPhotos, 10)); // Append numberOfPhotos

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendriePhoto`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: calendrierData, // Send FormData directly
            });

            const data = await response.json();

            if (response.ok) {
                                toast.success('calendrier ajouté avec succès !', {
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
                toast.error("Erreur lors de l'ajout du calendrier :", data.message ,{
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
            }
        } catch (error) {
            toast.error("Erreur lors de l'ajout du calendrier :", error ,{
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
        }
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setDescription('');
        setSelectedSousCategory('');
        setSelectedPromotion('');
        setSelectedFormats([]);
        setImageCover(null); // Reset to null
        setYear('');
        setPaperQuality('');
        setNumberOfPhotos(''); // Reset numberOfPhotos
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Ajouter un Calendrier</h2>
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
                    <span className="text-gray-600">Description:</span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        <option value="">Sélectionner une sous-catégorie</option>
                        {sousCategories.map((sousCategory) => (
                            <option key={sousCategory._id} value={sousCategory._id}>
                                {sousCategory.name}
                            </option>
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
                        <option value="">Sélectionner une promotion</option>
                        {promotions.map((promotion) => (
                            <option key={promotion._id} value={promotion._id}>
                                {promotion.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Formats:</span>
                    <select
                        multiple
                        value={selectedFormats}
                        onChange={(e) => setSelectedFormats([...e.target.selectedOptions].map(option => option.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {formats?.map((format) => (
                            <option key={format._id} value={format._id}>
                                {format.type}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Image de couverture:</span>
                    <input
                        type="file"
                        accept="image/*" // Allow only image files
                        onChange={(e) => setImageCover(e.target.files[0])} // Store the first selected file
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Année :</span>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Qualité du papier:</span>
                    <input
                        type="text"
                        value={paperQuality}
                        onChange={(e) => setPaperQuality(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Nombre de photos :</span>
                    <input
                        type="number"
                        value={numberOfPhotos}
                        onChange={(e) => setNumberOfPhotos(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-500 transition-colors duration-300"
                >
                    Ajouter Calendrie
                </button>
            </form>
        </div>
    );
};

export default FormAddCalendrier;