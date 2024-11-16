'use client'; 
import Image from 'next/image'; 
import React, { useEffect, useState } from 'react'; 
import { MdDeleteForever } from "react-icons/md"; 
import { GrEdit } from "react-icons/gr"; 
import Link from 'next/link'; 
import { useAuth } from '@/app/_utils/AuthProvider';

export default function ProductSideMenu() {
    const [data, setData] = useState([]); 
    const [categories, setCategories] = useState([]); 
    const [promotions, setPromotions] = useState([]); 
    const { token } = useAuth(); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [page, setPage] = useState(1); 
    const [categoryFilter, setCategoryFilter] = useState(""); 
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([fetchProducts(), fetchCategories(), fetchPromotions()]);
                setLoading(false);
            } catch (err) {
                setError("Failed to load data");
                setLoading(false);
            }
        };
        fetchData();
    }, [token, page, categoryFilter]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category=${categoryFilter}&page=${page}&limit=10&ts=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to fetch products');
            const products = await response.json();
            setData(products.data);
            setTotalPages(products.totalPages);
        } catch (error) {
            setError('Error fetching products');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories?ts=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to fetch categories');
            const categoriesData = await response.json();
            setCategories(categoriesData.data);
        } catch (error) {
            setError('Error fetching categories');
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
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to fetch promotions');
            const promotionsData = await response.json();
            setPromotions(promotionsData.data);
        } catch (error) {
            setError('Error fetching promotions');
        }
    };

    const managePromotion = async (promotionId, productId, isAdding) => {
        try {
            const method = isAdding ? 'POST' : 'DELETE';
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions/${promotionId}/products/${productId}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error(`Failed to ${isAdding ? 'add' : 'remove'} promotion`);
            fetchProducts(); 
        } catch (error) {
            setError(`Failed to ${isAdding ? 'add' : 'remove'} promotion`);
        }
    };

    const removeProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Failed to delete this product');
                setData(prevData => prevData.filter(product => product._id !== id));
            } catch (error) {
                setError('Failed to delete product');
            }
        }
    };

    if (loading) return <div className="text-center text-gray-600">Loading products...</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl text-gray-800 text-center font-semibold mb-6">Product Management</h2>

            <div className="mb-4 flex flex-wrap items-center">
            <h2 className="text-lg">Filter avec : </h2>
                <select
                    className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto bg-cyan-600 text-white"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map((product) => (
                    <div key={product._id} className="bg-gray-100 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <Image
                            src={product.imageCover}
                            alt={product.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover sm:h-40 md:h-48"
                        />
                        <div className="p-4">
                            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600">
                                <strong>Prix:</strong> <span className="line-through text-red-500">{product.price} €</span>
                            </p>
                            <p className="text-xs sm:text-sm md:text-base text-green-600">
                                <strong>Prix après promotion:</strong> {product.discountedPrice || 'N/A'}
                            </p>
                            <p className="text-xs sm:text-sm md:text-base text-gray-500 line-clamp-3">
                                <strong>Description:</strong> {product.description}
                            </p>

                            {/* Promotion Management */}
                            <div className="mt-4">
                                {product.promotion ? (
                                    <div className="p-2 bg-white rounded-lg">
                                        <p className="text-gray-800 font-bold">Promotion Active</p>
                                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                                            <strong>Nom:</strong> {product.promotion.name}
                                        </p>
                                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                                            <strong>Discount:</strong> {product.promotion.discountPercentage}%
                                        </p>
                                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                                            <strong>Valide jusqu'au:</strong> {new Date(product.promotion.endDate).toLocaleDateString('fr-FR')}
                                        </p>
                                        <button
                                            className="bg-red-600 text-white p-2 rounded-lg mt-2 hover:bg-red-700 transition-colors"
                                            onClick={() => managePromotion(product.promotion._id, product._id, false)}
                                        >
                                            Retirer Promotion
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-2 sm:mt-3">
                                        <p className="text-gray-600 text-xs sm:text-sm">Pas de promotion appliquée</p>
                                        <select
                                            className="mt-2 p-2 rounded-lg bg-white border border-gray-300 text-xs sm:text-sm w-full"
                                            onChange={(e) => {
                                                if (e.target.value) managePromotion(e.target.value, product._id, true);
                                            }}
                                        >
                                            <option value="">Ajouter une promotion</option>
                                            {promotions.map((promotion) => (
                                                <option key={promotion._id} value={promotion._id}>
                                                    {promotion.name} - {promotion.discountPercentage}%
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between mt-4">
                                <Link href={`/edit/produit/${product._id}`} className="text-blue-600 hover:underline">
                                    <GrEdit size={20} /> 
                                </Link>
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => removeProduct(product._id)}
                                >
                                    <MdDeleteForever size={20} /> 
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => setPage(Math.max(page - 1, 1))}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg mr-2"
                    disabled={page === 1}
                >
                    Précédent
                </button>
                <button
                    onClick={() => setPage(Math.min(page + 1, totalPages))}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                    disabled={page === totalPages}
                >
                    Suivant
                </button>
            </div>
            <div className="mt-4">
                <Link href={'/admin/product'}>
                    <button className="border bg-orange-500 text-black p-2 rounded-lg">Ajouter produit</button>
                </Link>
            </div>
        </div>
    );
}