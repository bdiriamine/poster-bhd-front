"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LivreProduit = () => {
  const [livres, setLivres] = useState([]);
  const [livresFiltres, setLivresFiltres] = useState([]);
  const [tailleSelectionnee, setTailleSelectionnee] = useState("Toutes");
  const router = useRouter();

  useEffect(() => {
    const recupererLivres = async () => {
      try {
        const reponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/livrephotos`);
        const donnees = await reponse.json();
        setLivres(donnees.data);
      } catch (erreur) {
        console.error("Erreur lors de la récupération des livres :", erreur);
      }
    };

    recupererLivres();
  }, []);

  useEffect(() => {
    if (tailleSelectionnee === "Toutes") {
      setLivresFiltres(livres);
    } else {
      const filtres = livres.filter((livre) => livre.size === tailleSelectionnee);
      setLivresFiltres(filtres);
    }
  }, [tailleSelectionnee, livres]);

  const handleChangementTaille = (taille) => {
    setTailleSelectionnee(taille);
  };

  const handleTelechargementPhotos = (nombresPhotos, idLivre) => {
    localStorage.setItem('nombres', nombresPhotos);
    localStorage.setItem('produits', idLivre);
    localStorage.setItem('type', "livrephotos");
    router.push(`/multiDetailes`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Section de filtrage */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-3">Filtrer par Taille</h2>
        <div className="flex gap-2">
          {["Toutes", "S", "M", "L", "XL"].map((taille) => (
            <button
              key={taille}
              className={`px-3 py-1 rounded-md text-sm transition-all ${
                tailleSelectionnee === taille
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-indigo-500 hover:text-white`}
              onClick={() => handleChangementTaille(taille)}
            >
              {taille}
            </button>
          ))}
        </div>
      </div>

      {/* Afficher la liste des livres filtrés */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {livresFiltres.length > 0 ? (
          livresFiltres.map((livre) => (
            <div
              key={livre._id}
              className="relative bg-white p-4 shadow-lg rounded-lg hover:shadow-2xl transition-all"
            >
              <div className="relative">
                <img
                  src={livre.imageCover}
                  alt={livre.name}
                  className="w-full h-36 object-cover mb-2 rounded-lg"
                />
                {livre.promotions && livre.promotions.discountPercentage && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                    {livre.promotions.discountPercentage}%
                  </div>
                )}
              </div>

              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {livre.name} {livre?.formats[0]?.type}
              </h3>
              <p className="text-gray-500 text-xs mb-2">
                {livre.description.substring(0, 80)}...
              </p>
              <p className="text-gray-800 text-xs mb-1">
                <span className="font-semibold">Taille :</span> {livre.size} | {livre.numberOfPhotos} photos
              </p>
              <p className="text-sm text-indigo-600 font-bold mb-1">
                ${livre.priceAfterDiscount || livre.price}
              </p>          
              {livre.formats && (
                <div className="mt-2">
                  <h4 className="font-semibold text-gray-800 text-xs mb-1">Formats :</h4>
                  {livre.formats.map((format) => (
                    <div key={format._id} className="mb-1">
                      <p className="text-gray-600 text-xs">
                        Type : {format.type}
                      </p>
                      {format.tailles && (
                        <div className="ml-2">
                          {format.tailles.map((taille) => (
                            <p key={taille._id} className="text-gray-500 text-xs">
                              {taille.width}x{taille.height} {taille.unit}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Bouton pour télécharger les photos */}
              <button
                onClick={() => handleTelechargementPhotos(livre.numberOfPhotos, livre._id)}
                className="block mt-2 px-3 py-1 text-center bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-all"
              >
                Télécharger Photos
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm">Aucun livre disponible pour la taille sélectionnée.</p>
        )}
      </div>
    </div>
  );
};

export default LivreProduit;
