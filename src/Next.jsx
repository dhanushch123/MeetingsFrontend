import React from 'react'
import styles from './Next.module.css'
import Emj from './components/Emj.svg'
import { useState } from 'react'
import Edit from './components/Edit.svg'
import axios from 'axios'


const months = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"
};


function Next({setActiveComponent,user,setNext,setSuccess,setNum,isMobile}) {
  const[name,setName] = useState("meeting")
  const[edit,setEdit] = useState(false)
  const[color,setColor] = useState("#342B26")
  const[elink,setLink] = useState("")
  const[mails,setMails] = useState("")

  return (
    <div className={styles.main}> 
     
     <p className={styles.heading}>Add Event</p>
     {!isMobile ? (<div className={styles.line}> </div>) : ""}
     <div className={styles.Banner}> 
        <p> Banner </p>
        <div style={{backgroundColor : color.length>0? color : "#342B26"}} className={styles.box}>
            <div className={styles.face}> 
            <img src={Emj}/>
            
            </div>

            <form>
            <div className={styles.section}> 
            
            
            <input style={{backgroundColor : color.length>0? color : "#342B26"}} type='text' value={name}  readOnly={!edit} onBlur={() => setEdit(false)}  onChange={(e)=>{
              setName(e.target.value)
            }} /> 
            <img className={styles.ic} onClick={()=>{
            setEdit(true)
           }} style={{height : !isMobile? "10px" : "12px",width :!isMobile? "10px" : "12px"}}  src={Edit}/>
            </div>
           </form>
           
            
        </div>
        <div className={styles.color}> 
          <p> Custom Background Color </p>
          <div className={styles.colors}>
            <div onClick={()=>[
              setColor("#EF6500")
            ]} className={styles.circle} style={{backgroundColor:"#EF6500",border : color=='#EF6500'? "1.5px solid #26f10b" : ""}} ></div>
            <div onClick={()=>{
              setColor("#342B26")
            }} className={styles.circle} style={{backgroundColor:"#342B26",border : color=='#342B26'? "1.5px solid #26f10b" : ""}}></div>
            <div onClick={()=>{
              setColor('#000000')
            }} className={styles.circle} style={{backgroundColor:"#000000",border : color=='#000000'? "1.5px solid #26f10b" : ""}}></div>
          </div>
          <div className={styles.dis}> 
            <div style={{backgroundColor : color.length>0? color : "#342B26"}} className={styles.bg}> </div>
            <div className={styles.bgvalue}> {color.length>0? color : "#342B26"} </div>
          </div>
        </div>
    </div> 
    <div style={{backgroundColor : "#B6B6B6",height :!isMobile ? "1.45px" : "0.8px",width :!isMobile? "73dvw" : "90dvw"}}> </div>
    <div className={styles.invite}>
      <form id = "form"  onSubmit={async (e)=>{
        e.preventDefault()
        let details = JSON.parse(localStorage.getItem("edetails"))

        // we have to get day 
        let dt = new Date(details.date)
        let day = dt.toLocaleDateString("en-us",{weekday : "long"})
        // we have got everything then participants
       
        if(elink && mails)
        {
          details.participants = mails.split(',').map(email => email.trim()).filter(item => item !== user.email);
          
          details.participants = [...new Set(details.participants)];
          details.owner = user._id;
          details.day = day;
          details.elink = elink
          details.meetingname = name
          details.owner = user.id

          details.month = months[details.date[5]+details.date[6]]
          details.color = color
          
          try{
            let request = await axios.post('https://meetingsbackend.onrender.com/event/create',details,{withCredentials : true})
            

              setSuccess({
                img : "Check",
                msg : "successfully added link",
                color : "#05A763"
              })
              setActiveComponent("Eventlist")
              setNum(1)
              
              localStorage.removeItem("edetails")
            
            
          }
          catch(err)
          {
            if(err.response.data.status == 111)
              {
               
                // avaialbility issue
                setSuccess({
                  img : "Danger",
                  msg : "User is not available",
                  color : "#FF003D"
                })
                setActiveComponent("Eventlist")
                setNum(1)
                
                
                localStorage.removeItem("edetails")
  
              }
            
            
            
          }

        }
        
        


      }}>
      <div className={styles.field}> 
        <p className={styles.label}> Add link <span className={styles.red}> *</span> </p>
        <input onChange={(e)=>{
          setLink(e.target.value)
        }} type='url' placeholder='Enter URL Here'/>
      </div>
      <div className={styles.field}> 
        <p className={styles.label}> Add Emails <span className={styles.red}>*</span> </p>
        <input onChange={(e)=>{
           setMails(e.target.value)
           
        }}  type='email' multiple placeholder='Add member Emails'/>
      </div>
      </form>

      
    </div>

    <div className={`${styles.d2} ${styles.en}`}> 
                 <button onClick={()=>{
                  setNext(false)
                 }} className={styles.cancel}> Cancel </button> 
                 
                 <button type='button' onClick={()=>{
                  document.getElementById("form")?.requestSubmit()
                 }}  className={styles.save}> Save</button> 
              </div>
    </div>
  )
}

export default Next