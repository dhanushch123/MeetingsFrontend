import React from "react";
import styles from "./Bookings.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Contact from './components/Contact.svg'
import Plist from "./Plist";
import Emj from './components/Emj.svg'




function Bookings({ user,isMobile}){
  const [activeIndex, setActiveIndex] = useState(0);
  const [pending, setPending] = useState([]);
  const[showParticipants,setShowParticipants] = useState(false)
  const[element,setElement] = useState(null)
  const[past,setPast] = useState([])

 
  // accepted events goes to upcoming section

  // have to detect conflict of timing

  // upcoming pending canceled past

  let width = window.innerWidth;
  let oneunit = width/100;
  let one = 0.2*(oneunit);
  let two = !isMobile ? 4*oneunit + one + 64 : 8*oneunit + one + 64;
  let three = !isMobile ?  4*oneunit + two + 56 : 8*oneunit + two + 56;
  let four = !isMobile ? 4*oneunit + three + 64 : 8*oneunit + three + 62;
  
  
  
  

  function bar(actIndex){
    switch(actIndex){
      case(0):
      return one;
      case(1):
      return two;
      case(2):
      return three;
      case(3):
      return four;
    }
  }

  async function getPending() {
    if(tabs[activeIndex] == "Past")
    {
      
      try {
        //console.log(user.id);
        let request = await axios.get(
          `https://meetingsbackend.onrender.com/user/getPast/${user.id}`,
          { withCredentials: true }
        );
        
        setPast(request.data.past)
        
      } catch (err) {
        
      }
    }
    else
    {
      try {
        //console.log(user.id);
        let request = await axios.get(
          `https://meetingsbackend.onrender.com/user/getPending/${user.id}`,
          { withCredentials: true }
        );
        setPending(request.data.pending);
        
        // console.log(past)
      } catch (err) {
       
      }
    }
  }
  
  const tabs = ["Upcoming", "Pending", "Canceled", "Past"];
  useEffect(() => {
    // we have to get pending requests
    // in upcoming we have to show accepted
    // in canceled we have to show rejected
    // we have  event and its status [rejected,accepted,pending]
    getPending();
    setShowParticipants(false)
  }, [activeIndex]);
  

  function calcP(list,hostname)
  {
    
    if(list.length >= 2)
    {
      return `You and ${list.length-1} others`
    }
    else
    {
     
      return `You and ${hostname}`
    }
    
  }

  function renderComponent()
  {
    switch(tabs[activeIndex])
    {
      case "Upcoming" :
        return pending.map((item,index)=>{
        
          if(item.status == "accepted")
          {
            // 2025-06-17
            return (<div key={`${item._id}-${tabs[activeIndex]}+${index}`}> <div  className={styles.fc}> 
              <div  className={styles.c1}> 
                <p> {`${item.day},${item.date[8]+item.date[9]} ${item.month}`}</p> 
                <p> { `${end(item.time,item.duration,item.meridian)}`} </p>
              </div>
              <div className={styles.c2}>
               <div> { `${item.meetingname}`} {isMobile ? (<div className={styles.addOn}> 
                <img style={{cursor : "pointer"}} onClick={()=>{
                  setElement(item)
                  setShowParticipants(!showParticipants)
                }} src={Contact}/>
                <p>  {`${item.participants.length}`} </p>
                </div>) : ""} </div> 
               <p> { `${calcP(item.members,item.hostname)}` }</p> 
              </div>
              <div style={{backgroundColor : "#0fce38",color : "white"}} className={`${styles.additional} ${styles.upcom}`}> Accepted </div>
              <div className={styles.c3}> 
              <img style={{cursor : "pointer"}} onClick={()=>{
                setElement(item)
                setShowParticipants(!showParticipants)
              }} src={Contact}/>
              <p>  {`${item.participants.length} people`} </p>
              </div> 
              </div> 
              
               {showParticipants? (<Plist setShowParticipants={setShowParticipants} item = {element} activeIndex = {activeIndex}/>) : ""}
              
               </div>)}
          else
          {
            return ""
          }})
      case "Pending" :
        return pending.map((item,index)=>{
          if(item.status == "pending")
          {
            return (<div key={`${item._id}-${tabs[activeIndex]}@${index}`}> <div  className={styles.fc}> 
              <div  className={styles.c1}> 
                <p> {`${item.day},${item.date[8]+item.date[9]} ${item.month}`}</p> 
                <p> { `${end(item.time,item.duration,item.meridian)}`} </p>
              </div>
              <div className={styles.c2}>
               <p> { `${item.meetingname}`} </p> 
               <p> { `${calcP(item.members,item.hostname)}` }</p> 
              </div>
              <div id={styles.c3} className={styles.c3}> 
              <img style={{cursor : "pointer"}} onClick={()=>{
                setElement(item)
                setShowParticipants(!showParticipants)
              }} src={Contact}/>
              <p>  {`${item.participants.length} people`} </p>
              </div> 
              </div> 
              
               {showParticipants? (<Plist setShowParticipants={setShowParticipants} item = {element} activeIndex = {activeIndex}/>) : ""}
              
               </div>)}
          else
          {
            return ""
          }})
      case "Canceled":
        return pending.map((item,index)=>{
          if(item.status == "rejected")
          {
            return (<div key={`${item._id}-${tabs[activeIndex]}%${index}`}> <div  className={styles.fc}> 
              <div  className={styles.c1}> 
                <p> {`${item.day},${item.date[8]+item.date[9]} ${item.month}`}</p> 
                <p> { `${end(item.time,item.duration,item.meridian)}`} </p>
              </div>
              <div className={styles.c2}>
               <div> { `${item.meetingname}`} {isMobile ? (<div className={styles.addOn}> 
                <img style={{cursor : "pointer"}} onClick={()=>{
                  setElement(item)
                  setShowParticipants(!showParticipants)
                }} src={Contact}/>
                <p>  {`${item.participants.length}`} </p>
                </div>) : ""} </div> 
               <p> { `${calcP(item.members,item.hostname)}` }</p> 
              </div>

              <div className={`${styles.additional2} ${styles.reject}`}> Rejected </div>
              <div className={styles.c3}> 
              <img style={{cursor : "pointer"}} onClick={()=>{
                setElement(item)
                setShowParticipants(!showParticipants)
              }} src={Contact}/>
              <p>  {`${item.participants.length} people`} </p>
              </div>
               
              </div> 
              
               {showParticipants? (<Plist setShowParticipants={setShowParticipants} item = {element} activeIndex = {activeIndex} />) : ""}
              
               </div>)}
          else
          {
            return ""
          }})
      
       case  "Past":
         
          return past.length>0?  past.map((item,index)=>{
            if(item.status == "accepted")
            {
              return (<div key={`${item._id}-${tabs[activeIndex]}^${index}`}> <div  className={styles.fc}> 
                <div  className={styles.c1}> 
                  <p> {`${item.day},${item.date[8]+item.date[9]} ${item.month}`}</p> 
                  <p> { `${end(item.time,item.duration,item.meridian)}`} </p>
                </div>
                <div className={styles.c2}>
                 <div> { `${item.meetingname}`} {isMobile ? (<div className={styles.addOn}> 
                <img style={{cursor : "pointer"}} onClick={()=>{
                  setElement(item)
                  setShowParticipants(!showParticipants)
                }} src={Contact}/>
                <p>  {`${item.participants.length}`} </p>
                </div>) : ""} </div> 
                 <p> { `${calcP(item.members,item.hostname)}` }</p> 
                </div>
                <div className={styles.additional}> Accepted </div>
                <div className={styles.c3}> 
                <img style={{cursor : "pointer"}} onClick={()=>{
                  setElement(item)
                  setShowParticipants(!showParticipants)
                }} src={Contact}/>
                <p>  {`${item.participants.length} people`} </p>
                </div> 
                </div> 
                
                 {showParticipants? (<Plist setShowParticipants={setShowParticipants} item = {element} activeIndex = {activeIndex} />) : ""}
                
                 </div>)
            }
            else if(item.status == "rejected")
            {
              return (<div key={`${item._id}-${tabs[activeIndex]}&${index}`}> <div  className={styles.fc}> 
                <div  className={styles.c1}> 
                  <p> {`${item.day},${item.date[8]+item.date[9]} ${item.month}`}</p> 
                  <p> { `${end(item.time,item.duration,item.meridian)}`} </p>
                </div>
                <div className={styles.c2}>
                 <div> { `${item.meetingname}`} {isMobile ? (<div className={styles.addOn}> 
                <img style={{cursor : "pointer"}} onClick={()=>{
                  setElement(item)
                  setShowParticipants(!showParticipants)
                }} src={Contact}/>
                <p>  {`${item.participants.length}`} </p>
                </div>) : ""} </div> 
                 <p> { `${calcP(item.members,item.hostname)}` }</p> 
                </div>
  
                <div className={styles.additional2}> Rejected </div>
                <div className={styles.c3}> 
              <img style={{cursor : "pointer"}} onClick={()=>{
                setElement(item)
                setShowParticipants(!showParticipants)
              }} src={Contact}/>
              <p>  {`${item.participants.length} people`} </p>
              </div>
                 
                </div> 
                
                 {showParticipants? (<Plist setShowParticipants={setShowParticipants} item = {element} activeIndex = {activeIndex} />) : ""}
                
                 </div>)
            }
            else
            {
              return (<div key={`${item._id}-${tabs[activeIndex]}*${index}`}> <div  className={styles.fc}> 
                <div  className={styles.c1}> 
                  <p> {`${item.day},${item.date[8]+item.date[9]} ${item.month}`}</p> 
                  <p> { `${end(item.time,item.duration,item.meridian)}`} </p>
                </div>
                <div className={styles.c2}>
                 <div> { `${item.meetingname}`}{isMobile ? (<div className={styles.addOn}> 
                <img style={{cursor : "pointer"}} onClick={()=>{
                  setElement(item)
                  setShowParticipants(!showParticipants)
                }} src={Contact}/>
                <p>  {`${item.participants.length} `} </p>
                </div>) : ""} </div> 
                 <p> { `${calcP(item.members,item.hostname)}` }</p> 
                </div>
                <div className={styles.additional}> Pending </div>
                <div className={styles.c3}> 
                <img style={{cursor : "pointer"}} onClick={()=>{
                  setElement(item)
                  setShowParticipants(!showParticipants)
                }} src={Contact}/>
                <p>  {`${item.participants.length} people`} </p>
                </div> 
                </div> 
                
                 {showParticipants? (<Plist setShowParticipants={setShowParticipants} activeIndex={activeIndex} item = {element} />) : ""}
                
                 </div>)
            }
          }) : ""
    }
  }

  // console.log(pending);
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

 
  return (
    <div className={styles.create}>
      <div className={styles.up}>
        <p className={styles.first}> Bookings {isMobile ? (<img src={Emj}/>) : ""} </p>
        <p className={styles.second}>
          See upcoming and past events booked through your event type links.
        </p>
      </div>

      <div  className={styles.main}>
        <div className={styles.section}>
          {tabs.map((tab, index) => (
            <p
              key={index}
              className={`${styles.tab} ${
                activeIndex === index ? `${styles.active}` : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {tab}
            </p>
          ))}
        </div>

        <div className={styles.line}>
          <div
            className={styles.blue}
            style={{
              left:  `${bar(activeIndex)}px`,
              width: !isMobile? `${tabs[activeIndex].length * 9}px` : `${tabs[activeIndex].length * 9.5}px`
            }}> </div>
        </div>
        
        <div className={styles.listing}>    
        {renderComponent()}
        </div>

        

        
       
      </div>

    
    </div>
  );
}

export default Bookings;
