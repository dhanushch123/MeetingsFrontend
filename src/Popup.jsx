import React from 'react'
import styles from './Eventlist.module.css'
import Check from './components/Check.svg'
import Danger from './components/Danger.svg'


let obj = {
  Check : Check,
  Danger : Danger
}


function Popup({setSuccess,success}) {
  // we will have object image : Danger , msg and color 
  return ( <div style={{backgroundColor : success.color}} className={styles.popup}> 
            <div className={styles.one}> <img src={obj[success.img]}/> <p>  {success.msg} </p></div>  
            <div className={styles.two}> <p> | </p> <button style={{backgroundColor : success.color}} onClick={()=>{
              setSuccess(null)
              // we will make the object empty or null
            }} className={styles.btn}> x </button> </div>  
          </div>)


    
  
}

export default Popup