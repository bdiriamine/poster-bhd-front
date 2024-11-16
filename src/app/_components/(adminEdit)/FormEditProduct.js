"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/_utils/AuthProvider';

export default function FormEditProduct() {
    const router = useRouter();
    const { id } = useParams();
    const { token } = useAuth();

    const [product, setProduct] = useState(null);
    const [promotions, setPromotions] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [formats, setFormats] = useState([]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPromotion, setSelectedPromotion] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedFormats, setSelectedFormats] = useState([]); // Multiple formats
    const [imageCover, setImageCover] = useState(null);

    useEffect(() => {
        if (id) {
            fetchProductData();
            fetchPromotions();
            fetchSubcategories();
            fetchFormats();
        }
    }, [id]);

    const fetchProductData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`);
            const data = await response.json();
            if (response.ok) {
                setProduct(data.data);
                setName(data.data.name);
                setPrice(data.data.price);
                setDescription(data.data.description);
                setSelectedPromotion(data.data.promotions[0]?._id || '');
                setSelectedSubcategory(data.data.sousCategorie?._id || '');
                setSelectedFormats(data.data.formats.map(format => format._id) || []); // Update formats array
                setImageCover(data.data.imageCover);
            } else {
                console.error('Failed to fetch product data');
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const fetchPromotions = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions`);
            const data = await response.json();
            if (response.ok) {
                setPromotions(data.data);
            } else {
                console.error('Failed to fetch promotions');
            }
        } catch (error) {
            console.error('Error fetching promotions:', error);
        }
    };

    const fetchSubcategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories`);
            const data = await response.json();
            if (response.ok) {
                setSubcategories(data.data);
            } else {
                console.error('Failed to fetch subcategories');
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const fetchFormats = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats`);
            const data = await response.json();
            if (response.ok) {
                setFormats(data.data);
            } else {
                console.error('Failed to fetch formats');
            }
        } catch (error) {
            console.error('Error fetching formats:', error);
        }
    };

    const handleFormatChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedFormats(selected);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        if (selectedPromotion) {
            formData.append('promotions', selectedPromotion);
        }
        if (selectedSubcategory) {
            formData.append('sousCategories', selectedSubcategory);
        }
        // Append all selected formats
        selectedFormats.forEach(format => {
            formData.append('formats', format);
        });
        if (imageCover) {
            formData.append('imageCover', imageCover);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert('Product updated successfully!');
                router.push('/admin');
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (!product) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <div className="bg-teal-800 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl text-teal-600 font-bold text-center mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-teal-600 font-semibold mb-1">Product Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-teal-600 font-semibold mb-1">Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-teal-600 font-semibold mb-1">Image Cover:</label>
                        <input
                            type="file"
                            onChange={(e) => setImageCover(e.target.files[0])}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            accept="image/*"
                        />
                    </div>
                    <div>
                        <label className="block text-teal-600 font-semibold mb-1">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-teal-600 font-semibold mb-1">Select Promotion:</label>
                        <select
                            value={selectedPromotion}
                            onChange={(e) => setSelectedPromotion(e.target.value || '')}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                        >
                            <option value="">Select Promotion</option>
                            {promotions.map((promotion) => (
                                <option key={promotion._id} value={promotion._id}>
                                    {promotion.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-teal-600 font-semibold mb-1">Select Subcategory:</label>
                        <select
                            value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value || null)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                        >
                            <option value="">Select Subcategory</option>
                            {subcategories.map((subcategory) => (
                                <option key={subcategory._id} value={subcategory._id}>
                                    {subcategory.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-teal-600 font-semibold mb-1">Select Formats:</label>
                        <select
                            multiple
                            value={selectedFormats}
                            onChange={handleFormatChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                        >
                            {formats.map((format) => (
                                <option key={format._id} value={format._id}>
                                    {format.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-teal-600 text-white p-2 w-full rounded-lg hover:bg-teal-700 transition duration-300"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}