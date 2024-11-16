"use client";

import { useAuth } from '@/app/_utils/AuthProvider';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export default function FormAddTaille() {
    const { token } = useAuth();
    const [formatTypes, setFormatTypes] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [newType, setNewType] = useState('');
    const [tailles, setTailles] = useState([{ width: '', height: '', unit: 'cm', price: '', image: '' }]);
    const [existingTailles, setExistingTailles] = useState([]); 
    const [selectedTaille, setSelectedTaille] = useState(''); 

    const fetchFormatTypes = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats?ts=${new Date().getTime()}`, {
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
                toast.error('Échec de la récupération des types de format :', data.error ,{
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (error) {
            toast.error('Échec de la récupération des types de format :', error  ,{
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };
    const fetchExistingTailles = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setExistingTailles(data.data); 
            } else {
                toast.error('Échec de la récupération des tailles existantes :', data.error  ,{
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (error) {
            toast.error('Échec de la récupération des tailles existantes :', error  ,{
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions?ts=${new Date().getTime()}`, {
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
                toast.error('Échec de la récupération des promotions :', data.message  ,{
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (error) {
            toast.error('Échec de la récupération des promotions :', error  ,{
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    useEffect(() => {
        fetchFormatTypes();
        fetchPromotions();
        fetchExistingTailles();
    }, [token]);

    const createFormat = async () => {
        const body = {
            type: newType,
            ...(selectedTaille && { tailles: selectedTaille }) 
        };
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || 'Unknown error'); 
            }
    
            return data.data.format._id; 
    
        } catch (error) {
            toast.error('Erreur lors de la création du format : ' + error.message , {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return null; 
        }
    };

    const createTailles = async (tailles, formatId) => {
        const promises = tailles.map(async (taille) => {
            const formData = new FormData(); 
            formData.append('width', taille.width);
            formData.append('height', taille.height);
            formData.append('unit', taille.unit);
            formData.append('price', taille.price);
            formData.append('imageTaille', taille.image);
            formData.append('format', formatId);
            if (selectedPromotion) {
                formData.append('promotion', selectedPromotion);
            }
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData, 
            });
            return await response.json();
        });
    
        const responses = await Promise.all(promises);
        return responses.filter(result => result.status === 'success').map(result => result.data._id);
    };

    const handleAddTaille = () => {
        setTailles([...tailles, { width: '', height: '', unit: 'cm', price: '', image: '' }]);
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
                taille.width && taille.height && taille.unit && taille.price && taille.image
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
        if (newType) {
            formatId = await createFormat();
            if (!formatId) return; 
        } else {
            formatId = selectedType;
        }
    
        const createdTailleIds = await createTailles(tailles, formatId);
        if (createdTailleIds.length > 0) {
            alert('Taille(s) created successfully!');
        } else {
            alert('No tailles were created.');
        }

        // Reset the form
        setSelectedType('');
        setNewType('');
        setSelectedPromotion('');
        setTailles([{ width: '', height: '', unit: 'cm', price: '', image: '' }]);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Ajouter une nouvelle Taille</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Format :</label>
                    <input
                        type="text"
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        placeholder="Entrez un nouveau format ou sélectionnez un existant"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <p className="mt-2 text-sm">ou</p>
                    <select
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value);
                            setNewType(''); // Clear the new type input when selecting an existing type
                        }}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Sélectionner un format existant</option>
                        {formatTypes.map((format) => (
                            <option key={format._id} value={format._id}>{format.type}</option>
                        ))}
                    </select>
                </div>

                {/* Promotions Section */}
                <div>
                    <label className="block text-sm font-medium">Sélectionner Promotion:</label>
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

                <h3 className="text-lg font-semibold">Ajouter une nouvelle taille ou sélectionner une taille existante :</h3>
                <div className="flex flex-col space-y-4">
                    <h4 className="text-md font-semibold">Sélectionner une taille existante</h4>
                    <select
                        value={selectedTaille}
                        onChange={(e) => {
                            setSelectedTaille(e.target.value);
                        }}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Sélectionner une taille existante</option>
                        {existingTailles.map((taille) => (
                            <option key={taille._id} value={taille._id}>
                                {taille.width} x {taille.height} {taille.unit}
                            </option>
                        ))}
                    </select>

                    <h4 className="text-md font-semibold">Détails de la nouvelle taille</h4>
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
                            <label className="block text-sm font-medium mt-2">Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={taille.price}
                                onChange={(e) => handleTailleChange(index, e)}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />
                            <label className="block text-sm font-medium mt-2">Image:</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    const newTailles = [...tailles];
                                    newTailles[index].image = file; // Store the file object in the state
                                    setTailles(newTailles);
                                }}
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
                </div>
                <button
                    type="button"
                    onClick={handleAddTaille}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Ajouter une taille
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Enregistrer
                </button>
            </form>
        </div>
    );

}