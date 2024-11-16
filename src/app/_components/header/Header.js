import React from 'react'
import styles from  "./header.module.css"

import Navmobile from '../navmobile/Navmobile';
import Navweb from '../navweb/Navweb';
export default function Header() {
  return (
    <div className=" bg-gradient-to-r bg-cyan-700 md:from-[#4A90F1] to-[#44D5FB] text-white">
          <div className="hidden md:flex md:flex-wrap md:items-center  md:justify-end ">
             <Navweb  />  
          </div>
          <div className="flex md:hidden">
             <Navmobile  />
          </div>
        
           
      

    </div>
  )
}

