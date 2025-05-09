import React from 'react'
import styles from "./Bookings.module.css";
import Accept from './components/Accept.svg'
import Reject from './components/Reject.svg'
import M1 from './components/M1.jpeg'
import M2 from './components/M2.jpeg'
import M3 from './components/M3.jpeg'
import M4 from './components/M4.jpeg'
import M5 from './components/M5.jpeg'
import M6 from './components/M6.jpeg'
import M7 from './components/M7.jpeg'

import F1 from './components/F1.jpeg'
import F2 from './components/F2.jpeg'
import F3 from './components/F3.jpeg'
import F4 from './components/F4.jpeg'
import F5 from './components/F5.jpeg'
import F6 from './components/F6.jpeg'
import F7 from './components/F7.jpeg'
import axios from 'axios'
import { useRef} from 'react';

function Plist({item,setShowParticipants,activeIndex}) {
 
     let M = [M1,M2,M3,M4,M5,M6,M7]
      let F = [F1,F2,F3,F4,F5,F6,F7]
    
      function getImg(gend, arr) {
        let randomValue = "";
        let randomIndex = arr[0];
      
        arr[0] = (arr[0] + 1) % 7; // Update arr[0] correctly
      
        if (gend === "Male") {
          randomValue = M[randomIndex];
        } else {
          randomValue = F[randomIndex];
        }
        return randomValue;
      }

      const plistRef = useRef(null); 

      
    

    

  return (
    <div ref={plistRef} className={styles.plist}>
        <div className={styles.top}> 
         <p> Participants <span style={{color:'#B6B6B6'}}>  ({`${item.participants.length}` })</span></p>
         {(activeIndex == 1 || activeIndex == 2)? (<button style={{backgroundColor : '#00C35F'}} className={styles.AR}><img onClick={async()=>{
            item.status = "accepted"
            // go to the backend and set status
            try{
               
                let request = await axios.put(`https://meetingsbackend.onrender.com/user/setStatus/${item._id}`,{status : "accepted"},{withCredentials : true})
                setShowParticipants(false)
            }
            catch(err)
            {
                
            }
         }} src={Accept}/> Accept </button>) : ""}
         {(activeIndex == 0 || activeIndex == 1)?(<button style={{backgroundColor : "#ED0000"}} className={styles.AR}><img onClick={async()=>{
            // go to the backend and set the status
            item.status = "rejected"
            try{
             
                let request = await axios.put(`https://meetingsbackend.onrender.com/user/setStatus/${item._id}`,{status : "rejected"},{withCredentials : true})
                setShowParticipants(false)
            }
            catch(err)
            {
               
            }
         }} src={Reject}/> Reject </button>):""}
         </div> 
         <div className={styles.down}>
         {
        (() => {
          let i = [0];
          let j = [0];
          
          return item.members.map((entry) => {
         
            return (
              <div className={styles.det} key={entry.username}>
                <div className={styles.img}>
                  <img src={entry.gender=="Male" ? getImg(entry.gender,i) : getImg(entry.gender,j)} />
                </div>
                <p>{`${entry.firstname} ${entry.lastname}`}</p>
              </div>
            );
          });
        })()
      }
            
      
         </div> 
       </div>
  )
}

export default Plist