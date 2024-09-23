import React from 'react'
import img from"../../../../public/assets/image/slide2.png"
import Image from 'next/image'
export default function Slides() {
  return (
    <div className=" md:container  md:mx-auto" >
      <Image src={img}    width={0} 
  height={0}
  sizes="100vw"
  style={{ width: '100%', height: 'auto' }}  alt="Slides" />
    </div>
  )
}
