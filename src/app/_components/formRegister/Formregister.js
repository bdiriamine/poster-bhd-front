"use client"
import Link from 'next/link'
import React, {  useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../_utils/AuthProvider';
import Loader from '../loader/loader';
export default function Formregister() {
    const router = useRouter(); 
    const [formData, setFormData] = useState({ name: '', email: '', password: '',passwordConfirm:'' });
    const [errors, setErrors] = useState({});

    const { login ,user,loading } = useAuth();
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
          const response = await fetch('text-https://poster-bhd-backend-production.up.railway.app/api/v1/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();

          if (!response.ok) {
            setErrors(data.errors.map(err => err.msg).join(', '));
            // toast.error(data.errors.map(err => err.msg).join(', ') || 'Une erreur est survenue')
            throw new Error(data.errors.map(err => err.msg).join(', ') || 'Une erreur est survenue');
         
          }
          localStorage.setItem('token',data.token);    
          localStorage.setItem('user', JSON.stringify(data?.data) );
          login({ name: formData.name, email: formData.email }, data.token); // Mettre à jour l'état d'authentification
          toast.success('Inscription réussie !', {
            position: "bottom-right",
            autoClose: 5000, // Durée avant fermeture automatique
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          router.push("/profile")
          // Rediriger ou effectuer d'autres actions après l'inscription réussie
        } catch (error) {
        setErrors([  error.message.toString() ]);
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
        <div>
          {loading? <Loader /> : <>
            <form className=' bg-slate-50  mx-auto p-8 mt-10 md:w-[40%] md:h-[65vh] ' onSubmit={handleSubmit}>
                   <div className=" flex flex-col space-y-2 text-sm">
                       <p className="font-bold  md:text-3xl ">Créer un compte</p>
                       <p>Inscrivez-vous pour stocker en toute sécurité vos projets et photos.</p>
                       <p><Link href="/login" className="  border-spacing-5 border-b-4 border-lime-700 text-sm md:text-lg" > Connectez-vous </Link>   si vous avez déjà un compte.</p>
                   </div>
                   <div className='flex flex-col space-y-3 mt-2'>
                           <label>Nom d'utilisateur </label>
                           <input type="text" name="name"   value={formData.name} onChange={handleChange} required/>
                           <label>email </label>
                           <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                           <label>Mot de passe  </label>
                           <input type="password" name="password"   value={formData.password} onChange={handleChange} required />
                           <label>Confirmez le mot de passe </label>
                           <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} required />
                           <Link href="/modepasseoublie" className=" hover:text-cyan-800"> Mot de passe oublie ?</Link>
                           <button className='p-3 bg-lime-800 text-white  '>    Créer un compte </button>
                       </div>
                 </form>
                 <div className=" text-center p-3">
                       <p> <strong> NB :</strong> En vous connectant ou en créant un compte, vous acceptez nos conditions générales et notre politique de confidentialité . </p> 
                 </div>
          </>

          }

        </div>
      )
    }
    
