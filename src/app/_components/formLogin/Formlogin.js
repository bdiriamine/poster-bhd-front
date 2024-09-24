"use client"
import Link from 'next/link'
import React, {  useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_utils/AuthProvider';
import Loader from '../loader/loader';
export default function Formlogin() {
  const router = useRouter(); 
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login ,user,role,loading } = useAuth();
  useEffect(() => {
    if (user) {
      router.push('/profile'); // Rediriger vers la page de profil
    }
  }, [user, router]);
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:4000/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        console.log(data.data)
        if (!response.ok) {
          throw new Error(data.message || 'Une erreur est survenue');
        }
        login(data.data, data.token ,data.data.role); 
        toast.success('Bienvenu dans notre site Poster Tounsi *-* !', {
          position: "bottom-right",
          autoClose: 5000, // Durée avant fermeture automatique
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        router.push("/profile")
        // Rediriger ou effectuer d'autres actions après l'inscription réussie
      } catch (error) {
        console.log(error)
      toast.error(error.message.toString(),{
          position: "bottom-right",
          autoClose: 5000, // Durée avant fermeture automatique
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,

        })
      }
    };
    if (user) return null;
  return (
    <>
       {loading? <Loader /> : <>
     <form className=' bg-slate-50  mx-auto p-8 mt-10 md:w-[40%] md:h-[65vh] ' onSubmit={handleSubmit}>
        <div className=" flex flex-col space-y-2 text-sm">
            <p className="font-bold  md:text-3xl ">Registre</p>
            <p>Connectez-vous pour stocker en toute sécurité vos projets et photos.</p>
            <p><Link href="/register" className="  border-spacing-5 border-b-4 border-lime-700 text-sm md:text-lg" > Inscrivez-vous </Link>  si vous n'avez pas encore de compte.</p>
        </div>
        <div className='flex flex-col space-y-3 mt-2'>
            <label>Adresse email </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Mot de passe  </label>
                <input type="password" name="password"   value={formData.password} onChange={handleChange} required  />
                <Link href="/modepasseoublie" className=" hover:text-cyan-800"> Mot de passe oublie ?</Link>
                <button className='p-3 bg-lime-800 text-white  '>    Register </button>
            </div>
      </form>
      <div className=" text-center p-3">
            <p> <strong> NB :</strong> En vous connectant ou en créant un compte, vous acceptez nos conditions générales et notre politique de confidentialité . </p> 
      </div>
      </>}
    </>
  )
}
