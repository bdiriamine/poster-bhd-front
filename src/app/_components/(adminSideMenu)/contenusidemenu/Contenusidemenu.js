"use client";
import React from 'react';
import Taillesidemenu from '../taillesidemenu/Taillesidemenu';
import Formatsidemenu from '../formatsidemenu/Formatsidemenu';
import CategorySideMenu from '../categorysidemenu/Categorysidemenu';
import Souscategories from '../souscategories/Souscategories';
import ProductSideMenu from '../productsidemenu/Productsidemenu';
import Usersidemenu from '../usersidemenu/Usersidemenu';
import PromotionSideMenu from '../promotionsidemenu/promotionssidemenu';
import LivreSideMenu from '../livreSideMenu/livreSideMenu';
import CalendrierSideMenu from '../calendrierSideMenu/calendrierSideMenu';
import CadeauxSidemenu from '../cadeauxSidemenu/cadeauxSidemenu';
import CarteSidemenu from '../carteSidemenu/carteSidemenu';
import TiragePhoto from '../TiragePhoto/TiragePhoto';
import CommandeSideMenu from '../CommandeSideMenu/CommandeSideMenu';

export default function Contenusidemenu({ msg }) {
    return (
        <div>
            {msg === 'Taille' && <Taillesidemenu  msg={msg} />}
            {msg === 'Format' && <Formatsidemenu   msg={msg}/>}
            {msg === 'Categorie' && <CategorySideMenu   msg={msg}/>}
            {msg === 'Sous-Categories' && <Souscategories   msg={msg}/>}
            {msg === 'Produit' && <ProductSideMenu   msg={msg}/>}
            {msg === 'Carte' && <CarteSidemenu  />}
            {msg === 'Livre' && <LivreSideMenu  />}
            {msg === 'Calendrier' && <CalendrierSideMenu  />}
            {msg === 'Cadeaux' && < CadeauxSidemenu  />}
            {msg === 'Utilisateurs' && <Usersidemenu  />}
            {msg === 'Promotion' && <PromotionSideMenu  />}
            {msg === 'TiragePhoto' && <TiragePhoto />}
            {msg === 'Commande' && <CommandeSideMenu  />}
        </div>
    );
}