"use client";
import { useAuth } from '@/app/_utils/AuthProvider';
import React, { useEffect, useState } from 'react';
import Taillesidemenu from '../taillesidemenu/Taillesidemenu';
import Formatsidemenu from '../formatsidemenu/Formatsidemenu';
import CategorySideMenu from '../categorysidemenu/Categorysidemenu';

export default function Contenusidemenu({ msg }) {
    const [datares, setDatares] = useState([]); // Initialize with an empty array
    const { user, token } = useAuth();

    const getData = async (url) => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Une erreur est survenue');
            }

            const data = await response.json();
            setDatares(data.data); // Update state with the fetched data
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        switch (msg) {
            case 'Taille':
                getData('http://localhost:4000/api/v1/tailles');
                break;
            case 'Format':
                getData('http://localhost:4000/api/v1/formats');
                break;
            case 'Categorie':
                    getData('http://localhost:4000/api/v1/categories');
                    break;
                
            default:
                break;
        }
    }, [msg]);

    return (
        <div>
            {msg === 'Taille' && <Taillesidemenu datares={datares} msg={msg} />}
            {msg === 'Format' && <Formatsidemenu datares={datares}  msg={msg}/>}
            {msg === 'Categorie' && <CategorySideMenu datares={datares}  msg={msg}/>}
    

        </div>
    );
}