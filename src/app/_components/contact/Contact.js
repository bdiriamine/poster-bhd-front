"use client";
import { useState } from "react";
import img from "../../../../public/assets/image/livre-photos-gratuit-4.jpg";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(`${process.env.next_public_base_url}/api/v1/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("Merci de nous avoir contactés !");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Échec de l'envoi de votre message.");
      }
    } catch (error) {
      setStatus("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${img.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full max-w-4xl">
        {/* Superposition */}
        <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
        <div className="relative bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-xl space-y-8">
          <h2 className="text-4xl font-bold text-gray-800 text-center">
            Contactez-nous
          </h2>
          {status && <p className="text-center text-sm text-red-600">{status}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Votre email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Votre message"
                rows={6}
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
              >
                Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
