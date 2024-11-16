"use client";  
import { toast } from "react-toastify"; // Import toast from react-toastify
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/_utils/AuthProvider';
import { FaMapMarkerAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const Command = () => {
  const router = useRouter(); 
  const { user, token } = useAuth();
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    details: '',
    ville: '',
    codePostal: '',
    telephone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Espèces');
  const [panier, setPanier] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const prixTaxe = 7;

  useEffect(() => {
    const fetchPanier = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/panier/user/${user?._id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du panier.');
        }

        const data = await response.json();
        setPanier(data.data);
        calculateTotalPrice(data.data);
      } catch (error) {
        console.error('Error fetching panier:', error);
        toast.error('Erreur lors de la récupération du panier.'); // Add toast notification for error
        router.push('/')
      }
    };

    if (user?._id) {
      fetchPanier();
    }
  }, [user, token]);

  const calculateTotalPrice = (panierItems) => {
    const total = panierItems.reduce((acc, item) => acc + item.totalPrice, 0);
    const totalWithTax = total + prixTaxe; // Add tax to total price
    setTotalPrice(totalWithTax);
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Function to generate a unique tracking code with date
  const generateUniqueTrackingCode = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, ''); // Format: YYYYMMDD
    const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Generate a random alphanumeric string of length 6
    return `TRK-${formattedDate}-${randomString}`; // Combine date and random string
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commandeData = {
      etatLivraison: 'En attente',
      prixTotal: totalPrice,
      utilisateur: user._id,
      typeMethodePaiement: paymentMethod,
      adresseLivraison: shippingAddress,
      panier: panier.map(item => ({
        product: item.product._id,
        tailles: item?.tailles?._id || null, // Set to null if tailles is undefined
        quantite: item.quantite,
        totalPrice: item.totalPrice,
        images: item.images,
      })),
      codeSuivi: generateUniqueTrackingCode(),
    };
  
    try {
      // Submit the order
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/command`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commandeData),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la soumission de la commande.');
      }
  
      // After successful order submission, delete all panier items
      await Promise.all(panier.map(item => 
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/panier/${item._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      ));
  
      toast.success('Commande confirmée avec succès et panier vidé !'); // Success toast notification
      router.push('/')
      // Optionally, reset the state or redirect the user
    } catch (error) {
      console.error('Error submitting commande:', error);
      toast.error('Une erreur est survenue lors de la confirmation de la commande.'); // Error toast notification
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Step Indicator */}
      <div className="flex justify-between space-x-1 mb-4">
  {['Adresse de Livraison', 'Méthode de Paiement', 'Confirmation'].map((title, index) => (
    <div
      key={index}
      className={`flex flex-col items-center w-1/3 py-2 rounded-lg border shadow-md transition duration-300 transform hover:scale-105 ${
        step === index + 1
          ? 'bg-blue-500 text-white border-blue-700'
          : step > index + 1
          ? 'bg-green-200 text-gray-700 border-green-400'
          : 'bg-gray-100 text-gray-600 border-gray-300'
      }`}
    >
      <div className="flex items-center mb-1">
        {index === 0 && <FaMapMarkerAlt className="text-lg" />}
        {index === 1 && <FaCreditCard className="text-lg" />}
        {index === 2 && <FaCheckCircle className="text-lg" />}
      </div>
      <h4 className="font-bold text-sm text-center">{`Étape ${index + 1}`}</h4>
      <p className="text-xs text-center">{title}</p>
    </div>
  ))}
</div>

      {step === 1 && (
        <form onSubmit={nextStep} className="border p-4 rounded-lg shadow-md bg-white transition-transform duration-300 hover:shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Étape 1: Adresse de Livraison</h3>
          <div className="mb-2">
            <label className="block text-sm font-medium">Détails de l'adresse</label>
            <input
              type="text"
              value={shippingAddress.details}
              onChange={(e) => setShippingAddress({ ...shippingAddress, details: e.target.value })}
              className="mt-1 p-2 border rounded w-full shadow focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Ville</label>
            <input
              type="text"
              value={shippingAddress.ville}
              onChange={(e) => setShippingAddress({ ...shippingAddress, ville: e.target.value })}
              className="mt-1 p-2 border rounded w-full shadow focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Code Postal</label>
            <input
              type="text"
              value={shippingAddress.codePostal}
              onChange={(e) => setShippingAddress({ ...shippingAddress, codePostal: e.target.value })}
              className="mt-1 p-2 border rounded w-full shadow focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Téléphone</label>
            <input
              type="text"
              value={shippingAddress.telephone}
              onChange={(e) => setShippingAddress({ ...shippingAddress, telephone: e.target.value })}
              className="mt-1 p-2 border rounded w-full shadow focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Suivant
          </button>
        </form>
      )}

      {/* Step 2: Payment Method */}
      {step === 2 && (
        <div className="border p-4 rounded-lg shadow-md bg-white transition-transform duration-300 hover:shadow-lg text">
          <h3 className="text-lg font-semibold mb-2 tex">Étape 2:</h3>
          <div className="mb-2">
            <label className="block text-sm font-medium text">Méthode de Paiement</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1 p-2 border rounded w-full shadow focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="Espèces">Espèces</option>
              <option value="Carte Bancaire">Carte Bancaire</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Précédent
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="border p-4 rounded-lg shadow-md bg-white transition-transform duration-300 hover:shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Étape 3: Confirmation</h3>
          <div>
            <h4 className="font-semibold">Adresse de Livraison</h4>
            <p>{shippingAddress.details}</p>
            <p>{shippingAddress.ville}</p>
            <p>{shippingAddress.codePostal}</p>
            <p>{shippingAddress.telephone}</p>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Méthode de Paiement</h4>
            <p>{paymentMethod}</p>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Produits dans votre Panier</h4>
            {panier.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Image src={item.product.imageCover} alt={item.product.name} width={50} height={50} className="mr-2" />
                  <p>{item.product.name}</p>
                </div>
                <p>{item.totalPrice} TND</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Prix Total (Taxe incluse)</h4>
            <p>{totalPrice} TND</p>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Confirmer la Commande
          </button>
        </div>
      )}
    </div>
  );
};

export default Command;