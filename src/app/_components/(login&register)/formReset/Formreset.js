"use client"
import Link from 'next/link'
import React, {  useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_utils/AuthProvider';
import Loader from '../../loader/loader';
export default function Formreset() {
    const router = useRouter(); 
    const [formData, setFormData] = useState({ resetCode: ''});
    const [errors, setErrors] = useState({});
    const { login ,user,loading } = useAuth();
    useEffect(() => {
      if (user) {
        router.push('/'); 
      }
    }, [user, router]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
          });
    
          const data = await response.json();
          console.log(data.data)
          if (!response.ok) {
            setErrors(data.message);
            throw new Error(data.message || 'Une erreur est survenue');
         
          }
          toast.success('votre est correct ,vous pouvez modifier votre mot de passe', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          router.push("/modepasseoublie/resetcode/nouveaumdp")
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
    return (
      <>
         {loading? <Loader /> : <>
       <form className=' bg-slate-50  mx-auto p-8 mt-10 md:w-[40%] md:h-[45vh]' onSubmit={handleSubmit}>
          <div className=" flex flex-col space-y-2 text-sm">
              <p className="font-bold  md:text-3xl ">Code de réinitialisation :</p>
              <p>Merci de consulter votre boîte mail. Vous recevrez un code de réinitialisation valable pendant 10 minutes.</p>
          </div>
          <div className='flex flex-col space-y-3 mt-2'>
              <label>Code :  </label>
                  <input type="text" name="resetCode" value={formData.resetCode} onChange={handleChange} required />
                  <button className='p-3 bg-lime-800 text-white  '>    Réinitialiser le Mot de Passe </button>
              </div>
        </form>
        <div className=" text-center p-3">
              <p> <strong> NB :</strong> En vous connectant ou en créant un compte, vous acceptez nos conditions générales et notre politique de confidentialité . </p> 
        </div>
        </>}
      </>
    )
}
