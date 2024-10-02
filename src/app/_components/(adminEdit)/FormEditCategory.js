"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function FormEditCategory() {
    const { token } = useAuth();
    const router = useRouter();
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);

    // Fetch the category data
    const fetchCategory = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setCategory(data.data);
                setSelectedSubcategories(data.data.sousCategories || []); 
            } else {
                console.error('Failed to fetch category:', data.error);
            }
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };


    const fetchSubCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                if (Array.isArray(data.data)) {
                    setSubCategories(data.data);
                } else {
                    console.error('Subcategories response is not an array:', data.data);
                }
            } else {
                console.error('Failed to fetch subcategories:', data.error);
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCategory();
            fetchSubCategories();
        }
    }, [id, token]);

    const handleSubcategoryChange = (event) => {
        const value = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedSubcategories(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: category.name,
                    sousCategories: selectedSubcategories,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Category updated successfully!');
                router.push('/admin'); 
            } else {
                alert('Failed to update category: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Error updating category.');
        }
    };

    if (!category) return <p>Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Category Name:</label>
                    <input
                        type="text"
                        value={category.name}
                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Select Subcategories:</label>
                    <select
                        multiple
                        value={selectedSubcategories}
                        onChange={handleSubcategoryChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Select subcategories</option>
                        {subCategories.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                                {sub.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Update Category
                </button>
            </form>
        </div>
    );
}