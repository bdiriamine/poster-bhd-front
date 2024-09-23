import Formlogin from '@/app/components/formLogin/Formlogin'
import React from 'react'

export default function login() {
  
  return (
    <div className="flex flex-col bg-slate-300 border-2 rounded-md w-[100%] md:h-[70vh] space-y-6  ">
       
        <Formlogin />
    </div>
  )
}
