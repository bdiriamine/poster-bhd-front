"use client"; // Ensure this component runs on the client side
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/_utils/AuthProvider'; // Adjust the path as necessary
import { useParams, useRouter } from 'next/navigation';

const FormEditCalendrier = () => {
    const { id } = useParams();
    const { token } = useAuth(); // Get the authorization token
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
    const [numberOfPhotos, setNumberOfPhotos] = useState(''); // Initialize numberOfPhotos
    const [existingImageCover, setExistingImageCover] = useState('');
    const router = useRouter(); // Create a router instance for navigation

    useEffect(() => {
        const fetchCalendrier = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendriePhoto/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setName(data.data.name);
                    setPrice(data.data.price);
                    setDescription(data.data.description);
                    setSelectedSousCategory(data.data.sousCategories._id);
                    setSelectedPromotion(data.data.promotions?._id );
                    setSelectedFormats(data.data.formats.map(format => format._id));
                    setExistingImageCover(data.data.imageCover);
                    setYear(data.data.year);
                    setPaperQuality(data.data.paperQuality);
                    setNumberOfPhotos(data.data.numberOfPhotos); // Set numberOfPhotos
                } else {
                    console.error("Error fetching calendrier:", data.message);
                }
            } catch (error) {
                console.error("Error fetching calendrier:", error);
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

        fetchCalendrier(); // Fetch existing calendrier data
        fetchSousCategories();
        fetchPromotions();
        fetchFormats();
    }, [token, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedData = new FormData(); 
        updatedData.append('name', name);
        updatedData.append('price', parseFloat(price));
        updatedData.append('description', description);
        updatedData.append('sousCategories', selectedSousCategory);
        updatedData.append('promotions', selectedPromotion || null);
        updatedData.append('imageCover', imageCover || existingImageCover); // Use existing image if no new image is selected
        selectedFormats.forEach(format => updatedData.append('formats', format));
        updatedData.append('year', parseInt(year, 10));
        updatedData.append('paperQuality', paperQuality);
        updatedData.append('numberOfPhotos', parseInt(numberOfPhotos, 10)); // Add numberOfPhotos to the form data

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendriePhoto/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: updatedData, 
            });

            const data = await response.json();

            if (response.ok) {
                alert('Calendrier updated successfully!');
                router.push('/admin'); 
            } else {
                console.error("Error updating calendrier:", data.message);
            }
        } catch (error) {
            console.error("Error updating calendrier:", error);
        }
    };



    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Edit Calendrier</h2>
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

                <label className="block">
                    <span className="text-gray-600">Sous Categories:</span>
                    <select
                        value={selectedSousCategory}
                        onChange={(e) => setSelectedSousCategory(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select a sous category</option>
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
                        <option value="">Select a promotion</option>
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
                        {formats.map((format) => (
                            <option key={format._id} value={format._id}>
                                {format.type}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Image Cover:</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageCover(e.target.files[0])}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Year:</span>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
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
                    <span className="text-gray-600">Number of Photos:</span>
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
                    className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                    Update Calendrier
                </button>
            </form>
        </div>
    );
};

export default FormEditCalendrier;