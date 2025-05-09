import React, { use, useEffect } from 'react'
import { useState } from 'react'
import styles from './Signup.module.css'
import Logo from "./components/Logo.svg";
import St from './components/St.svg'


import { useNavigate } from 'react-router-dom';


function SignUp({isMobile}) {
  const[email,setEmail] = useState("")
  const[FirstName,setFirstName] = useState("")
  const[LastName,setLastName] = useState("")
  const[password,setPassword] = useState("") 
  const[confirmPassword,setComfirmPassword] = useState("") 
  const[tc,setTc] = useState(false)
  const[err,setErr] = useState({
    
    password : "",
    
    tc : ""
  })
  const[gender,setGender] = useState("Male")
 
  
  
  const navigate = useNavigate()
  function isFilled(){
    if(email.length > 0 && FirstName.length > 0 && LastName.length > 0 && password.length > 0 && confirmPassword.length > 0 && tc)
    {
        
        
        return true
    }
    return false;

  }
  
  return (
    <div className={styles.container}>

       {!isMobile ? (<>
        <div className={styles.left}>
        <div className={styles.top}>
        <img src={Logo}/> 
        <p> CNNCT </p>
        </div>


        <div className={styles.down}> 
            <div className={styles.account}>
                <p> Create an account </p>
                <p style={{cursor : 'pointer'}} onClick={()=>{
                    navigate('/signin')
                }} >  <u style={{fontSize : "11px"}}> Sign in instead </u> </p>

            </div>

        <form onSubmit={async (e)=>{
            e.preventDefault()
            // we need to request
            // we have to store them there is next page 

            setErr({password : "",tc : ""})

            if(password != confirmPassword)
            {
                
                setErr(prev=>(
                    {...prev,
                        password : "passwords are not matched"
                    }
                )

                )
            }
            if(!tc)
            {
                setErr(prev=>({
                    ...prev,
                    tc : "Accept T&C !!"
                }))
            }

            if(isFilled() && password == confirmPassword)
            {
                localStorage.setItem("details",JSON.stringify({email,
                    firstname : FirstName,
                    lastname : LastName,
                    password,gender
                }))
                navigate('/preferences')
            }

           




        }}>
            <label htmlFor='FirstName'>First Name</label>
            <br/>


            <input type='text' onChange={(e)=>{
                setFirstName(e.target.value)
            }} placeholder='FirstName'/>

            <br/>

           <label htmlFor='LastName'>Last Name</label>

           <br/>


          <input type='text' onChange={(e)=>{
          setLastName(e.target.value)
          }} placeholder='LastName'/>

          <br/>

          <label htmlFor='Email'> Email</label>
          <br/>

            <input onChange={(e)=>{
                setEmail(e.target.value)
            }} type='email' placeholder='Email'/>
            <br/>

            <label htmlFor='Password'> Password</label>
            <br/>

            <input onChange={(e)=>{
                setPassword(e.target.value)
            }} type='password'placeholder='Password'/>

            <br/>

            <label htmlFor='confirm Password'> confirm Password </label>
            <br/>
            <input type='password' onChange={(e)=>{
                setComfirmPassword(e.target.value)
            }} placeholder='confirm Password'/>
            {err.password.length > 0 ? (<p className={styles.err}> {err.password} </p>):""}
            
        
        
        <div className={styles.tc}> 
            <input  onChange={(e)=>{
                
                setTc(e.target.checked)
                
            }} type='checkbox' />
            <p> By creating an account, I agree to our Terms of use 
            and Privacy Policy  </p>
            
        </div>
        {err.tc.length > 0 ? (<p className={styles.err}> {err.tc} </p>):""}
        
        <div className={styles.gend}>
        <label htmlFor="gender">Gender</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="" disabled>Choose</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        </select>
        </div>

        
        
        <button type='submit'  style={{backgroundColor : isFilled()? "#1877F2" : "#bababa"}} className={styles.btn}> Create an account</button>
        </form> 
        <p style={{fontFamily : "'Poppins',sans-serif",fontSize : "9.5px"}} className={styles.msg}>
            This site is protected by reCAPTCHA and the <u>Google Privacy Policy</u>  and <u> Terms of Service </u> apply
        </p>
       
        </div>
        
        </div>

        <div className={styles.right}> 
            <img src={St}/>
        </div>
       </>) :
       // **** Mobile View **** //
       (<>
        <div className={styles.left}>
        <div className={styles.top}>
        <img src={Logo}/> 
        <p> CNNCT </p>
        </div>


        <div className={styles.down}> 
            <div className={styles.account}>
                <p> Create an account </p>
                <p style={{cursor : 'pointer'}} onClick={()=>{
                    navigate('/signin')
                }} >  <u> Sign in instead </u> </p>

            </div>

        <form onSubmit={async (e)=>{
            e.preventDefault()
            // we need to request
            // we have to store them there is next page 

            setErr({password : "",tc : ""})

            if(password != confirmPassword)
            {
                
                setErr(prev=>(
                    {...prev,
                        password : "passwords are not matched"
                    }
                )

                )
            }
            if(!tc)
            {
                setErr(prev=>({
                    ...prev,
                    tc : "Accept T&C !!"
                }))
            }

            if(isFilled() && password == confirmPassword)
            {
                localStorage.setItem("details",JSON.stringify({email,
                    firstname : FirstName,
                    lastname : LastName,
                    password,gender
                }))
                navigate('/preferences')
            }

           




        }}>
            <label htmlFor='FirstName'>First Name</label>
            <br/>


            <input type='text' onChange={(e)=>{
                setFirstName(e.target.value)
            }} />

            <br/>

           <label htmlFor='LastName'>Last Name</label>

           <br/>


          <input type='text' onChange={(e)=>{
          setLastName(e.target.value)
          }} />

          <br/>

          <label htmlFor='Email'> Email</label>
          <br/>

            <input onChange={(e)=>{
                setEmail(e.target.value)
            }} type='email' />
            <br/>

            <label htmlFor='Password'> Password</label>
            <br/>

            <input onChange={(e)=>{
                setPassword(e.target.value)
            }} type='password'/>

            <br/>

            <label htmlFor='confirm Password'> confirm Password </label>
            <br/>
            <input type='password' onChange={(e)=>{
                setComfirmPassword(e.target.value)
            }} />
            {err.password.length > 0 ? (<p className={styles.err}> {err.password} </p>):""}
            
        
        
        <div className={styles.tandc}> 
            <input  onChange={(e)=>{
                
                setTc(e.target.checked)
                
            }} type='checkbox' />
            <p> By creating an account, I agree to our Terms of use 
            and Privacy Policy  </p>
            
        </div>
        {err.tc.length > 0 ? (<p className={styles.err}> {err.tc} </p>):""}
        
        <div className={styles.gend}>
        <label htmlFor="gender">Gender</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="" disabled>Choose</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        
        </select>
        </div>

        
        
        <button type='submit'  style={{backgroundColor : isFilled()? "#1877F2" : "#bababa"}} className={styles.btn}> Create an account</button>
        </form> 
        
       
        </div>
        
        </div>

       
       </>)}

    </div>
  )
}

export default SignUp