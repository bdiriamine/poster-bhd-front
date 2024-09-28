"use client";

import { useAuth } from '@/app/_utils/AuthProvider';
import { useState, useEffect } from 'react';

export default function FormAddCategorie() {
    const { token } = useAuth();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [subcategories, setSubcategories] = useState([{ name: '', produits: '' }]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setCategories(data.data);
            } else {
                console.error('Failed to fetch categories:', data.error);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [token]);

    const createCategory = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newCategory }),
        });

        const data = await response.json();
        if (!response.ok) {
            alert('Error creating category: ' + (data.error || 'Unknown error'));
            return null;
        }
        return data.data._id;
    };

    const createSubcategories = async (subcategories, categoryId) => {
        const responses = await Promise.all(subcategories.map(async (subcategory) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: subcategory.name,
                    category: categoryId,
                    produits: null,
                }),
            });
            return await response.json();
        }));

        return responses.filter(result => result.status === 'success').map(result => result.data._id);
    };

    const handleAddSubcategory = () => {
        setSubcategories([...subcategories, { name: '', produits: '' }]);
    };

    const handleSubcategoryChange = (index, event) => {
        const newSubcategories = [...subcategories];
        newSubcategories[index][event.target.name] = event.target.value;
        setSubcategories(newSubcategories);
    };

    const validateInputs = () => {
        return (
            (newCategory || selectedCategory) &&
            subcategories.every(subcategory => subcategory.name)
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateInputs()) {
            alert('Please fill in all fields.');
            return;
        }

        let categoryId;

        if (newCategory) {
            categoryId = await createCategory();
            if (!categoryId) return;
            setTimeout(async()=>{
                const createdSubcategoryIds = await createSubcategories(subcategories, categoryId);
                alert(createdSubcategoryIds.length > 0 ? 'Subcategory(ies) created successfully!' : 'No subcategories were created.');
            },2000)

        } else {
            categoryId = selectedCategory;
            const createdSubcategoryIds = await createSubcategories(subcategories, categoryId);
            alert(createdSubcategoryIds.length > 0 ? 'Subcategory(ies) created successfully!' : 'No subcategories were created.');
        }

        setSelectedCategory('');
        setNewCategory('');
        setSubcategories([{ name: '', produits: '' }]);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name:</label>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter new category or select existing"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <p className="mt-2 text-sm">or</p>
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setNewCategory(''); // Clear the new category input when selecting an existing category
                        }}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Select existing category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <h3 className="text-lg font-semibold">Subcategories:</h3>
                {subcategories.map((subcategory, index) => (
                    <div key={index} className="border p-4 rounded-md mb-2">
                        <label className="block text-sm font-medium">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={subcategory.name}
                            onChange={(e) => handleSubcategoryChange(index, e)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <label className="block text-sm font-medium mt-2">Produits:</label>
                        <input
                            type="text"
                            name="produits"
                            value={subcategory.produits}
                            onChange={(e) => handleSubcategoryChange(index, e)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setSubcategories(subcategories.filter((_, i) => i !== index))}
                            className="mt-2 text-red-600 hover:underline"
                        >
                            Remove Subcategory
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddSubcategory}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Subcategory
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