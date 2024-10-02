"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function FormEditSousCategorie() {
    const router = useRouter();
    const { id } = useParams();
    const [sousCategorie, setSousCategorie] = useState({ name: '', category: '', produits: [] });
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        // Fetch the subcategory data if the ID is available
        if (id) {
            const fetchSousCategorie = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        credentials: 'include'
                    });

                    if (!response.ok) throw new Error('Failed to fetch sous-categorie');
                    const data = await response.json();
                    setSousCategorie({
                        name: data.data.name,
                        category: data.data.category._id,
                        produits: data.data.produits.map(product => product._id) // Assuming produits is an array of product objects
                    });
                } catch (error) {
                    console.error(error);
                    alert('Failed to fetch sous-categorie');
                }
            };

            fetchSousCategorie();
        }

        // Fetch categories for the select input
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include'
                });

                if (!response.ok) throw new Error('Failed to fetch categories');
                const categoryData = await response.json();
                setCategories(categoryData.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch categories');
            }
        };

        // Fetch products for the select input
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include'
                });

                if (!response.ok) throw new Error('Failed to fetch products');
                const productData = await response.json();
                setProducts(productData.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch products');
            }
        };

        fetchCategories();
        fetchProducts();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSousCategorie(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProductChange = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map(option => option.value);
        setSousCategorie(prevState => ({
            ...prevState,
            produits: selectedOptions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(sousCategorie),
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to update sous-categorie');
            alert('Sous-categorie updated successfully');
            router.push('/admin'); // Redirect to the list page after updating
        } catch (error) {
            console.error(error);
            alert('Failed to update sous-categorie');
        }
    };

    return (
        <div className="bg-teal-900 min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-teal-800 p-6 rounded-lg">
                <h2 className="text-2xl text-white mb-4">Edit Sous-Categorie</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="text-white">Nom de la Sous-Catégorie</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={sousCategorie.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="text-white">Catégorie</label>
                    <select
                        id="category"
                        name="category"
                        value={sousCategorie.category}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded"
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="produits" className="text-white">Produits</label>
                    <select
                        id="produits"
                        name="produits"
                        multiple
                        value={sousCategorie.produits}
                        onChange={handleProductChange}
                        className="w-full p-2 rounded"
                    >
                        {products.map(product => (
                            <option key={product._id} value={product._id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-orange-500 text-black p-2 rounded-lg">
                    Update Sous-Catégorie
                </button>
            </form>
        </div>
    );
}