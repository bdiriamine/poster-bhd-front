"use client"; // Make sure to include this to use client-side hooks 

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/_utils/AuthProvider';
import { useParams, useRouter } from 'next/navigation';

const FormEditCarte = () => {
    const { token } = useAuth(); // Get the authorization token
    const router = useRouter();

    const [carteData, setCarteData] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [sousCategories, setSousCategories] = useState([]);
    const [selectedSousCategory, setSelectedSousCategory] = useState('');
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState('');
    const [formats, setFormats] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [imageCover, setImageCover] = useState(null); // Stores the file
    const [existingImageCover, setExistingImageCover] = useState(''); // Stores the existing image URL
    const [numberOfCards, setNumberOfCards] = useState('');
    const [numberOfPhotos, setNumberOfPhotos] = useState(''); // New state for numberOfPhotos
    const [paperQuality, setPaperQuality] = useState('');
    const [occasion, setOccasion] = useState('');

    const { id } = useParams();

    useEffect(() => {
        // Fetch the existing livre data
        const fetchCarteData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cartesphotos/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();

                if (response.ok) {
                    setCarteData(data.data);
                    // Set form fields with the fetched data
                    setName(data.data.name);
                    setPrice(data.data.price);
                    setDescription(data.data.description);
                    setSelectedSousCategory(data.data.sousCategories._id);
                    setSelectedPromotion(data.data.promotions?._id );
                    setSelectedFormats(data.data.formats.map((format) => format._id));
                    setNumberOfCards(data.data.numberOfCards);
                    setNumberOfPhotos(data.data.numberOfPhotos); // Set numberOfPhotos
                    setPaperQuality(data.data.paperQuality);
                    setOccasion(data.data.occasion);
                    setExistingImageCover(data.data.imageCover); // Store existing image URL
                } else {
                    console.error("Error fetching livre data:", data.message);
                }
            } catch (error) {
                console.error("Error fetching livre data:", error);
            }
        };

        const fetchSousCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setSousCategories(data.data);
                } else {
                    console.error("Error fetching sous categories:", data.message);
                }
            } catch (error) {
                console.error("Error fetching sous categories:", error);
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
                    console.error("Error fetching promotions:", data.message);
                }
            } catch (error) {
                console.error("Error fetching promotions:", error);
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
                    console.error("Error fetching formats:", data.message);
                }
            } catch (error) {
                console.error("Error fetching formats:", error);
            }
        };

        fetchCarteData();
        fetchSousCategories();
        fetchPromotions();
        fetchFormats();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const carteData = new FormData(); // Create a new FormData object
        carteData.append('name', name);
        carteData.append('price', parseFloat(price));
        carteData.append('description', description);
        carteData.append('sousCategories', selectedSousCategory);
        carteData.append('promotions', selectedPromotion || null);
        selectedFormats.forEach(format => carteData.append('formats', format)); // Append all selected formats
        carteData.append('numberOfCards', parseInt(numberOfCards, 10));
        carteData.append('numberOfPhotos', parseInt(numberOfPhotos, 10)); // Append numberOfPhotos
        carteData.append('paperQuality', paperQuality);
        carteData.append('occasion', occasion);

        // Check if the imageCover has changed, only append if there's a new file
        if (imageCover) {
            carteData.append('imageCover', imageCover); // Append the image file
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cartesphotos/${id}`, {
                method: 'PUT', // Use PUT method to update data
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token for authorization
                },
                body: carteData, // Send FormData directly
            });

            const data = await response.json(); // Parse the response JSON

            if (response.ok) {
                alert('Carte photo updated successfully!'); // Success alert
                router.push('/admin'); // Redirect after successful update
            } else {
                console.error("Error updating livre:", data.message); // Log error message if response is not OK
            }
        } catch (error) {
            console.error("Error updating livre:", error); // Log any network errors
        }
    };

    if (!carteData) {
        return <div>Loading...</div>; // Loading state while fetching data
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Edit Carte Photo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-600">Name:</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Price:</span>
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

                {/* Display existing image */}
                {existingImageCover && (
                    <div className="mb-4">
                        <img src={existingImageCover} alt="Existing Cover" className="w-48 h-auto" />
                    </div>
                )}

                {/* Image cover input */}
                <label className="block">
                    <span className="text-gray-600">Image Cover:</span>
                    <input
                        type="file"
                        onChange={(e) => setImageCover(e.target.files[0])}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                {/* Select for SousCategories */}
                <label className="block">
                    <span className="text-gray-600">Sous Categories:</span>
                    <select
                        value={selectedSousCategory}
                        onChange={(e) => setSelectedSousCategory(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {sousCategories.map((sousCategory) => (
                            <option key={sousCategory._id} value={sousCategory._id}>
                                {sousCategory.name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Select for Promotions */}
                <label className="block">
                    <span className="text-gray-600">Promotions:</span>
                    <select
                        value={selectedPromotion}
                        onChange={(e) => setSelectedPromotion(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                         <option value="">Select a promotion</option>
                        {promotions.map((promotion) => (
                            <option key={promotion._id} value={promotion._id}>
                                {promotion.name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Select for Formats */}
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
                            <option key={format._id} value={format._id}>
                                {format.type}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Number of Cards:</span>
                    <input
                        type="number"
                        value={numberOfCards}
                        onChange={(e) => setNumberOfCards(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                {/* New Input for Number of Photos */}
                <label className="block">
                    <span className="text-gray-600">Number of Photos:</span>
                    <input
                        type="number"
                        value={numberOfPhotos}
                        onChange={(e) => setNumberOfPhotos(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Paper Quality:</span>
                    <input
                        type="text"
                        value={paperQuality}
                        onChange={(e) => setPaperQuality(e.target.value)}
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

                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Update Carte Photo
                </button>
            </form>
        </div>
    );
};

export default FormEditCarte;