"use client";

import { useAuth } from '@/app/_utils/AuthProvider';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function FormAddCategorie() {
    const { token } = useAuth();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]); // State for storing products
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [subcategories, setSubcategories] = useState([{ name: '', produits: [] }]);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories?ts=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setCategories(data.data);
            } else {
                toast.error('Échec de la récupération des catégories: ' + data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (error) {
            toast.error('Échec de la récupération des catégories: ' + error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    // Fetch products
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?ts=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setProducts(data.data);

            } else {
                toast.error('Échec de la récupération des produits: ' + data.error, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
        } catch (error) {
            toast.error('Échec de la récupération des produits: ' + error, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts(); // Fetch products when the component mounts
    }, [token]);

    const createCategory = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories?ts=${new Date().getTime()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newCategory }),
        });

        const data = await response.json();
        if (!response.ok) {
            toast.error('Erreur lors de la création de la catégorie: ' + (data.message || 'Erreur inconnue'), {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return null;
        }

        toast.success('Catégorie créée avec succès!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
        });
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
                    produits: subcategory.produits, // Assuming this is an array of product IDs
                }),
            });
            return await response.json();
        }));

        const createdSubcategories = responses.filter(result => result.status === 'success').map(result => result.data._id);
        if (createdSubcategories.length > 0) {
            toast.success('Sous-catégorie(s) créée(s) avec succès!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        } else {
            toast.error('Aucune sous-catégorie n\'a été créée.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
        return createdSubcategories;
    };

    const handleAddSubcategory = () => {
        setSubcategories([...subcategories, { name: '', produits: [] }]);
    };

    const handleSubcategoryChange = (index, event) => {
        const { name, value } = event.target;
        const newSubcategories = [...subcategories];
        if (name === 'produits') {
            // Handle multiple select options for products
            const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
            newSubcategories[index][name] = selectedOptions;
        } else {
            newSubcategories[index][name] = value;
        }
        setSubcategories(newSubcategories);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let categoryId;

        if (newCategory) {
            categoryId = await createCategory();
            if (!categoryId) return;
            setTimeout(async () => {
                await createSubcategories(subcategories, categoryId);
            }, 2000);
        } else {
            categoryId = selectedCategory;
            await createSubcategories(subcategories, categoryId);
        }

        setSelectedCategory('');
        setNewCategory('');
        setSubcategories([{ name: '', produits: [] }]);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Ajouter une nouvelle catégorie</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nom :</label>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Entrez une nouvelle catégorie ou sélectionnez une catégorie existante"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    <p className="mt-2 text-sm">ou</p>
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setNewCategory(''); // Clear the new category input when selecting an existing category
                        }}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        <option value="">Sélectionner une catégorie existante</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <h3 className="text-lg font-semibold">Sous-catégories :</h3>
                {subcategories.map((subcategory, index) => (
                    <div key={index} className="border p-4 rounded-md mb-2">
                        <label className="block text-sm font-medium">Nom :</label>
                        <input
                            type="text"
                            name="name"
                            value={subcategory.name}
                            onChange={(e) => handleSubcategoryChange(index, e)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <label className="block text-sm font-medium mt-2">Produits:</label>
                        <select
                            name="produits"
                            multiple
                            value={subcategory.produits}
                            onChange={(e) => handleSubcategoryChange(index, e)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        >
                            {products.map((product) => (
                                <option key={product._id} value={product._id}>{product.name}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddSubcategory}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-700 focus:outline-none focus:ring"
                >
                    Ajouter une sous-catégorie
                    </button>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md mt-4 hover:bg-green-700 focus:outline-none focus:ring"
                >
                    Soumettre
                </button>
            </form>
        </div>
    );
}