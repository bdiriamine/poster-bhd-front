"use client";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Link from "next/link";
import { useAuth } from "@/app/_utils/AuthProvider";

export default function CategorySideMenu({ msg }) {
    const [data, setData] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                });
                if (!response.ok) throw new Error("Failed to fetch categories");
                const categories = await response.json();
                setData(categories.data);
            } catch (error) {
                alert("Failed to fetch categories");
            }
        };

        fetchCategories();
    }, [token]);

    const removeCategory = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${id}?ts=${new Date().getTime()}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        credentials: "include",
                    }
                );
                if (!response.ok) throw new Error("Failed to delete this category");
                setData(data.filter((res) => res._id !== id));
                alert("Category deleted successfully");
            } catch (error) {
                alert("Failed to delete this category");
            }
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            {data.length > 0 && (
                <div className="flex items-center justify-center h-16 mb-4 rounded bg-gray-200 shadow-lg">
                    <p className="text-2xl text-gray-600 font-semibold">
                        Liste des {msg}
                    </p>
                </div>
            )}

            <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                <div>
                    {data.length > 0 ? (
                        <div>
                            {/* Table for Desktop */}
                            <div className="overflow-x-auto">
                                <table className="hidden md:table w-full text-gray-800">
                                    <thead>
                                        <tr>
                                            {Object.keys(data[0]).map((key) => (
                                                <th key={key} className="border px-4 py-2 bg-gray-200 text-sm md:text-base">
                                                    {key !== "__v" ? key : null}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((res) => (
                                            <tr key={res._id} className="hover:bg-gray-100">
                                                <td className="text-center border px-2 py-1 text-sm">{res._id}</td>
                                                <td className="text-center border px-2 py-1 text-sm">{res.name}</td>
                                                <td className="text-center border px-2 py-1 text-sm">{res.slug}</td>
                                                <td className="text-center border px-2 py-1 text-sm">
                                                    {res.sousCategories && res.sousCategories.length > 0 ? (
                                                        <ul>
                                                            {res.sousCategories.map((el) => (
                                                                <li key={el._id}>{el.name}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        "vide"
                                                    )}
                                                </td>
                                                <td className="text-center border px-2 py-1 text-sm">{new Date(res.createdAt).toLocaleDateString('fr-FR')}</td>
                                                <td className="text-center border px-2 py-1 text-sm">{new Date(res.updatedAt).toLocaleDateString('fr-FR')}</td>
                                                <td className="text-center border px-2 py-1">
                                                    <div className="flex justify-center space-x-2">
                                                        <Link href={`/edit/categories/${res._id}`}>
                                                            <button className="bg-teal-600 text-white p-2 rounded-lg">
                                                                <GrEdit className="text-xl" />
                                                            </button>
                                                        </Link>
                                                        <button
                                                            className="bg-red-600 text-white p-2 rounded-lg"
                                                            onClick={() => removeCategory(res._id)}
                                                        >
                                                            <MdDeleteForever className="text-xl" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Design */}
                            <div className="md:hidden">
                                {data.map((res) => (
                                    <div
                                        key={res._id}
                                        className="border p-4 mb-2 rounded-lg bg-gray-200 text-gray-800 shadow-sm"
                                    >
                                        <h3 className="text-lg font-bold">{res.name}</h3>
                                        <p>ID: {res._id}</p>
                                        <p>Slug: {res.slug}</p>
                                        <div>
                                            <strong>Sous-Catégories:</strong>
                                            {res.sousCategories && res.sousCategories.length > 0 ? (
                                                <ul>
                                                    {res.sousCategories.map((el) => (
                                                        <li key={el._id}>{el.name}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                "vide"
                                            )}
                                        </div>
                                        <p>Créé le: {res.createdAt}</p>
                                        <p>Mis à jour le: {res.updatedAt}</p>
                                        <div className="mt-2">
                                            <Link href={`/edit/categories/${res._id}`}>
                                                <button className="bg-teal-600 text-white p-2 rounded-lg">
                                                    <GrEdit className="text-xl" />
                                                </button>
                                            </Link>
                                            <button
                                                className="bg-red-600 text-white p-2 rounded-lg ml-2"
                                                onClick={() => removeCategory(res._id)}
                                            >
                                                <MdDeleteForever className="text-xl" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-800">Aucune donnée disponible</p>
                    )}
                </div>
            </div>
        </div>
    );
}