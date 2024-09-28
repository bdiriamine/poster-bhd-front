"use client";

import { useAuth } from '@/app/_utils/AuthProvider';
import { useState, useEffect } from 'react';

export default function FormAddTaille() {
    const { token } = useAuth();
    const [formatTypes, setFormatTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [newType, setNewType] = useState('');
    const [tailles, setTailles] = useState([{ width: '', height: '', unit: 'cm', prix: '', image: '' }]);

    // Fetch format types function
    const fetchFormatTypes = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
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

    useEffect(() => {
        fetchFormatTypes();
    }, [token]);

    const createFormat = async () => {
       
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ type: newType }),
        });

        const data = await response.json();
        if (!response.ok) {
            alert('Error creating format: ' + (data.error || 'Unknown error'));
            return null;
        }
        return data.data.format._id; // Return the new format ID
    };

    const createTailles = async (tailles, formatId) => {
        const responses = await Promise.all(tailles.map(async (taille) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    width: taille.width,
                    height: taille.height,
                    unit: taille.unit,
                    prix: taille.prix,
                    image: taille.image,
                    format: formatId,
                }),
            });
            return await response.json();
        }));

        return responses.filter(result => result.status === 'success').map(result => result.data._id);
    };

    const handleAddTaille = () => {
        setTailles([...tailles, { width: '', height: '', unit: 'cm', prix: '', image: '' }]);
    };

    const handleTailleChange = (index, event) => {
        const newTailles = [...tailles];
        newTailles[index][event.target.name] = event.target.value;
        setTailles(newTailles);
    };

    const validateInputs = () => {
        return (
            (newType || selectedType) &&
            tailles.every(taille =>
                taille.width && taille.height && taille.unit && taille.prix && taille.image
            )
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateInputs()) {
            alert('Please fill in all fields.');
            return;
        }

        let formatId;

        // Create or get the format ID
        if (newType) {
            formatId = await createFormat();
            
            setTimeout(async()=>{
                const createdTailleIds = await createTailles(tailles, formatId);
                if (createdTailleIds.length > 0) {
                    alert('Taille(s) created successfully!');
                } else {
                    alert('No tailles were created.');
                }
            },2000)
       
        

            if (!formatId) return; // Exit if format creation failed
        } else {
            formatId = selectedType;
            const createdTailleIds = await createTailles(tailles, formatId);
          
            if (createdTailleIds.length > 0) {
                alert('Taille(s) created successfully!');
            } else {
                alert('No tailles were created.');
            }
        }

        if (!formatId) {
            alert('Format ID is required.');
            return;
        }

        // Create tailles with the format ID


        // Reset the form
        setSelectedType('');
        setNewType('');
        setTailles([{ width: '', height: '', unit: 'cm', prix: '', image: '' }]);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Format</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Type:</label>
                    <input
                        type="text"
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        placeholder="Enter new type or select existing"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <p className="mt-2 text-sm">or</p>
                    <select
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value);
                            setNewType(''); // Clear the new type input when selecting an existing type
                        }}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Select existing type</option>
                        {formatTypes.map((format) => (
                            <option key={format._id} value={format._id}>{format.type}</option>
                        ))}
                    </select>
                </div>
                <h3 className="text-lg font-semibold">Tailles:</h3>
                {tailles.map((taille, index) => (
                    <div key={index} className="border p-4 rounded-md mb-2">
                        <label className="block text-sm font-medium">Width:</label>
                        <input
                            type="number"
                            name="width"
                            value={taille.width}
                            onChange={(e) => handleTailleChange(index, e)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <label className="block text-sm font-medium mt-2">Height:</label>
                        <input
                            type="number"
                            name="height"
                            value={taille.height}
                            onChange={(e) => handleTailleChange(index, e)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <label className="block text-sm font-medium mt-2">Unit:</label>
                        <input
                            type="text"
                            name="unit"
                            value={taille.unit}
                            onChange={(e) => handleTailleChange(index, e)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <label className="block text-sm font-medium mt-2">Prix:</label>
                        <input
                            type="number"
                            name="prix"
                            value={taille.prix}
                            onChange={(e) => handleTailleChange(index, e)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <label className="block text-sm font-medium mt-2">Image URL:</label>
                        <input
                            type="url"
                            name="image"
                            value={taille.image}
                            onChange={(e) => handleTailleChange(index, e)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setTailles(tailles.filter((_, i) => i !== index))}
                            className="mt-2 text-red-600 hover:underline"
                        >
                            Remove Taille
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddTaille}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Taille
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}