import React from 'react'
import styles from './Events.module.css'
import Logo from "./components/Logo.svg";
import Elink from './components/Elink.svg'
import Availability from './components/Availability.svg'
import Booking from './components/Booking.svg'
import Settings from './components/Settings.svg'

import Elink2 from './components/Elink2.svg'
import Availability2 from './components/Availability2.svg'
import Booking2 from './components/Booking2.svg'
import Settings2 from './components/Settings2.svg'
import Plus from './components/Plus.svg'
import { useState,useEffect} from 'react';
import Emj from './components/Emj.svg'
import Create from './Create';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Bookings from './Bookings'
import Eventlist from './Eventlist';
import Settngs from './Settngs';
import Availability1 from './Availability1';
import Logout from './components/Logout.svg'




function Events({isMobile}) {
  
 
  const[num,setNum] = useState(1)
  const navigate = useNavigate()
  
  const[activeComponent,setActiveComponent] = useState("Eventlist")
  
  const[uname,setUname] = useState("")
  const[user,setUser] = useState({})
  const[success,setSuccess] = useState(null)
  
  async function fetchDetails()
  {
    try{
      let request = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/event`, {withCredentials : true})
      if(request.data.status == 200){
      // we need username and   participants in the database
      setUname(`${request.data.user.username}`)
      setUser(request.data.user)
      }
      else{
        navigate('/')
      }
    }
    catch(err){
      navigate('/')
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
      
          return `${t1} ${meridian} - ${finalHours}:${finalMinutes.toString().padStart(2, '0')}${meridian}`;
      }
  useEffect(()=>{
    // someone may manually type URL 
    // so we check before rendering the component
    fetchDetails()
    
    
  },[activeComponent])
  const renderComponent = () => {
    switch (activeComponent) {
      case "Create":
        return <Create setNum = {setNum} setSuccess = {setSuccess} user = {user} isMobile = {isMobile}  setActiveComponent = {setActiveComponent} />;
      case "Bookings":
        return <Bookings  end={end} user = {user} isMobile = {isMobile}/>
      case "Eventlist":
        return <Eventlist end={end} setNum = {setNum} setSuccess = {setSuccess} isMobile = {isMobile} user = {user}  setActiveComponent = {setActiveComponent} success = {success}/>
      case "Settings":
        return <Settngs success={success}  setSuccess = {setSuccess} isMobile = {isMobile} user ={user}/>
      case "Availability":
        return <Availability1 activeComponent = {activeComponent} isMobile = {isMobile} user = {user}/>
      
      default:
        return (<div> </div>);
    }
  };
  return (
    <div className={styles.container} > 
    
    {!isMobile ? (<>
      <div className={styles.left}>
      <div  className={styles.og}>
      <div style={{borderBottomRightRadius : num-1 == 0?"2.5dvb" : "0dvb"}} className={styles.top}>
        <img src={Logo}/> 
        <p> CNNCT </p>
      </div>
      </div>

      <div className={styles.grey}>
      <div  onClick={()=>{
        setActiveComponent("Eventlist")
        setNum(1)
      }} style={{backgroundColor : num==1?"#f4f4f4" :"white",borderBottomRightRadius : num-1 == 1?"2.5dvb" : "0dvb",borderTopRightRadius : num+1 == 1?"2.5dvb" : "0dvb"}} className={`${styles.Events} ${styles.list}`}>
        <img src={num == 1?Elink2 : Elink}/> <p style={{color : num==1? "#1877F2":"#676767" }}> Events</p>
      </div>
      <div  onClick={()=>{
        setActiveComponent("Availability")
        setNum(2)
      }} style={{backgroundColor : num==2?"#f4f4f4" :"white",borderBottomRightRadius : num-1 == 2?"2.5dvb" : "0dvb",borderTopRightRadius : num+1 == 2?"2.5dvb" : "0dvb"}} className={`${styles.Availability} ${styles.list}`}> 
        <img src={num == 2? Availability2 : Availability}/> <p style={{color : num==2? "#1877F2":"#676767" }}> Availability </p>
      </div>
      <div  onClick={()=>{
        setActiveComponent("Bookings")
        setNum(3)
      }} style={{backgroundColor : num==3?"#f4f4f4" :"white",borderBottomRightRadius : num-1 == 3?"2.5dvb" : "0dvb",borderTopRightRadius : num+1 == 3?"2.5dvb" : "0dvb"}} className={`${styles.Bookings} ${styles.list} ${styles.active}`}>
        <img src={num == 3? Booking2 : Booking}/> <p style={{color : num==3? "#1877F2":"#676767" }}> Bookings</p>
      </div>
      <div onClick={()=>{
        setActiveComponent("Settings")
        setNum(4)
      }} style={{backgroundColor : num==4?"#f4f4f4" :"white",borderBottomRightRadius : num-1 == 4?"2.5dvb" : "0dvb",borderTopRightRadius : num+1 == 4?"2.5dvb" : "0dvb"}} className={`${styles.Settings} ${styles.list} `}>
        <img  src={num==4 ? Settings2 : Settings}/> <p style={{color : num==4? "#1877F2":"#676767" }}>  Settings </p>
      </div>
      </div>
      <div className={styles.l1}>
        <div style={{borderTopRightRadius : num+1 == 5?"2.5dvb" : "0dvb"}} className={styles.l2}> 
        <button onClick={()=>{
          setActiveComponent("Create")
        }} className={`${styles.btn}`}>  <img src={Plus}/>  <p> Create </p>  </button>.
        </div>
      </div>

      <div className={styles.ending}> <div className= {styles.fst}> <img src={Emj}/> <p> {user.username} </p> </div> <div className={styles.scnd}> <img onClick={async ()=>{
        try{
          let request = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`,{}, {withCredentials : true})
          if(request.data.status == 200){
            navigate('/')
          }
        }
        catch(err){
          let msg = err.response.data.message
    
        }
      }} src={Logout}/></div> </div>
      
    </div>

    <div className={styles.right}> 

     {renderComponent()}

    </div>
    </>) :
    /* **** Mobile View **** */
    (<> 
      
      {/* <div className={styles.left}>
      <div  className={styles.og}>
      <div style={{borderBottomRightRadius : num-1 == 0?"2.5dvb" : "0dvb"}} className={styles.top}>
        <img src={Logo}/> 
        <p> CNNCT </p>
      </div>
      </div>

      <div className={styles.grey}>
      <div  onClick={()=>{
        setActiveComponent("Eventlist")
        setNum(1)
      }} style={{backgroundColor : num==1?"#f4f4f4" :"white",borderBottomRightRadius : num-1 == 1?"2.5dvb" : "0dvb",borderTopRightRadius : num+1 == 1?"2.5dvb" : "0dvb"}} className={`${styles.Events} ${styles.list}`}>
        <img src={num == 1?Elink2 : Elink}/> <p style={{color : num==1? "#1877F2":"#676767" }}> Events</p>
      </div>
      <div  onClick={()=>{
        setActiveComponent("Availability")
        setNum(2)
      }} style={{backgroundColor : num==2?"#f4f4f4" :"white",borderBottomRightRadius : num-1 == 2?"2.5dvb" : "0dvb",borderTopRightRadius : num+1 == 2?"2.5dvb" : "0dvb"}} className={`${styles.Availability} ${styles.list}`}> 
        <img src={num == 2? Availability2 : Availability}/> <p style={{color : num==2? "#1877F2":"#676767" }}> Availability </p>
      </div>
      <div  onClick={()=>{
        setActiveComponent("Bookings")
        setNum(3)
      }} style={{backgroundColor : num==3?"#f4f4f4" :"white",borderBottomRightRadius : num-1 == 3?"2.5dvb" : "0dvb",borderTopRightRadius : num+1 == 3?"2.5dvb" : "0dvb"}} className={`${styles.Bookings} ${styles.list} ${styles.active}`}>
        <img src={num == 3? Booking2 : Booking}/> <p style={{color : num==3? "#1877F2":"#676767" }}> Bookings</p>
      </div>
      <div onClick={()=>{
        setActiveComponent("Settings")
        setNum(4)
      }} style={{backgroundColor : num==4?"#f4f4f4" :"white",borderBottomRightRadius : num-1 == 4?"2.5dvb" : "0dvb",borderTopRightRadius : num+1 == 4?"2.5dvb" : "0dvb"}} className={`${styles.Settings} ${styles.list} `}>
        <img  src={num==4 ? Settings2 : Settings}/> <p style={{color : num==4? "#1877F2":"#676767" }}>  Settings </p>
      </div>
      </div>
      <div className={styles.l1}>
        <div style={{borderTopRightRadius : num+1 == 5?"2.5dvb" : "0dvb"}} className={styles.l2}> 
        <button onClick={()=>{
          setActiveComponent("Create")
        }} className={`${styles.btn}`}>  <img src={Plus}/>  <p> Create </p>  </button>.
        </div>
      </div>

      <div className={styles.ending}> <div className= {styles.fst}> <img src={Emj}/> <p> {user.username} </p> </div> <div className={styles.scnd}> <img onClick={async ()=>{
        try{
          let request = await axios.post('https://meetingsbackend.onrender.com/user/logout',{}, {withCredentials : true})
          if(request.data.status == 200){
            navigate('/')
          }
        }
        catch(err){
          let msg = err.response.data.message
          console.log(msg)
        }
      }} src={Logout}/></div> </div>
      
    </div> */}

    <div className={styles.right}> 

      <div className={styles.dynamic}> {renderComponent()} </div>
     

      {/* we need a nav bar */}
      <div className={styles.navbar}>
        
          <div  onClick={()=>{
        setActiveComponent("Eventlist")
        setNum(1)
      }}  className={`${styles.Events} ${styles.list}`}>
        <img src={num == 1?Elink2 : Elink}/> <p style={{color : num==1? "#1877F2":"#676767" }}> Events</p> </div> 
           <div  onClick={()=>{
        setActiveComponent("Availability")
        setNum(2)
      }} className={`${styles.Availability} ${styles.list}`}> 
        <img src={num == 2? Availability2 : Availability}/> <p style={{color : num==2? "#1877F2":"#676767" }}> Availability </p>
      </div>   <div  onClick={()=>{
        setActiveComponent("Bookings")
        setNum(3)
      }}  className={`${styles.Bookings} ${styles.list} ${styles.active}`}>
        <img src={num == 3? Booking2 : Booking}/> <p style={{color : num==3? "#1877F2":"#676767" }}> Bookings</p>
      </div>  <div onClick={()=>{
        setActiveComponent("Settings")
        setNum(4)
      }}  className={`${styles.Settings} ${styles.list} `}>
        <img  src={num==4 ? Settings2 : Settings}/> <p style={{color : num==4? "#1877F2":"#676767" }}>  Settings </p>
      </div> 
      </div>

    </div>
    </>)}
    
    </div>
  )
}

export default Events