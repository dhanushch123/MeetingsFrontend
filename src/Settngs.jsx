import React from 'react'
import styles from './Settngs.module.css'
import { useState,useEffect} from 'react'
import axios from 'axios'
import Popup1 from './Popup1'
import Emj from './components/Emj.svg'
import Logout from './components/Logout.svg'
import { useNavigate } from 'react-router-dom'

function Settngs({user,setSuccess,success,isMobile}) {

    

    const[email,setEmail] = useState(user.email)
    const navigate = useNavigate()
    
    const[FirstName,setFirstName] = useState(user.firstname)
    const[LastName,setLastName] = useState(user.lastname)
    const[password,setPassword] = useState("") 
    const[ConfirmPassword,setComfirmPassword] = useState("") 
  return (
    <div className={styles.create}>

        
        <div className={styles.up}>
            <p className={styles.first}> Profile {isMobile ? (<img src={Emj}/>) : ""} </p>
            <p className={styles.second}>Manage seetings for your profile </p>
        </div>
        {success ? <Popup1 success={success} setSuccess={setSuccess}/> : ""}

        <div className={styles.main}> 
            <p className={styles.profile}> Edit profile </p>
             <div className={styles.blue}> </div>
                <div className={styles.line}> <div className={styles.one}> </div> 
                <div className={styles.two}></div>
                </div>
         <div className={styles.form}>
         <form id="form" onSubmit={async (e)=>{
                        e.preventDefault()
                        if(password.length > 0 && password == ConfirmPassword)
                        {
                            try{
                                let request = await axios.put(`http://localhost:2500/user/update/${user.id}`,{
                                    firstname : FirstName,
                                    lastname : LastName,
                                    password,
                                    email
    
                                },{withCredentials : true})
                                setSuccess({
                                    img : "Check",
                                    msg : "Details updated successfully",
                                    color : "#05A763"
                                })
                            }
                            catch(err)
                            {
                                setSuccess({
                                    img : "Danger",
                                    msg : "Something went wrong",
                                    color : "#FF003D"
                                })
                            } 
                        }
                         
                        
            
                       
            
            
            
            
                    }}>
                        <label htmlFor='FirstName'>First Name</label>
                        <br/>
            
            
                        <input value={FirstName} type='text' onChange={(e)=>{
                            setFirstName(e.target.value)
                        }} placeholder='FirstName'/>
            
                        <br/>
            
                       <label htmlFor='LastName'>Last Name</label>
            
                       <br/>
            
            
                      <input value={LastName} type='text' onChange={(e)=>{
                      setLastName(e.target.value)
                      }} placeholder='LastName'/>
            
                      <br/>
            
                      <label htmlFor='Email'> Email</label>
                      <br/>
            
                        <input value={email} onChange={(e)=>{
                            setEmail(e.target.value)
                        }} type='email' placeholder='Email'/>
                        <br/>
            
                        <label htmlFor='Password'> Password</label>
                        <br/>
            
                        <input onChange={(e)=>{
                            setPassword(e.target.value)
                        }} type='password'placeholder='Password'/>
            
                        <br/>
            
                        <label htmlFor='Confirm Password'> Confirm Password </label>
                        <br/>
                        <input type='password' onChange={(e)=>{
                            setComfirmPassword(e.target.value)
                        }} placeholder='Confirm Password'/>
                        
                        
                    
                    
                    
                    
            
                    
                    
                    
                    </form>
            
        </div> 

         

        {isMobile ? (<div className={styles.End}> 
            <button onClick={async()=>{
                try{
                    let request = await axios.post('http://localhost:2500/user/logout',{}, {withCredentials : true})
                    if(request.data.status == 200){
                        navigate('/')
                    }
                    }
                    catch(err){
                        let msg = err.response.data.message
                        console.log(msg)
                    }
            }}> <p>Logout</p> <img src={Logout}/> </button>

            <div onClick={()=>{
            console.log("In save")
            document.getElementById("form")?.requestSubmit()
         }} className={styles.save}>
            <button  className={styles.bn}> Save </button>
        </div>
        </div>) : (<div onClick={()=>{
            console.log("In save")
            document.getElementById("form")?.requestSubmit()
         }} className={styles.save}>
            <button  className={styles.bn}> Save </button>
        </div>)}


             
        </div>

    </div>
  )
}

export default Settngs