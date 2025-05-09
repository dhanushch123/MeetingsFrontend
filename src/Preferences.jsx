import React, { useState } from 'react'
import St from './components/St.svg'
import styles from './Preferences.module.css'
import Logo from './components/Logo.svg'
import Education from './components/Education.svg';
import Finance from './components/Finance.svg';
import Government from './components/Government.svg';
import Consulting from './components/Consulting.svg';
import Recruiting from './components/Recruiting.svg';
import Tech from './components/Tech.svg';
import Marketing from './components/Marketing.svg';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'



function Preferences({isMobile}) {
    const [username,setUsername] = useState("")
    const[selectedKey,setSelectedKey] = useState(0)
    const navigate = useNavigate()

  return (
    <div className={styles.container}>
        {!isMobile? (<>
            <div className={styles.left}>

<div className={styles.top}>
        <img src={Logo}/> 
        <p> CNNCT </p>
        </div>
<div className={styles.body}>

    <p className={styles.head}> Your Preferences </p>
    <form id = "form" onSubmit={async (e)=>{
        e.preventDefault()
        if(selectedKey > 0)
        {
            let user = JSON.parse(localStorage.getItem("details"))
       
            try{
                console.log("making request...")
                let request = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,{
                    ...user,
                    username

                },{withCredentials : true})

                navigate('/signin')

                
            }
            catch(err)
            {
                navigate('/signup')
                
            }
            localStorage.removeItem("details")
        }
    }}>
        <input onChange={(e)=>{
            setUsername(e.target.value)
        }} type='text' placeholder='Tell us your username'/>
    </form>
    <p className={styles.category}> Select one category that best describes your CNNCT:</p>

    <div className={styles.select}>
        <div key={1} onClick={()=>{
            setSelectedKey(1)
            

        }} style={{backgroundColor : selectedKey == 1? "#1877F2":"white",color:selectedKey == 1 ? "white":"black"}} className={styles.choice}> 
        🏢 <p> Sales </p>
        </div>
        <div style={{backgroundColor : selectedKey == 2? "#1877F2":"white",color:selectedKey == 2? "white":"black"}} onClick={()=>{
            setSelectedKey(2)
            

        }} key={2} className={styles.choice}>
            
        📚 <p> Education</p>
             </div>
        <div style={{backgroundColor : selectedKey == 3? "#1877F2":"white",color:selectedKey == 3? "white":"black"}} onClick={()=>{
            setSelectedKey(3)
            

        }} key={3} className={styles.choice}> <img src={Finance}/> <p> Finance</p> </div>
        <div style={{backgroundColor : selectedKey == 4? "#1877F2":"white",color:selectedKey == 4? "white":"black"}} onClick={()=>{
            setSelectedKey(4)
            

        }} key={4} className={styles.choice}> ⚖️ <p> Government</p> </div>
        <div style={{backgroundColor : selectedKey == 5? "#1877F2":"white",color:selectedKey == 5? "white":"black"}} onClick={()=>{
            setSelectedKey(5)
            

        }} key={5} className={styles.choice}> <img src={Consulting}/> <p> Consulting</p> </div>
        <div style={{backgroundColor : selectedKey == 6? "#1877F2":"white",color:selectedKey == 6? "white":"black"}} onClick={()=>{
            setSelectedKey(6)
            

        }} key={6} className={styles.choice}> <img src={Recruiting}/> <p> Recruiting </p>  </div>
        
        <div style={{backgroundColor : selectedKey == 7? "#1877F2":"white",color:selectedKey == 7? "white":"black"}} onClick={()=>{
            setSelectedKey(7)
            

        }} key={7} className={styles.choice}> 🖥 <p> Tech</p>  </div>
        <div style={{backgroundColor : selectedKey == 8? "#1877F2":"white",color:selectedKey == 8? "white":"black"}} onClick={()=>{
            setSelectedKey(8)
            

        }} key={8} className={styles.choice}>  <img src={Marketing}/> <p> Marketing</p> </div>
        
    </div>

    <button onClick={()=>{
        document.getElementById("form").requestSubmit()
    }} className={styles.btn}> Continue </button>
    
</div>

</div>
<div className={styles.right}>
<img src={St}/>

</div>
        </>) : (<>
            <div className={styles.left}>

<div className={styles.top}>
        <img src={Logo}/> 
        <p> CNNCT </p>
        </div>
<div className={styles.body}>

    <p className={styles.head}> Your Preferences </p>
    <form id = "form" onSubmit={async (e)=>{
        e.preventDefault()
        if(selectedKey > 0)
        {
            let user = JSON.parse(localStorage.getItem("details"))
            
            try{
                
                let request = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,{
                    ...user,
                    username

                },{withCredentials : true})

                navigate('/signin')

               
            }
            catch(err)
            {
                navigate('/signup')
                
            }
            localStorage.removeItem("details")
        }
    }}>
        <input onChange={(e)=>{
            setUsername(e.target.value)
        }} type='text' placeholder='Tell us your username'/>
    </form>
    <p className={styles.category}> Select one category that best describes your CNNCT:</p>

    <div className={styles.select}>
        <div key={1} onClick={()=>{
            setSelectedKey(1)
            

        }} style={{backgroundColor : selectedKey == 1? "#1877F2":"white",color:selectedKey == 1 ? "white":"black"}} className={styles.choice}> 
       <div className={styles.imgContainer}> 🏢 </div><p> Sales </p>
        </div>
        <div style={{backgroundColor : selectedKey == 2? "#1877F2":"white",color:selectedKey == 2? "white":"black"}} onClick={()=>{
            setSelectedKey(2)
            

        }} key={2} className={styles.choice}>
            
       <div className={styles.imgContainer}> 📚 </div>  <p> Education</p>
             </div>
        <div style={{backgroundColor : selectedKey == 3? "#1877F2":"white",color:selectedKey == 3? "white":"black"}} onClick={()=>{
            setSelectedKey(3)
            

        }} key={3} className={styles.choice}> <div className={styles.imgContainer}> <img src={Finance}/></div> <p> Finance</p> </div>
        <div style={{backgroundColor : selectedKey == 4? "#1877F2":"white",color:selectedKey == 4? "white":"black"}} onClick={()=>{
            setSelectedKey(4)
            

        }} key={4} className={styles.choice}> <div className={styles.imgContainer}> ⚖️ </div> <p> Government</p> </div>
        <div style={{backgroundColor : selectedKey == 5? "#1877F2":"white",color:selectedKey == 5? "white":"black"}} onClick={()=>{
            setSelectedKey(5)
            

        }} key={5} className={styles.choice}> <div className={styles.imgContainer}> <img src={Consulting}/> </div> <p> Consulting</p> </div>
        <div style={{backgroundColor : selectedKey == 6? "#1877F2":"white",color:selectedKey == 6? "white":"black"}} onClick={()=>{
            setSelectedKey(6)
            

        }} key={6} className={styles.choice}> <div className={styles.imgContainer}><img src={Recruiting}/>  </div> <p> Recruiting </p>  </div>
        
        <div style={{backgroundColor : selectedKey == 7? "#1877F2":"white",color:selectedKey == 7? "white":"black"}} onClick={()=>{
            setSelectedKey(7)
            

        }} key={7} className={styles.choice}> <div style={{fontSize : "25px"}} className={styles.imgContainer}> 🖥 </div> <p> Tech</p>  </div>
        <div style={{backgroundColor : selectedKey == 8? "#1877F2":"white",color:selectedKey == 8? "white":"black"}} onClick={()=>{
            setSelectedKey(8)
            

        }} key={8} className={styles.choice} >   <div  className={styles.imgContainer}> <img style={{height : "27px",width : "27px"}} src={Marketing}/> </div> <p> Marketing</p> </div>
        
    </div>

    <button onClick={()=>{
        document.getElementById("form").requestSubmit()
    }} className={styles.btn}> Continue </button>
    
</div>

</div>

        </>)}
    </div>
  )
}

export default Preferences