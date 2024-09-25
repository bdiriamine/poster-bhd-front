import styles from  "./loader.module.css"
import React from 'react'

export default function Loader() {
  return (
    <div className={styles.container}>
            <div className= {styles.loader}>
            <span className= {styles.span}>L</span>
            <span className= {styles.span}>O</span>
            <span className= {styles.span}>A</span>
            <span className= {styles.span}>D</span>
            <span className= {styles.span}>I</span>
            <span className= {styles.span}>N</span>
            <span className= {styles.span}>G</span>
            
            <div className= {styles.covers} >
                <span className= {styles.span}></span>
                <span className= {styles.span}></span>
                <span className= {styles.span}></span>
                <span className= {styles.span}></span>
                <span className= {styles.span}></span>
                <span className= {styles.span}></span>
                <span className= {styles.span}></span>
            </div>
            </div>
    </div>

)
};

