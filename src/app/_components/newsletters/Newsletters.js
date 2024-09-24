"use client"
import React, { useState } from 'react'

export default function Newsletters() {
    const [email,setEmail] = useState()
    const  handlSubmit =(e)=>{
     e.preventDefault();
    }
   return (
     <div className="mt-4">
         <form  onSubmit={handlSubmit} >
            <div className=" flex  flex-col  py-4   md:space-x-6 space-y-2 md:flex-row md:space-y-0 justify-center bg-slate-200 items-center">
              <label className="text-">Inscrivez-vous à notre newsletter !</label>
              <input type="email" placeholder='  email' onChange={(e)=>{setEmail(e.target.value)}}  className="h-12 rounded-md" />
              <button className="border rounded-lg h-12 px-3  border-cyan-800" > S'abonner </button>
            </div>
         </form>
     </div>
   )
 }
