import React from 'react'
import { useState,useEffect } from 'react'
import styles from './Signin.module.css'
import Logo from "./components/Logo.svg";
import St from './components/St.svg'
import Hide from './components/Hide.png'
import Eyec from './components/Eyec.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'



function SignIn({isMobile}) {
  

  const[username,setUsername] = useState("")
  const[password,setPassword] = useState("")
  const[err,setErr] = useState("")  
  useEffect(()=>{
    setErr("")
},[password,username])
 
  const[show,setShow] = useState(false);
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
        {!isMobile ? (<><div className={styles.left}>
        <div className={styles.top}>
        <img src={Logo}/> 
        <p> CNNCT </p>
        </div>

        <div className={styles.down}> 
            <p> Sign in</p>

        <form   onSubmit={async (e)=>{
            e.preventDefault()
           
            try{
                let request = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,{
                    username,password
                },{withCredentials : true})
               

                let request2 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/event`,{withCredentials : true})
                if(request2.status == 200)
                {
                    navigate('/event')
                    
                }
                else
                {
                  
                }

            }
            catch(err)
            {
                setErr("Invalid Credentials!!")
                
            }
        }}   id="form" >
            <input onChange={(e)=>{
                setUsername(e.target.value)
            }} type='text' placeholder='Username'/>
            <br/>
            <div className={styles.inputWrapper}>
  <input
    className={styles.passwordInput} placeholder='Password'
    onChange={(e) => setPassword(e.target.value)}
    type={show ? "text" : "password"}
    
  />
  <img
    className={styles.eyeIcon}
    onClick={() => setShow(!show)}
    src={show ? Eyec : Hide}
    
  />
</div>
            {err.length > 0 ?(<p className={styles.err}> {err} </p>) : (<p className={styles.err}> </p>)}

        </form> 
        <button type='submit' onClick={()=>{
            document.getElementById("form").requestSubmit()
        }} style={{backgroundColor : (username.length>0 && password.length > 0)? "#1877F2":"#E0E2D9" ,color :  (username.length>0 && password.length > 0)?"white" : "#A8AAA2"}} className={styles.btn}> Login </button>
        <p className={styles.last}> Don't have an account? <span onClick={()=>{
            navigate('/signup')
        }} className={styles.blue}> Sign up </span> </p>
        </div>

        <p id={styles.msg} className={styles.e1}>
        This site is protected by reCAPTCHA and the <u>Google Privacy Policy</u>  and <u> Terms of Service </u> apply
        </p>
        
        </div>

        <div className={styles.right}> 
            <img src={St}/>
        </div> </>) : 
        // mobile view
        /*  *** mobile view *** */
        (<>
        <div className={styles.left}>
        <div className={styles.top}>
        <img src={Logo}/> 
        <p> CNNCT </p>
        </div>

        <div className={styles.down}> 
            <p> Sign in</p>

        <form   onSubmit={async (e)=>{
            e.preventDefault()
            
            try{
                let request = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,{
                    username,password
                },{withCredentials : true})
                

                let request2 = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/event`,{withCredentials : true})
                if(request2.status == 200)
                {
                    navigate('/event')
                    
                }
                else
                {
                   
                }

            }
            catch(err)
            {
                setErr("Invalid Credentials!!")
                
            }
        }}   id="form" >
            <label htmlFor='username'> Username </label>
             <br/>
            <input placeholder = "" onChange={(e)=>{
                setUsername(e.target.value)
            }} type='text' />
            <br/>
            <label htmlFor='password'> Password </label>
            <br/>
            <div className={styles.inputWrapper}>
  <input
    className={styles.passwordInput} 
    onChange={(e) => setPassword(e.target.value)}
    type={show ? "text" : "password"}
    
  />
  <img
    className={styles.eyeIcon}
    onClick={() => setShow(!show)}
    src={show ? Eyec : Hide}
    
  />
</div>
            {err.length > 0 ?(<p className={styles.err} id={styles.err}> {err} </p>) : (<p className={styles.err}> </p>)}

        </form> 
        <button  type='submit' onClick={()=>{
            document.getElementById("form").requestSubmit()
        }} style={{backgroundColor : (username.length>0 && password.length > 0)? "#1877F2":"#E0E2D9" ,color :  (username.length>0 && password.length > 0)?"white" : "#A8AAA2"}} className={styles.btn}> Login </button>
        <p className={styles.last}> Don't have an account? &nbsp;<span onClick={()=>{
            navigate('/signup')
        }} className={styles.blue}> Sign up </span> </p>
        </div>

        <p id={styles.msg} className={styles.e1}>
        This site is protected by reCAPTCHA and the <u>Google Privacy Policy</u>  and <u> Terms of Service </u> apply
        </p>
        
        </div>
        <div className={styles.mobEnd}> </div>

        
        </>)}
    </div>
  )
}

export default SignIn