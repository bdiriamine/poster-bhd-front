"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_utils/AuthProvider';
import Loader from '../../loader/loader';

export default function Formlogin() {
  const router = useRouter(); 
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, user, loading, setLoading } = useAuth(); // Ensure `setLoading` is available
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/profile'); // Redirect to profile page if already logged in
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loader on submit

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();

      // Check if status is false before proceeding
      if (data.data.status === false) {
        throw new Error('Vous ne pouvez pas vous connecter, veuillez nous contacter');
      }

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      login(data.data, data.token, data.data.role);
      toast.success('Bienvenue chez Poster BHD !', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      router.push("/profile");
    } catch (error) {
      toast.error("Identifiant Incorrect", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setIsSubmitting(false); // Hide loader after response
    }
  };

  if (loading || isSubmitting) return <Loader />; // Show loader if loading or form is submitting

  return (
    <>
      <form className="bg-slate-50 mx-auto p-8 mt-10 md:w-[40%] md:h-[65vh]" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 text-sm">
          <p className="font-bold md:text-3xl">Connexion</p>
          <p>Connectez-vous pour stocker vos projets et photos en toute sécurité.</p>
          <p>
            <Link href="/register" className="border-b-4 border-lime-700 text-sm md:text-lg">
            Inscrivez-vous
            </Link> si vous n'avez pas de compte.
          </p>
        </div>
        <div className="flex flex-col space-y-3 mt-2">
          <label>Adresse Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Mot de Passe</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <Link href="/modepasseoublie" className="hover:text-cyan-800">
          Mot de passe oublié?
          </Link>
          <button type="submit" className="p-3 bg-lime-800 text-white">
          Connexion
          </button>
        </div>
      </form>
      <div className="text-center p-3">
        <p>
        <strong>Note:</strong> En vous connectant ou en créant un compte, vous acceptez nos conditions et notre politique de confidentialité.
        </p>
      </div>
    </>
  );
}