"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/_utils/AuthProvider"; // Adjust the path as necessary
import { useParams, useRouter } from "next/navigation";
import { toast} from 'react-toastify';
const FormEditCadeaux = () => {
    const { token } = useAuth();
    const router = useRouter();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [occasion, setOccasion] = useState("");
    const [personalizedMessage, setPersonalizedMessage] = useState("");
    const [wrappingType, setWrappingType] = useState("");
    const [giftSize, setGiftSize] = useState("");
    const [numberOfPhoto, setNumberOfPhoto] = useState(1);
    const [sousCategories, setSousCategories] = useState([]);
    const [selectedSousCategory, setSelectedSousCategory] = useState("");
    const [promotions, setPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState("");
    const [formats, setFormats] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [imageCover, setImageCover] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState(""); // State for the existing image URL

    // Fetch data for sous categories, promotions, formats, and the selected cadeau
    useEffect(() => {
        const fetchSousCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setSousCategories(data.data);
                } else {
                    toast.error("Erreur lors de la récupération des sous-catégories:", data.message , {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération des sous-catégories:", error , {
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setPromotions(data.data);
                } else {
                    toast.error("Erreur lors de la récupération des promotions:", data.message , {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération des promotions:", error , {
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setFormats(data.data);
                } else {
                    toast.error("Erreur lors de la récupération des formats:", data.message , {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                }
            } catch (error) {
                toast.error("Erreur lors de la récupération des formats:", error , {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
            }
        };

        const fetchCadeaux = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cadeauxPhotos/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    const cadeau = data.data;
                    setName(cadeau.name);
                    setPrice(cadeau.price);
                    setDescription(cadeau.description);
                    setOccasion(cadeau.occasion);
                    setPersonalizedMessage(cadeau.personalizedMessage);
                    setWrappingType(cadeau.wrappingType);
                    setGiftSize(cadeau.giftSize);
                    setNumberOfPhoto(cadeau.numberOfPhotos);
                    setSelectedSousCategory(cadeau.sousCategories._id);
                    setSelectedPromotion(cadeau.promotions._id);
                    setSelectedFormats(cadeau.formats.map((format) => format._id)); // Ensure selectedFormats is an array
                    setExistingImageUrl(cadeau.imageCover); // Set the existing image URL
                } else {
                    console.error("Erreur lors de la récupération des cadeaux:", data.message);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des cadeaux:", error);
            }
        };

        fetchSousCategories();
        fetchPromotions();
        fetchFormats();
        fetchCadeaux();
    }, [token, id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const cadeauxData = new FormData();
        cadeauxData.append("name", name);
        cadeauxData.append("price", parseFloat(price));
        cadeauxData.append("description", description);
        cadeauxData.append("occasion", occasion);
        cadeauxData.append("personalizedMessage", personalizedMessage);
        cadeauxData.append("wrappingType", wrappingType);
        cadeauxData.append("giftSize", giftSize);
        cadeauxData.append("numberOfPhotos", numberOfPhoto);
        cadeauxData.append("sousCategories", selectedSousCategory);
        if (selectedPromotion) {
            cadeauxData.append("promotions", selectedPromotion);
        }
        selectedFormats.forEach((format) => cadeauxData.append("formats", format));
        if (imageCover) {
            cadeauxData.append("imageCover", imageCover);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cadeauxphotos/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: cadeauxData,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Cadeaux mis à jour avec succès!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
                router.push("/admin"); // Adjust the redirect path as needed
            } else {
                toast.error("Erreur lors de la mise à jour des cadeaux:", data.message , {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
            }
        } catch (error) {
            toast.error("Erreur lors de la mise à jour des cadeaux:", error , {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Modifier Cadeaux Photo</h2>
            {existingImageUrl && (
                <div className="mb-4">
                    <img
                        src={existingImageUrl}
                        alt="Current Cover"
                        className="w-full h-auto rounded-lg mb-2"
                    />
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-600">Nom :</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Prix :</span>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Description:</span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Occasion:</span>
                    <input
                        type="text"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Message personnalisé :</span>
                    <textarea
                        value={personalizedMessage}
                        onChange={(e) => setPersonalizedMessage(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Category:</span>
                    <input
                        type="text"
                        value={wrappingType}
                        onChange={(e) => setWrappingType(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Taille du cadeau</span>
                    <input
                        type="text"
                        value={giftSize}
                        onChange={(e) => setGiftSize(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Nombre de photos :</span>
                    <input
                        type="number"
                        value={numberOfPhoto}
                        onChange={(e) => setNumberOfPhoto(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-600">Sous-catégorie :</span>
                    <select
                        value={selectedSousCategory}
                        onChange={(e) => setSelectedSousCategory(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select a sous category</option>
                        {sousCategories.map((sousCategory) => (
                            <option key={sousCategory._id} value={sousCategory._id}>
                                {sousCategory.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Promotions:</span>
                    <select
                        value={selectedPromotion}
                        onChange={(e) => setSelectedPromotion(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select a promotion</option>
                        {promotions.map((promotion) => (
                            <option key={promotion._id} value={promotion._id}>
                                {promotion.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Formats:</span>
                    <select
                        multiple
                        value={selectedFormats}
                        onChange={(e) => {
                            const options = e.target.options;
                            const selected = [];
                            for (let i = 0; i < options.length; i++) {
                                if (options[i].selected) {
                                    selected.push(options[i].value);
                                }
                            }
                            setSelectedFormats(selected);
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {formats.map((format) => (
                            <option key={format._id} value={format._id}>
                                {format.type}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-600">Image de couverture :</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageCover(e.target.files[0])}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <button type="submit" className="mt-4 w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700">
                    Update Cadeaux
                </button>
            </form>
        </div>
    );
};

export default FormEditCadeaux;