import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import App from './App'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Preferences from './Preferences'
import Events from './Events'
import { useState,useEffect } from 'react'


function Rtr() {
  const[isMobile,setMobile] = useState(false)
  useEffect(()=>{
    if(window.innerWidth <= 480)
      {
          setMobile(true)
          
      }
  })
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element = {<App isMobile = {isMobile} />}/>
        <Route path='/signin' element = {<SignIn isMobile = {isMobile}  />}/>
        <Route path = '/signup' element = {<SignUp isMobile = {isMobile} />}/>
        <Route path = '/preferences' element ={<Preferences isMobile = {isMobile} />}/>
        <Route path="/event" element={<Events isMobile = {isMobile} />}/>


    </Routes>
    
    </BrowserRouter>
  )
}

export default Rtr