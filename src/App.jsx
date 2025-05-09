import "./App.css";

import Logo from "./components/Logo.svg";
import Demo from "./components/Demo.svg";
import R1 from './components/R1.svg';
import R2 from './components/R2.svg';
import { useEffect,useRef } from "react";
import Flo from './components/Flo.svg'
import I1 from './components/I1.svg'
import I2 from './components/I2.svg'
import I3 from './components/I3.svg'
import I4 from './components/I4.svg'
import I5 from './components/I5.svg'
import I6 from './components/I6.svg'
import I7 from './components/I7.svg'
import I8 from './components/I8.svg'
import I9 from './components/I9.svg'
import Tkt from './components/Tkt.svg'
import Cnn from './components/Cnn.svg'
import Ig from './components/Ig.svg'
import Yt from './components/Yt.svg'
import Twt from './components/Twt.svg'
import { useNavigate } from "react-router-dom";





function App({isMobile}) {
  const containerRef = useRef(null);
  
 
  const navigate = useNavigate();
  useEffect(()=>{

    
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = () => {
      container.classList.add("active");
      clearTimeout(container.timer);
      container.timer = setTimeout(() => {
        container.classList.remove("active");
      }, 1000);
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return(<div ref={containerRef} className="container"> 
  
  {!isMobile? (<>  <div className="top">
        <div className="left">
          <img src={Logo} />
          <p> CNNCT </p>
        </div>

        <button onClick={()=>{
          navigate('/signup')
        }}> Sign Up free</button>
      </div>
      <div className="heading">
     
        <p> CNNCT-Easy </p>
        <p> Scheduling Ahead</p>
        <button onClick={()=>{
          navigate('/signup')
        }}> Sign Up free</button>
        <img src={Demo} />
        <p className="Inter sub">
          
          Simplified scheduling for you and your team
        </p>
        

        

        
        

        <p className="Inter sub2" >
          
          CNNCT eliminates the back-and-forth of scheduling meetings so you can
          focus on what matters. Set your availability, share your link
        </p>
        <p className="Inter sub2"> and let
          others book time with you instantly.</p>
        

        
      </div>

      <div className="lr"> 

        <div className="left">
          <div className="hd">
          <p className="Inter sub"> Stay Organized with Your Calendar & Meetings </p>
          </div>
          <p className="Inter pnt" > Seamless Event Scheduling </p>
          <ul>
          <li> View all your upcoming meetings and appointments in one place. </li>
           <li> Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts. </li>
           <li> Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts. </li>
          </ul>
          
        </div>

        <div className="right"> 
          <img className="img1" src={R1}/>
          <img className="img2" src={R2}/>
        </div>


      </div>

      <div className="review">
        <div className="revl">
          <div className="rev">
          <p className="Poppins"> Here's what our <span> customer </span> 
          has to says </p>
          </div>
          <button> Read Customer Stories </button>
        </div>
        <div className="revr">
          <img src={Flo}/>
          <div className="lor">
          <p className="Poppins"> allows users to schedule, host, and join virtual or in-person meetings with features like video conferencing. </p>
          </div>
        </div>
      </div>

      <div className="feedback"> 

        <div className="fdb grey">
          <p className="Poppins up"> Amazing tool!! Saved me months</p>
          <p className="exp"> Great for team collaboration, but the UI feels a bit cluttered—takes time to get used to 
          Smooth video calls and screen sharing, but notifications can be inconsistent at times.
          </p>

          <div className="details">
            <div className="profile"> </div>
            <div className="name">
              <p> Richard Illingworth </p>
              <p> Sr.Executive,spark.com</p>
            </div>
          </div>
        </div>
        <div className="fdb white">
        <p className="Poppins up"> Amazing tool!! Saved me months</p>
        <p className="exp"> Smooth video calls and screen sharing, but notifications can be inconsistent at times.
        Great for team collaboration, but the UI feels a bit cluttered—takes time to get used to  </p>
        <div className="details">
            <div className="profile"> </div>
            <div className="name">
              <p> Paul Riffle </p>
              <p> Team Lead,clonify.com</p>
            </div>
          </div>

        </div>
        <div className="fdb white">
        <p className="Poppins up"> Amazing tool!! Saved me months</p>
        <p className="exp"> Love the integration with other tools, but the mobile app lags occasionally during meetings
        Reliable for daily stand-ups, but file sharing needs better organization and faster syncing.
           </p>
           <div className="details">
            <div className="profile"> </div>
            <div className="name">
              <p> Richard Kettleborough </p>
              <p> CEO,origin.com</p>
            </div>
          </div>
        </div>
        <div className="fdb grey">
        <p className="Poppins up"> Amazing tool!! Saved me months</p>
        <p className="exp"> Reliable for daily stand-ups, but file sharing needs better organization and faster syncing. 
        Love the integration with other tools, but the mobile app lags occasionally during meetings
        </p>
        <div className="details">
            <div className="profile"> </div>
            <div className="name">
              <p> K Dharmasena </p>
              <p> SDE,shopify.com</p>
            </div>
          </div>

        </div>

      </div>


      <div className="apps"> 

        <p className="Poppins Int"> All Link Apps and Integrations </p>
        <div className="appInt">

          <div className="appDetails">

            <div className="icon"> <img src={I1}/> </div>
            <div className="descr">
              
              <p className="first"> Audiomack </p>
              <p className="second"> Add on  audiomack player to your link tree </p>
            
            </div>
            
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I2}/> </div>
          <div className="descr">

          <p className="first"> BandsIntown </p>
          <p className="second"> Drive ticket sales by listing your events </p>
            
             </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I3}/> </div>
          <div className="descr">

            <p className="first"> Bonfire </p>
            <p className="second"> Display and sell your custom merch</p>
            
          </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I4}/> </div>
          <div className="descr"> 
          <p className="first"> Books </p>
          <p className="second"> Promote books on your Linktree</p>
          </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I5}/> </div>
          <div className="descr">
          <p className="first"> Buy Me A Gift</p>
          <p className="second"> Let visitors support you with a small gift</p>
            
             </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I6}/> </div>
          <div className="descr">
          <p className="first"> Cameo </p>
          <p className="second"> Make impossible fan connections possible</p>
          </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I7}/> </div>
          <div className="descr">
          <p className="first">ClubHouse </p>
          <p className="second"> Let your community in on the conversation</p>  
          </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I8}/> </div>
          <div className="descr">
          <p className="first"> Community </p>
          <p className="second"> Let your community in on the conversation</p>  
          </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I9}/> </div>
          <div className="descr">
          <p className="first"> Contact Details </p>
          <p className="second"> Easily share downloadable contact details </p>  
          </div>
          </div>

        </div>

      </div>

      <div className="end"> 

        <div className="section">
          <div className="child1">
            <button onClick={()=>{
          navigate('/signin')
        }} className="btn1"> Login </button>
            <button onClick={()=>{
          navigate('/signup')
        }} className="btn2">Sign up free </button>
          </div>
          <div className="child child2">
            <p className="last">About CNNCT</p>
            <p className="last">Blog</p>
            <p className="last">Press</p>
            <p className="last">Social Good</p>
            <p className="last"> Contact</p>

          </div>
          <div className="child child3">
          <p className="last"> Careers</p>
            <p className="last">Getting Started</p>
            <p className="last"> Features and How-tos</p>
            <p className="last"> FAQs</p>
            <p className="last"> Report a Violation</p>
            
          </div>
          <div className="child child4">
          <p className="last"> Terms and Conditions</p>
            <p className="last"> Privacy Policy</p>
            <p className="last"> Cookie Notice</p>
            <p className="last"> Trust Center</p>
          </div>
        </div>

        <div className="social">
          <div className="c1">
            <p> We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging.</p>
          </div>
          <div className="c2">
            <img src={Twt}/>
            <img src={Ig}/>
            <img src={Yt}/>
            <img src={Tkt}/>
            <img src={Cnn}/>
          </div>
        </div>
        
        
      </div> </>) : 
      // Mobile View
      (<>  <div className="top">
        <div className="left">
          <img src={Logo} />
          <p> CNNCT </p>
        </div>

        <button onClick={()=>{
          navigate('/signup')
        }}> Sign Up free</button>
      </div>
      <div className="heading">
     
        <p> CNNCT-Easy </p>
        <p> Scheduling Ahead</p>
        <button onClick={()=>{
          navigate('/signup')
        }}> Join now</button>
        <img src={Demo} />
       
        <div className="mobInter">
          <p className="Inter sub">
          
          Simplified scheduling for 
        </p>
        <p className="Inter sub"> you and your team </p>
           </div>

        

        
        

  
        
          
          <div className="line3">
          <p className="Inter sub"> CNNCT eliminates the back-and-forth of scheduling meetings </p>
          <p className="Inter sub">   so you can focus on what matters. Set your availability, share </p>
          <p className="Inter sub"> your link and let
          others book time with you instantly. </p>
          </div>

        
      </div>

      

      

        <div className="right"> 
          <img className="img1" src={R1}/>
          <img className="img2" src={R2}/>
        </div>
        <p className="Inter mob"> Stay Organized with Your  </p>
        <p className="Inter mob">  Calendar & Meetings </p>
        <div className="left">
        <div className="hd">
          
          </div>
          <p className="Inter" > Seamless Event Scheduling </p>
          <ul>
          <li> View all your upcoming meetings and appointments in one place. </li>
           <li> Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts. </li>
           <li> Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts. </li>
          </ul>
          
        </div>


      
      <div className="customer">
      <p className="Poppins say"> Here's what our  </p>
        <p className="Poppins say blue"> customer </p>
        <p className="Poppins say"> has to says </p>
        <button> Read Customer Stories </button>
      </div>
        
      

      <div className="feedback"> 

        <div className="fdb grey">
          <p className="Poppins up"> Amazing tool!! Saved me months</p>
          <p className="exp"> Great for team collaboration, but the UI feels a bit cluttered—takes time to get used to 
          Smooth video calls and screen sharing, but notifications can be inconsistent at times.
          </p>

          <div className="details">
            <div className="profile"> </div>
            <div className="name">
              <p> Richard Illingworth </p>
              <p> Sr.Executive,spark.com</p>
            </div>
          </div>
        </div>
        <div className="fdb white">
        <p className="Poppins up"> Amazing tool!! Saved me months</p>
        <p className="exp"> Smooth video calls and screen sharing, but notifications can be inconsistent at times.
        Great for team collaboration, but the UI feels a bit cluttered—takes time to get used to  </p>
        <div className="details">
            <div className="profile"> </div>
            <div className="name">
              <p> Paul Riffle </p>
              <p> Team Lead,clonify.com</p>
            </div>
          </div>

        </div>
        <div className="fdb grey">
        <p className="Poppins up"> Amazing tool!! Saved me months</p>
        <p className="exp"> Love the integration with other tools, but the mobile app lags occasionally during meetings
        Reliable for daily stand-ups, but file sharing needs better organization and faster syncing.
           </p>
           <div className="details">
            <div className="profile"> </div>
            <div className="name">
              <p> Richard Kettleborough </p>
              <p> CEO,origin.com</p>
            </div>
          </div>
        </div>
        <div className="fdb white">
        <p className="Poppins up"> Amazing tool!! Saved me months</p>
        <p className="exp"> Reliable for daily stand-ups, but file sharing needs better organization and faster syncing. 
        Love the integration with other tools, but the mobile app lags occasionally during meetings
        </p>
        <div className="details">
            <div className="profile"> </div>
            <div className="name">
              <p> K Dharmasena </p>
              <p> SDE,shopify.com</p>
            </div>
          </div>

        </div>

      </div>


      <div className="app"> 

        <div className="mobApp">
        <p className="Poppins Int"> All Link Apps and  </p>
        <p className="Poppins Int"> Integrations </p>
        </div>
        <div className="appInts">

          <div className="appDetails">

            <div className="icon"> <img src={I1}/> </div>
            <div className="descr">
              
              <p className="first"> Audiomack </p>
              <p className="second"> Add on  audiomack player to your link tree </p>
            
            </div>
            
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I2}/> </div>
          <div className="descr">

          <p className="first"> BandsIntown </p>
          <p className="second"> Drive ticket sales by listing your events </p>
            
             </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I3}/> </div>
          <div className="descr">

            <p className="first"> Bonfire </p>
            <p className="second"> Display and sell your custom merch</p>
            
          </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I4}/> </div>
          <div className="descr"> 
          <p className="first"> Books </p>
          <p className="second"> Promote books on your Linktree</p>
          </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I5}/> </div>
          <div className="descr">
          <p className="first"> Buy Me A Gift</p>
          <p className="second"> Let visitors support you with a small gift</p>
            
             </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I6}/> </div>
          <div className="descr">
          <p className="first"> Cameo </p>
          <p className="second"> Make impossible fan connections possible</p>
          </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I7}/> </div>
          <div className="descr">
          <p className="first">ClubHouse </p>
          <p className="second"> Let your community in on the conversation</p>  
          </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I8}/> </div>
          <div className="descr">
          <p className="first"> Community </p>
          <p className="second"> Let your community in on the conversation</p>  
          </div>
          </div>
          <div className="appDetails">
          <div className="icon"> <img src={I9}/> </div>
          <div className="descr">
          <p className="first"> Contact Details </p>
          <p className="second"> Easily share downloadable contact details </p>  
          </div>
          </div>

        </div>

      </div>

      <div className="end"> 

        <div className="section">
          
          <div className="child child2">
            <p className="last">About CNNCT</p>
            <p className="last">Blog</p>
            <p className="last">Press</p>
            <p className="last">Social Good</p>
            <p className="last"> Contact</p>

          </div>
          <div className="child child3">
          <p className="last"> Getting Started</p>
            <p className="last">Careers</p>
            <p className="last"> Features</p>
            <p className="last"> FAQs</p>
            <p className="last"> Report</p>
            
          </div>
          <div className="child child4">
          <p className="last"> Terms and Conditions</p>
            <p className="last"> Privacy Policy</p>
            <p className="last"> Cookie Notice</p>
            <p className="last"> Trust Center</p>
          </div>
        </div>

        <div className="child1">
        <button onClick={()=>{
          navigate('/signin')
        }} className="btn1"> Login </button>
            <button onClick={()=>{
          navigate('/signup')
        }} className="btn2">Sign up free </button> 
        </div>

        <div className="social">
          
          <div className="c2">
            <img src={Twt}/>
            <img src={Ig}/>
            <img src={Yt}/>
            <img src={Tkt}/>
            <img src={Cnn}/>
          </div>

        </div>
        
        
        
        
      </div> <div className="gap"> </div> </>)}
  
  </div>)
  

  


  

}

export default App;
