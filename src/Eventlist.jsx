import React from 'react'
import styles from './Eventlist.module.css'

import { useState,useEffect } from 'react'
import axios from 'axios'
import Eb from './components/Eb.svg'
import Togblue from './components/Togblue.svg'
import Togblack from './components/Togblack.svg'
import Copy from './components/Copy.svg'
import Delete from './components/Delete.svg'
import Edit1 from './Edit1'
import Popup from './Popup'
import Exclam from './components/Exclam.svg'





function Eventlist({success,setSuccess,user,isMobile,setActiveComponent}) {
    
    const[arr,setArr] = useState([])
    const[edit,setEdit] = useState(false)
    const[component,setComponent] = useState({})
    
   
    async function fetchDetails(){
        try{
            
            let request = await axios.get('http://localhost:2500/event/getEvents',{withCredentials : true})
            setArr(request.data.events)
           
            
        }
        catch(err)
        {
            
        }
    }
    function end(t1, t2, meridian1) {
        let [h1, m1] = t1.split(":").map(Number);
        let h2 = Math.floor(t2); 
        let m2 = (t2 % 1) > 0 ? 30 : 0; 
    
        let totalMinutes = m1 + m2;
        let extraHours = Math.floor(totalMinutes / 60);
        let finalMinutes = totalMinutes % 60;
    
        let finalHours = h1 + h2 + extraHours;
        let meridian = meridian1[0] + meridian1[1].toLowerCase()
    
       
        if (finalHours >= 12) {
            if (finalHours > 12) finalHours -= 12;
            meridian = meridian === "AM" ? "PM" : "AM";
        }
    
        return `${t1} ${meridian} - ${finalHours}:${finalMinutes.toString().padStart(2, '0')} ${meridian}`;
    }
    useEffect(()=>{
        fetchDetails()
    },[success])
  return !edit ? (
    <div className={isMobile? `${styles.containers}` : `${styles.container}`}> 
    {!isMobile ? (<>
        <div className={styles.up}>
        <p className={styles.first}> Event Types </p>
        <p className={styles.second}>Create events to share for people to book on your calendar.</p>
        </div>

        {success ? (<Popup setSuccess = {setSuccess} success={success}/>) : ""}

        <div className={styles.grid}> 
        {arr.map((item,index)=>{
                   return(<div id = {item.isConflict ? `${styles.conBox}` : `${styles.xyz12}`} key={item._id} className={styles.box}>
                    <div style={{backgroundColor : item.isActive?"#1877F2":"#676767"}} className={styles.top}> </div>
                    <div className={styles.down}>
                        {item.isConflict? (<div className={styles.conflict}>
                            <img 
            src={Exclam}/> <div> Conflict of timing </div> 
                             </div>) : ""}
                        <div  className={styles.head}> 
                            <p> {item.meetingname} </p>
                            <img onClick={()=>{
                                // we must ensure only owner of the event can edit
                                
                                if(item.owner.toString() == user.id.toString())
                                {
                                    setEdit(true)
                                    setComponent(item)
                                }
                                else
                                {
                                    setSuccess({
                                        img : "Danger",
                                        msg : "Only owner can update",
                                        color : "#FF003D"
                                    })
                                }
                            }} src={Eb}/>
                        </div>
                        <div  className={styles.dt}>
                           <p> {`${item.day},${item.date[8]+item.date[9]} ${item.month}`} </p> 
                        </div>
                        <div className={styles.t}> {`${end(item.time,item.duration,item.meridian)}`} </div>
                        <p   className={styles.duration}> {`${item.duration}hr,Group meeting` } </p>
        
                        
                    </div>
                    <div  className={styles.line}> </div>
                    <div  className={styles.dwn}> <img onClick={async ()=>{
                        
                        try{
                            let request = await axios.put(`http://localhost:2500/event/status/${item._id}`,{},{withCredentials : true})
                            
                            setArr(prevArr => {
                                const newArr = [...prevArr]; // Copy array
                                newArr[index] = { ...newArr[index], isActive: !newArr[index].isActive }; 
                                return newArr;
                            });
                        }
                        catch(err)
                        {

                        }
                    }} src={item.isActive ? Togblue:Togblack}/> 
                     <img onClick={async()=>{
                        await navigator.clipboard.writeText(`Meeting Link : ${item.elink}
                                                             Password : ${item.password}`)
                        setSuccess({
                            img : "Check",
                            msg : "Copied to clipboard",
                            color : "#05A763"
                          })
                     }} src={Copy}/> <img onClick={async()=>{
                       
                        try{
                            let request = await axios.delete(`http://localhost:2500/event/remove/${item._id}`,{withCredentials : true})
                            if (request.status === 200) { // Check if deletion was successful
                                setArr(prevArr => prevArr.filter(event => event._id !== item._id)); // Remove from past events
                                
                            }
                            
                        }
                        catch(err)
                        {
                            
                        }
                     }} src={Delete}/>
                    </div>
                    
                </div>)
        })}
        </div>
    </>) :
     //   ****** Mobile View ******
    (<>
        <div className={styles.up}>
        <p className={styles.first}> Event Types <button onClick={()=>{
          setActiveComponent("Create")
        }} className={styles.newEve}> <span>+</span> Add New Event </button> </p>
        <p className={styles.second}>Create events to share for people to book on your calendar.</p>
        </div>

        {success ? (<Popup setSuccess = {setSuccess} success={success}/>) : ""}

        <div className={styles.test}> 
        {arr.map((item,index)=>{
                return(<div key={item._id} id= {item.isConflict ? `${styles.conflictBox}` : "x12234"} className={`${styles.boxes}`}>
                    <div style={{backgroundColor : item.isActive?"#1877F2":"#676767"}} className={styles.top}> </div>
                    <div className={styles.down}>
                        {item.isConflict? (<div className={styles.conflict}>
                            <img 
            src={Exclam}/> <div> Conflict of timing </div> 
                             </div>) : ""}
                        <div  className={styles.head}> 
                            <p> {item.meetingname} </p>
                            <img onClick={()=>{
                                // we must ensure only owner of the event can edit
                                
                                if(item.owner.toString() == user.id.toString())
                                {
                                    setEdit(true)
                                    setComponent(item)
                                }
                                else
                                {
                                    setSuccess({
                                        img : "Danger",
                                        msg : "Only owner can update",
                                        color : "#FF003D"
                                    })
                                }
                            }} src={Eb}/>
                        </div>
                        <div  className={styles.dt}>
                           <p> {`${item.day},${item.date[8]+item.date[9]} ${item.month}`} </p> 
                        </div>
                        <div className={styles.t}> {`${end(item.time,item.duration,item.meridian)}`} </div>
                        <p   className={styles.duration}> {`${item.duration}hr,Group meeting` } </p>
        
                        
                    </div>
                    <div  className={styles.line}> </div>
                    <div  className={styles.dwn}> <img onClick={async ()=>{
                        
                        try{
                            let request = await axios.put(`http://localhost:2500/event/status/${item._id}`,{},{withCredentials : true})
                            
                            setArr(prevArr => {
                                const newArr = [...prevArr]; // Copy array
                                newArr[index] = { ...newArr[index], isActive: !newArr[index].isActive }; 
                                return newArr;
                            });
                        }
                        catch(err)
                        {
                            
                        }
                    }} src={item.isActive ? Togblue:Togblack}/> 
                     <img onClick={async()=>{
                        await navigator.clipboard.writeText(`Meeting Link : ${item.elink} `)
                        setSuccess({
                            img : "Check",
                            msg : "Copied to clipboard",
                            color : "#05A763"
                          })
                     }} src={Copy}/> <img onClick={async()=>{
                        
                        try{
                            let request = await axios.delete(`http://localhost:2500/event/remove/${item._id}`,{withCredentials : true})
                            if (request.status === 200) { // Check if deletion was successful
                                setArr(prevArr => prevArr.filter(event => event._id !== item._id)); // Remove from past events
                                
                            }
                            
                        }
                        catch(err)
                        {
                           
                        }
                     }} src={Delete}/>
                    </div>
                    
                </div>)
        })}
        </div>
    </>)}
    </div>
  ) : <Edit1 component = {component} setSuccess={setSuccess} setEdit = {setEdit} isMobile = {isMobile} />
}

export default Eventlist