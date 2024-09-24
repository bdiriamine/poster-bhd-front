import React from 'react'
import styles from  "./header.module.css"

import Navmobile from '../navmobile/Navmobile';
import Navweb from '../navweb/Navweb';
export default function Header() {
  return (
    <div className="bg-orange-600 text-white">
          <div className="hidden md:flex md:flex-wrap md:items-center  md:justify-end ">
             <Navweb  />  
          </div>
          <div className="flex md:hidden">
             <Navmobile  />
          </div>
        
           
      

    </div>
  )
}

