import React from 'react'
import Image from 'next/image'
export default function Slides({setimage}) {
  return (
    <div className=" md:container  md:mx-auto" >
      <Image src={setimage}    width={0} 
  height={0}
  sizes="100vw"
  style={{ width: '100%', height: 'auto' }}  alt="Slides"   className="object-cover w-full h-full"  />
    </div>
  )
}
