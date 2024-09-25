"use client";
import { useAuth } from '@/app/_utils/AuthProvider';
import React, { useEffect, useState } from 'react';
import Taillesidemenu from '../taillesidemenu/Taillesidemenu';
import Formatsidemenu from '../formatsidemenu/Formatsidemenu';
import CategorySideMenu from '../categorysidemenu/Categorysidemenu';
import Souscategories from '../souscategories/Souscategories';
import ProductSideMenu from '../productsidemenu/Productsidemenu';
import Usersidemenu from '../usersidemenu/Usersidemenu';

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
                getData('https://poster-bhd-backend-production.up.railway.app/api/v1/tailles');
                break;
            case 'Format':
                getData('https://poster-bhd-backend-production.up.railway.app/api/v1/formats');
                break;
            case 'Categorie':
                    getData('text-https://poster-bhd-backend-production.up.railway.app/api/v1/categories');
                    break;
            case'Sous-Categories':
                     getData('text-https://poster-bhd-backend-production.up.railway.app/api/v1/subcategories');
                     break;
            case 'Produit': getData('text-https://poster-bhd-backend-production.up.railway.app/api/v1/products');
            break;
            case 'Utilisateurs' :  getData('text-https://poster-bhd-backend-production.up.railway.app/api/v1/users');
                break;
            default: getData('text-https://poster-bhd-backend-production.up.railway.app/api/v1/users');
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
            {!msg && <Usersidemenu datares={datares} msg={msg} />}

        </div>
    );
}