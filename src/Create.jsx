import React from 'react'
import styles from './Create.module.css'
import { useState,useEffect } from 'react'
import Next from './Next';

function Create({setActiveComponent,user,setSuccess,setNum,isMobile}) {

  const [minDate, setMinDate] = useState("");
  const[details,setDetails] = useState({
    description : "",
    meridian : "AM",
    duration : "0.5",
    time : "1:00",
    zone : "Indian Standard Time"
  })
  const[next,setNext] = useState(false)


function calculateEndTime(startTime, meridian, duration) {

  let [hour, minute] = startTime.split(":").map(Number);


  if (meridian.toUpperCase() === "PM" && hour !== 12) {
      hour += 12;
  } else if (meridian.toUpperCase() === "AM" && hour === 12) {
      hour = 0;
  }


  const durationMinutes = duration * 60;


  let totalMinutes = hour * 60 + minute + durationMinutes;


  totalMinutes %= (24 * 60);


  const endHour = Math.floor(totalMinutes / 60);
  const endMinute = Math.floor(totalMinutes % 60);


  const formattedHour = endHour.toString().padStart(2, '0');
  const formattedMinute = endMinute.toString().padStart(2, '0');

  return `${formattedHour}:${formattedMinute}`;
}



  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  function convertTo24Hour(time, meridian) {
    let [hours, minutes] = time.split(":").map(Number);

    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;

    return { hours, minutes };
}

let isValidEventTime = (eventDateStr, eventTime, eventMeridian) => {
    let now = new Date();


    let eventDate = new Date(eventDateStr);
    
    // console.log(eventDate,now)
    let { hours, minutes } = convertTo24Hour(eventTime, eventMeridian);
    
    
    eventDate.setHours(hours, minutes, 0, 0);

    

    
    return eventDate > now;
};
  
  return (
    <div className={styles.create}> 

        <div className={styles.up}>
        <p className={styles.first}> Create Event </p>
        <p className={styles.second}>Create events to share for people to book on your calendar.</p>
        </div>
        {next?(<Next setNum  = {setNum} setSuccess = {setSuccess} setNext= {setNext} user = {user} setActiveComponent = {setActiveComponent} isMobile = {isMobile}/>) : (<div className={styles.main}> 
          <p className={styles.heading}>Add Event</p>
          <div className={styles.line}></div>
          <div className={styles.edetails}>

            <form>
              <div  className={styles.field}>

                <p className={styles.label}> Event Topic<span className={styles.red}>*</span> </p>
                <input onChange={(e)=>{
                setDetails((prev)=>({
                  ...prev,
                  eventtopic : e.target.value

                }))
              }} type='text' placeholder='Set a conference topic before it starts'/>
                
              </div>
              <div className={styles.field}> 
              <p className={styles.label}> Password </p>
              <input onChange={(e)=>{
                setDetails((prev)=>({
                  ...prev,
                  password : e.target.value

                }))
              }} type='password' placeholder='password'/>
              </div>
              <div className={styles.field}>
              <p className={styles.label}>Host Name<span className={styles.red}>*</span> </p>
              <input onChange={(e)=>{
                setDetails((prev)=>({
                  ...prev,
                  hostname : e.target.value

                }))
              }} type='text' placeholder='host name'/>
              </div>
              <div className={styles.field}>
              <p className={styles.label}> Description <span></span> </p>
              <input onChange={(e)=>{
                setDetails((prev)=>({
                  ...prev,
                  description : e.target.value

                }))
              }} className={styles.area} type='text' />
              </div>
              
            </form>
            
          </div>
          <div className={styles.line}> </div>
          
          <div className={styles.edetails2}> <div className={styles.date}> Date and time<span className={styles.red}>*</span></div>
                
               <div className={styles.dt}>
               <input onChange={(e)=>{
                setDetails((prev)=>({
                  ...prev,
                  date : e.target.value

                }))
              }} type='date' min={minDate} placeholder='dd/mm/yyyy'/>
           
           <select onChange={(e)=>{
                setDetails((prev)=>({
                  ...prev,
                  time : e.target.value

                }))
              }} id="time">
               <option value="1:00">1:00</option>
               <option value="1:30">1:30</option>
               <option value="2:00">2:00</option>
               <option value="2:30">2:30</option>
               <option value="3:00">3:00</option>
               <option value="3:30">3:30</option>
               <option value="4:00">4:00</option>
               <option value="4:30">4:30</option>
               <option value="5:00">5:00</option>
               <option value="5:30">5:30</option>
               <option value="6:00">6:00</option>
               <option value="6:30">6:30</option>
               <option value="7:00">7:00</option>
               <option value="7:30">7:30</option>
               <option value="8:00">8:00</option>
               <option value="8:30">8:30</option>
               <option value="9:00">9:00</option>
               <option value="9:30">9:30</option>
               <option value="10:00">10:00</option>
               <option value="10:30">10:30</option>
               <option value="11:00">11:00</option>
               <option value="11:30">11:30</option>
               <option value="12:00">12:00</option>
           </select>
           <select onChange={(e)=>{
                setDetails((prev)=>({
                  ...prev,
                  meridian : e.target.value

                }))
              }} id='meridian'>
               <option value="AM">AM</option>
               <option value="PM">PM</option>
           </select>
           <select value = {details.zone} onChange={(e)=>{
            setDetails((prev)=>(
              {
                ...prev,
                zone : e.target.value
              }
            ))
           }} id='zone'>
            <option value="Indian Standard Time">UTC+05:30 Delhi</option>

           </select>

               </div>
               
          </div>
          <div id={styles.dur} className={`${styles.d2} ${styles.dur}`}>
            <div  className={styles.sc}><p> Set duration</p> </div>
            <select onChange={(e)=>{
                setDetails((prev)=>({
                  ...prev,
                  duration : e.target.value

                }))
              }} id='duration'>
            <option value="0.5">30 min</option>
            <option value="1">1 hour</option>
            <option value="1.5">1.5 hour</option>
            <option value="2">2 hour</option>
            <option value="2.5">2.5 hour</option>
            <option value="3">3 hour</option>
            <option value="3.5">3.5 hour</option>
            <option value="4">4 hour</option>
           </select>
            
          </div>
          <div className={`${styles.d2} ${styles.en}`}> 
             <button onClick={()=>{
              setActiveComponent("Eventlist")
             }} className={styles.cancel}> Cancel </button> 
             
             <button onClick={()=>{
              
              let{eventtopic,hostname,description,password,date,time,meridian,duration} = details
              details.endTime = calculateEndTime(time,meridian,duration)
              if(eventtopic && hostname && description && password && date && time && meridian && duration)
              {
                if(isValidEventTime(date,time,meridian))
                {
                 
                  localStorage.setItem("edetails",JSON.stringify(details))
                  setDetails({
                  description : "",
                  meridian : "AM",
                  duration : "0.5",
                  time : "1:00",
                  zone : "Indian Standard Time"
                })
                setNext(true)
                }
                else
                {
                  setSuccess({
                    img : "Danger",
                    msg : "Failed to add link",
                    color : "#FF003D"
                })
                setActiveComponent("Eventlist")
                setNum(1)
                }

                
              }
              

              
             }} className={styles.save}> Save</button> 
          </div>
          
          


        </div>)}
      </div>
  )
}

export default Create