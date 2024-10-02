"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_utils/AuthProvider";

export default function FormAddProduct() {
    const router = useRouter();
    const { token } = useAuth();

    const [promotions, setPromotions] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [formats, setFormats] = useState([]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [selectedPromotion, setSelectedPromotion] = useState();
    const [selectedSubcategory, setSelectedSubcategory] = useState();
    const [selectedFormat, setSelectedFormat] = useState();
    const [imageCover, setImageCover] = useState(null);

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            await fetchPromotions();
            await fetchSubcategories();
            await fetchFormats();
            setLoading(false); // Set loading to false once data is fetched
        };
        fetchData();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions`
            );
            const data = await response.json();
            if (response.ok) {
                setPromotions(data.data);
            } else {
                throw new Error("Failed to fetch promotions");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching promotions:", error);
        }
    };

    const fetchSubcategories = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories`
            );
            const data = await response.json();
            if (response.ok) {
                setSubcategories(data.data);
            } else {
                throw new Error("Failed to fetch subcategories");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching subcategories:", error);
        }
    };

    const fetchFormats = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats`
            );
            const data = await response.json();
            if (response.ok) {
                setFormats(data.data);
            } else {
                throw new Error("Failed to fetch formats");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error fetching formats:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (selectedPromotion) {
            formData.append("promotions", selectedPromotion);
        }
        if (selectedSubcategory) {
            formData.append("sousCategorie", selectedSubcategory);
        }
        if (selectedFormat) {
            formData.append("formats", selectedFormat);
        }

        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);

        if (imageCover) {
            formData.append("imageCover", imageCover);
        }

        try {
            const response = await fetch(
                `http://localhost:4000/api/v1/products`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (response.ok) {
                alert("Product added successfully!");
                router.push("/admin");
            } else {
                throw new Error("Failed to add product");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error adding product:", error);
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="bg-teal-900 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl text-teal-900 font-bold text-center mb-6">
                    Add New Product
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-teal-900">Product Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-teal-900">Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-teal-900">Image Cover:</label>
                        <input
                            type="file"
                            onChange={(e) => setImageCover(e.target.files[0])}
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            accept="image/*"
                        />
                    </div>
                    <div>
                        <label className="text-teal-900">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-teal-900">Select Promotion:</label>
                        <select
                            value={selectedPromotion}
                            onChange={(e) =>
                                setSelectedPromotion(e.target.value || null)
                            } // Ensure null is set if no value is selected
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
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
                        <label className="text-teal-900">Select Subcategory:</label>
                        <select
                            value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            required
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
                        <label className="text-teal-900">Select Format:</label>
                        <select
                            value={selectedFormat}
                            onChange={(e) => setSelectedFormat(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            required
                        >
                            <option value="">Select Format</option>
                            {formats.map((format) => (
                                <option key={format._id} value={format._id}>
                                    {format.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-500 transition duration-300 mt-4"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}