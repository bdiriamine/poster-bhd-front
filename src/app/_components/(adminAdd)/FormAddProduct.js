"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_utils/AuthProvider";
import { toast } from 'react-toastify';
import Loader from "../loader/loader";
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
    const [selectedFormats, setSelectedFormats] = useState([]); // Array to store multiple formats
    const [imageCover, setImageCover] = useState(null);

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
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions?ts=${new Date().getTime()}`
            );
            const data = await response.json();
            if (response.ok) {
                setPromotions(data.data);
            } else {
                throw new Error("Échec de la récupération des promotions");
            }
        } catch (error) {
            setError(error.message);
            toast.error("Erreur lors de la récupération des promotions:", error , {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    const fetchSubcategories = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories?ts=${new Date().getTime()}`
            );
            const data = await response.json();
            if (response.ok) {
                setSubcategories(data.data);
            } else {
                throw new Error("Échec de la récupération des sous-catégories",data.message);
            }
        } catch (error) {
            setError(error.message);
            toast.error("Échec de la récupération des sous-catégories", error , {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    const fetchFormats = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats?ts=${new Date().getTime()}`
            );
            const data = await response.json();
            if (response.ok) {
                setFormats(data.data);
            } else {
                throw new Error("Échec de la récupération des formats");
            }
        } catch (error) {
            setError(error.message);
            toast.error("Échec de la récupération des formats", error , {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (selectedPromotion) {
            formData.append("promotions", selectedPromotion);
        }
        if (selectedSubcategory) {
            formData.append("sousCategories", selectedSubcategory);
        }
        if (selectedFormats.length > 0) {
            selectedFormats.forEach((format) => formData.append("formats", format));
        }

        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);

        if (imageCover) {
            formData.append("imageCover", imageCover);
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?ts=${new Date().getTime()}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (response.ok) {
                toast.success('Product créée avec succès!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                router.push("/admin");
            } else {
                throw new Error("Échec de l'ajout du produit");
            }
        } catch (error) {
            setError(error.message);
            toast.error("Échec de l'ajout du produit", error , {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            });
        }
    };

    const handleFormatChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
        setSelectedFormats(selectedOptions);
    };

    if (loading) {
        return <div className="text-center"> <Loader /></div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="bg-teal-900 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl text-teal-900 font-bold text-center mb-6">
                Ajouter un nouveau produit
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-teal-900">Nom du produit :</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-teal-900">Prix:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-teal-900">Image de couverture :</label>
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
                        <label className="text-teal-900">Sélectionner une promotion :</label>
                        <select
                            value={selectedPromotion}
                            onChange={(e) =>
                                setSelectedPromotion(e.target.value )
                            }
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                        >
                            <option value="">Sélectionner Promotion</option>
                            {promotions.map((promotion) => (
                                <option key={promotion._id} value={promotion._id}>
                                    {promotion.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-teal-900">Sélectionner une sous-catégorie :</label>
                        <select
                            value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
                            required
                        >
                            <option value="">Sélectionner Subcategory</option>
                            {subcategories.map((subcategory) => (
                                <option key={subcategory._id} value={subcategory._id}>
                                    {subcategory.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-teal-900">Sélectionner des formats (plusieurs):</label>
                        <select
                            multiple // Allow multiple selections
                            value={selectedFormats}
                            onChange={handleFormatChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
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
                        className="w-full bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-500 transition duration-300 mt-4"
                    >
                         Ajouter le produit
                    </button>
                </form>
            </div>
        </div>
    );
}