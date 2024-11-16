"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_utils/AuthProvider";
import PanierPainture from "../panierPainture/panierPainture";
import PanierLivre from "../panierLivre/PanierLivre";
import Loader from "../../loader/loader";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function PanierForm() {
  const { token, user } = useAuth();
  const [panier, setPanier] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [propsData, setPropsData] = useState([]);
  const [noItem, setNoItem] = useState([]);
  const [msg, setMsg] = useState();
  const [commentaire, setCommentaire] = useState(null);

  // Helper functions
  const sendDataToProps = (panierData) => panierData.filter((item) => item.tailles);
  const sendDataNoTailles = (panierData) => panierData.filter((item) => !item.tailles);

  useEffect(() => {
    const fetchPanier = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/panier/user/${user?._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 500) {
          window.location.reload();
          throw new Error("Internal Server Error");
        }

        const data = await response.json();
        setPanier(data.data || []);
        setMsg(data.data?.tailles);
        setPropsData(sendDataToProps(data.data || []));
        setNoItem(sendDataNoTailles(data.data || []));
      } catch (error) {
        setCommentaire("No items in the cart");
        toast.error(" Panier vide "  );
      } finally {
        setIsLoading(false);
      }
    };

    if (user?._id && token) {
      fetchPanier();
    }
  }, [token, user?._id]);

  const handleDeletePanierItem = async (itemId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/panier/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Update the panier state to remove the deleted item
      setPanier((prevPanier) => {
        const updatedPanier = prevPanier.filter((item) => item._id !== itemId);
        setPropsData(sendDataToProps(updatedPanier));
        setNoItem(sendDataNoTailles(updatedPanier));
        return updatedPanier;
      });

      // Display success notification
      toast.success("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      // Display error notification
      toast.error("Error deleting item: " + error.message);
    }
  };

  const handleCommand = () => {
    localStorage.setItem("panier", JSON.stringify(panier));
    router.push("/detailes");
  };

  const handleQuantityChange = async (newQuantity, idPanier, imageFile = null) => {
    if (newQuantity < 1) return;

    const itemToUpdate = panier.find((item) => item._id === idPanier);
    if (!itemToUpdate) {
      console.error("Item not found in panier");
      return;
    }

    let pricePerUnit;

    if (itemToUpdate.tailles?.price) {
      pricePerUnit = itemToUpdate.tailles.price;
    } else {
      const originalPrice = itemToUpdate.product.price;
      const discountPercentage = itemToUpdate.product.promotions?.discountPercentage || 0;
      const discountAmount = (originalPrice * discountPercentage) / 100;
      pricePerUnit = originalPrice - discountAmount;
    }

    const updatedTotalPrice = newQuantity * pricePerUnit;

    try {
      const formData = new FormData();
      formData.append("quantite", newQuantity);
      formData.append("totalPrice", updatedTotalPrice);

      if (imageFile) {
        formData.append("images", imageFile);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/panier/${idPanier}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      setPanier((prevPanier) =>
        prevPanier.map((item) =>
          item._id === idPanier ? { ...item, quantite: newQuantity, totalPrice: updatedTotalPrice } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Display error notification
      toast.error("Error updating quantity: " + error.message);
    }
  };

  const totalPanierPrice = panier.reduce((acc, item) => {
    let pricePerUnit = item.tailles?.price || item.product.discountedPrice || item.product.price;
    const itemTotalPrice = (item.quantite || 1) * pricePerUnit;
    return acc + itemTotalPrice;
  }, 0) + 7; // Adding delivery fee

  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);

  if (isLoading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  if (panier.length === 0) {
    return (
      <div className="container mx-auto my-10 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center text-gray-500 py-5">No items in the cart</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-8 bg-white rounded-lg shadow-lg">
      {propsData.length > 0 && (
        <PanierPainture
          panier={propsData}
          handleQuantityChange={handleQuantityChange}
          handleDeletePanierItem={handleDeletePanierItem}
          handleCommand={handleCommand}
          totalPanierPrice={totalPanierPrice}
        />
      )}
      {noItem.length > 0 && (
        <PanierLivre
          panier={noItem}
          handleQuantityChange={handleQuantityChange}
          handleDeletePanierItem={handleDeletePanierItem}
          handleCommand={handleCommand}
          totalPanierPrice={totalPanierPrice}
          pricePerUnitdata={noItem.map((item) => {
            const discountedPrice = item.product.discountedPrice || item.product.price;
            return discountedPrice;
          })}
        />
      )}
      <div className="text-center text-gray-500 py-5">{commentaire}</div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Total: {totalPanierPrice} DT</h3>
        <p>Estimated Delivery: {estimatedDeliveryDate.toDateString()}</p>
        <p>Frais de livraison: 7 DT</p>
        <button
          onClick={handleCommand}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}