"use client";

import { useAuth } from '@/app/_utils/AuthProvider';
import { useState, useEffect } from 'react';
import { useParams,useRouter } from 'next/navigation';

export default function FormEditTaille() {
    const { token } = useAuth();
    const router = useRouter();
    const [formatTypes, setFormatTypes] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [taille, setTaille] = useState({ width: '', height: '', unit: 'cm', price: '', image: '' });

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchFormatTypes();
            fetchPromotions();
            fetchTailleData(id);
        }
    }, [id]);

    // Fetch format types function
    const fetchFormatTypes = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setFormatTypes(data.data);
            } else {
                console.error('Failed to fetch format types:', data.error);
            }
        } catch (error) {
            console.error('Error fetching format types:', error);
        }
    };

    // Fetch promotions function
    const fetchPromotions = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setPromotions(data.data);
            } else {
                console.error('Failed to fetch promotions:', data.error);
            }
        } catch (error) {
            console.error('Error fetching promotions:', error);
        }
    };

    // Fetch taille data for editing
    const fetchTailleData = async (tailleId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles/${tailleId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setTaille(data.data);
                setSelectedPromotion(data.data.promotion); // Set existing promotion
                setSelectedType(data.data.format); // Set existing format
            } else {
                console.error('Failed to fetch taille data:', data.error);
            }
        } catch (error) {
            console.error('Error fetching taille data:', error);
        }
    };

    const handleTailleChange = (event) => {
        const { name, value } = event.target;
        setTaille(prevTaille => ({ ...prevTaille, [name]: value }));
    };

    const validateInputs = () => {
        return taille.width && taille.height && taille.unit && taille.price && taille.image;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateInputs()) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...taille,
                    promotion: selectedPromotion,
                    format: selectedType,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Taille updated successfully!');
                router.push('/admin'); // Redirect after successful update
            } else {
                alert('Error updating taille: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error updating taille:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Taille</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Width:</label>
                    <input
                        type="number"
                        name="width"
                        value={taille.width}
                        onChange={handleTailleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Height:</label>
                    <input
                        type="number"
                        name="height"
                        value={taille.height}
                        onChange={handleTailleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Unit:</label>
                    <input
                        type="text"
                        name="unit"
                        value={taille.unit}
                        onChange={handleTailleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={taille.price}
                        onChange={handleTailleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Image URL:</label>
                    <input
                        type="url"
                        name="image"
                        value={taille.image}
                        onChange={handleTailleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Select Promotion:</label>
                    <select
                        value={selectedPromotion}
                        onChange={(e) => setSelectedPromotion(e.target.value || null)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Select a promotion</option>
                        {promotions.map((promo) => (
                            <option key={promo._id} value={promo._id}>{promo.name}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Update Taille
                </button>
            </form>
        </div>
    );
}