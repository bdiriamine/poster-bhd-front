"use client";
import { useAuth } from '@/app/_utils/AuthProvider';
import React, { useEffect, useState } from 'react';
import Taillesidemenu from '../taillesidemenu/Taillesidemenu';
import Formatsidemenu from '../formatsidemenu/Formatsidemenu';
import CategorySideMenu from '../categorysidemenu/Categorysidemenu';
import Souscategories from '../souscategories/Souscategories';
import ProductSideMenu from '../productsidemenu/Productsidemenu';
import Usersidemenu from '../usersidemenu/Usersidemenu';
import PromotionSideMenu from '../promotionsidemenu/promotionssidemenu';

export default function Contenusidemenu({ msg }) {
    const [datares, setDatares] = useState([]); // Initialize with an empty array
    const { user, token } = useAuth();

    const getData = async (url) => {
        try {
            console.log(token)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                 credentials: 'include'
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
                getData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tailles`);
                break;
            case 'Format':
                getData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/formats`);
                break;
            case 'Categorie':
                    getData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`);
                    break;
            case'Sous-Categories':
                     getData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories`);
                     break;
            case 'Produit': getData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
            break;
            case 'Utilisateurs' :  getData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users`);
                break;
            case'Promotion': getData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/promotions`);
            break;
            default: getData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users`);
                break;
        }
    }, [msg]);

    return (
        <div>
            {msg === 'Taille' && <Taillesidemenu datares={datares} msg={msg} />}
            {msg === 'Format' && <Formatsidemenu datares={datares}  msg={msg}/>}
            {msg === 'Categorie' && <CategorySideMenu datares={datares}  msg={msg}/>}
            {msg === 'Sous-Categories' && <Souscategories datares={datares}  msg={msg}/>}
            {msg === 'Produit' && <ProductSideMenu datares={datares}  msg={msg}/>}
            {msg === 'Utilisateurs' && <Usersidemenu datares={datares} />}
            {msg === 'Promotion' && <PromotionSideMenu datares={datares} />}
            {!msg && <Usersidemenu datares={datares} msg={msg} />}

        </div>
    );
}