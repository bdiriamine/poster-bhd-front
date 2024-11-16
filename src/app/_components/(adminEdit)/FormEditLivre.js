"use client"; // Make sure to include this to use client-side hooks 

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/_utils/AuthProvider';
import { useParams, useRouter } from 'next/navigation';

const FormEditLivre = () => {
    const { token } = useAuth(); // Get the authorization token
    const router = useRouter();

    const [livreData, setLivreData] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [sousCategories, setSousCategories] = useState([]);
    const [selectedSousCategory, setSelectedSousCategory] = useState('');
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState('');
    const [formats, setFormats] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]); // Array for multiple selected formats
    const [imageCover, setImageCover] = useState(null); // Change to store the file
    const [paperQuality, setPaperQuality] = useState('');
    const [coverType, setCoverType] = useState('');
    const [numberOfPages, setNumberOfPages] = useState('');
    const [numberOfPhotos, setNumberOfPhotos] = useState(''); // Add state for numberOfPhotos
    const [selectedSize, setSelectedSize] = useState(''); // State for selected size

    const { id } = useParams();

    useEffect(() => {
        const fetchLivreData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/livrephotos/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                
                if (response.ok) {
                    setLivreData(data.data);
                    setName(data.data.name);
                    setPrice(data.data.price);
                    setDescription(data.data.description);
                    setSelectedSousCategory(data.data.sousCategories._id);
                    setSelectedPromotion(data.data.promotions._id);
                    setSelectedFormats(data.data.formats.map(format => format._id));
                    setPaperQuality(data.data.paperQuality); // Ensure this is correct
                    setCoverType(data.data.coverType); // Ensure this is correct
                    setNumberOfPages(data.data.numberOfPages); // Ensure this is correct
                    setNumberOfPhotos(data.data.numberOfPhotos); // Ensure this is correct
                    setSelectedSize(data.data.size); // Ensure this matches your API
                } else {
                    console.error("Error fetching livre data:", data.message);
                }
            } catch (error) {
                console.error("Error fetching livre data:", error);
            }
        };

        const fetchSousCategories = async () => {
            // Fetch sous categories for selection
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
            // Fetch promotions for selection
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
            // Fetch formats for selection
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

        fetchLivreData();
        fetchSousCategories();
        fetchPromotions();
        fetchFormats();
        
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const livreData = new FormData(); // Create a new FormData object
        livreData.append('name', name);
        livreData.append('price', parseFloat(price));
        livreData.append('description', description);
        livreData.append('sousCategories', selectedSousCategory);
        livreData.append('promotions', selectedPromotion);
        livreData.append('size', selectedSize); // Add the selected size to FormData
    
        // Check if a new image file has been selected (truthy check)
        if (imageCover) {
            livreData.append('imageCover', imageCover); // Append the new image file if present
        }
    
        // Append other fields to FormData
        selectedFormats.forEach(format => livreData.append('formats', format)); // Append all selected formats
        livreData.append('paperQuality', paperQuality);
        livreData.append('coverType', coverType);
        livreData.append('numberOfPages', parseInt(numberOfPages, 10));
        livreData.append('numberOfPhotos', parseInt(numberOfPhotos, 10)); // Append numberOfPhotos to FormData
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/livrephotos/${id}`, {
                method: 'PUT', // Use PUT method to update data
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token for authorization
                },
                body: livreData, // Send FormData directly
            });
    
            const data = await response.json(); // Parse the response JSON
    
            if (response.ok) {
                alert('Livre updated successfully!'); // Success alert
                router.push('/admin'); // Redirect after successful update
            } else {
                console.error("Error updating livre:", data.message); // Log error message if response is not OK
            }
        } catch (error) {
            console.error("Error updating livre:", error); // Log any network errors
        }
    };

    if (!livreData) {
        return <div>Loading...</div>; // Loading state while fetching data
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Edit Livre Photo</h2>
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
                    <span className="text-gray-600">Sous Category:</span>
                    <select
                        value={selectedSousCategory}
                        onChange={(e) => setSelectedSousCategory(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {sousCategories.map((sousCategory) => (
                            <option key={sousCategory._id} value={sousCategory._id}>
                                {sousCategory.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Promotion:</span>
                    <select
                        value={selectedPromotion}
                        onChange={(e) => setSelectedPromotion(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {promotions.map((promotion) => (
                            <option key={promotion._id} value={promotion._id}>
                                {promotion.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Select Size:</span>
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Formats:</span>
                    <select
                        multiple
                        value={selectedFormats}
                        onChange={(e) => {
                            const options = e.target.options;
                            const values = [];
                            for (let i = 0; i < options.length; i++) {
                                if (options[i].selected) {
                                    values.push(options[i].value);
                                }
                            }
                            setSelectedFormats(values);
                        }}
                        required
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
                        onChange={(e) => setImageCover(e.target.files[0])}
                        accept="image/*"
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
                    <span className="text-gray-600">Cover Type:</span>
                    <input
                        type="text"
                        value={coverType}
                        onChange={(e) => setCoverType(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Number of Pages:</span>
                    <input
                        type="number"
                        value={numberOfPages}
                        onChange={(e) => setNumberOfPages(e.target.value)}
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
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                    Update Livre
                </button>
            </form>
        </div>
    );
};

export default FormEditLivre;