import React from 'react'
import styles from './Next.module.css'
import Emj from './components/Emj.svg'
import { useState,useEffect} from 'react'
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


function Edit2({setNext,setSuccess,details,setBack,isMobile,user}) {
  const[name,setName] = useState(details.meetingname)
  const[edit,setEdit] = useState(false)
  const[color,setColor] = useState(details.color)
  const[elink,setLink] = useState(details.elink)
  const[mails,setMails] = useState([])
  
  
    const[selectedMails,setSelectedMails] = useState([])
    const[show,setShow] = useState(false)
    

      async function getDetails(){
        try{
          let request = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getDetails`)
          let info = request.data.details
          setMails(info)
          setSelectedMails(details.participants)
          

        }
        catch(err){
          //
        }
      }
      
      useEffect(()=>{
        getDetails()
      },[])

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
           }} style={{height : "10px",width : "10px"}}  src={Edit}/>
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
    <div style={{backgroundColor : "#B6B6B6",height :!isMobile? "1.45px" : "1px",width :!isMobile?  "73dvw" : "90dvw"}}> </div>
    <div className={styles.invite}>
      <form id = "form"  onSubmit={async (e)=>{
        e.preventDefault()
        

        // we have to get day 
        let dt = new Date(details.date)
        let day = dt.toLocaleDateString("en-us",{weekday : "long"})
        // we have got everything then participants
        
        if(elink && mails)
        {
          details.participants = selectedMails
         
          
          details.day = day;
          details.elink = elink
          details.meetingname = name

        
          

          details.month = months[details.date[5]+details.date[6]]
          details.color = color
          
          try{
            let request = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/event/updevent/${details._id}`,details,{withCredentials : true})
           
            setBack(false)
            setSuccess({
              img : "Check",
              msg : "Details updated successfully",
              color : "#05A763"
            })
            
            
            
          }
          catch(err)
          {
            if(err.response.data.status == 111)
            {
              setSuccess({
                img : "Danger",
                msg : "User is not available",
                color : "#FF003D"
              })
            }
            setBack(false)
            
            
          }

        }
        
        


      }}>
      <div className={styles.field}> 
        <p className={styles.label}> Add link <span className={styles.red}> *</span> </p>
        <input value={elink} onChange={(e)=>{
          setLink(e.target.value)
        }} type='url' placeholder='Enter URL Here'/>
      </div>
      <div className={styles.field}> 
        <p className={styles.label}> Add Emails <span className={styles.red}>*</span> </p>
        <div className={styles.addEmail}> <p onClick={()=>{
                  setShow(!show)
                }}>  ⌵ </p> <p> Select Emails</p></div>
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
    {show ? !isMobile ? (<div className={styles.emailList}>
           <div className={styles.inside}> 
           { mails.map((item,index)=>{
              
              if(user.email === item.email){
                
                return ""
              }
              return(
                <div key={item.email} className={styles.entry}> <input checked={selectedMails.includes(item.email)} onChange={(e)=>{
                  if(e.target.checked){
                    setSelectedMails((prev)=>{
                      return [...prev,item.email]
                    })
                  }
                  else{
                    setSelectedMails((prev)=>{
                      return prev.filter((entry)=>{
                        return item.email !== entry
                      })
                    })
                  }
                  
                    
                }} type='checkbox'/> <p className={styles.child1}>{item.email}</p> <p className={styles.child2}> {item.firstname} {item.lastname}</p>  </div>
              )
            })}
           </div>
           </div>) : (<div className={styles.emailList}>
           <div className={styles.inside}> { mails.map((item,index)=>{
              
              if(user.email === item.email){
                return ""
              }
              
              return(
                <div key={item.email} className={styles.entry}> <input checked={selectedMails.includes(item.email)} onChange={(e)=>{
                  if(e.target.checked){
                    setSelectedMails((prev)=>{
                      return [...prev,item.email]
                    })
                  }
                  else{
                    setSelectedMails((prev)=>{
                      return prev.filter((entry)=>{
                        return item.email !== entry
                      })
                    })
                  }
                  console.log(selectedMails)
                    
                }} type='checkbox'/> <div className={styles.EFS}> 
                   <p> {item.email} </p>
                   <p> {item.firstname} {item.lastname} </p>
                   </div> </div>
              )
            })}</div>
           </div>) : ""}
    </div>
  )
}

export default Edit2