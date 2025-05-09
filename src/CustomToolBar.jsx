import { useState } from "react";
const CustomToolBar = (toolbar) => {
    const goToBack = () =>{
      toolbar.onNavigate('PREV');
      setActive(1)
    }
    const goToNext = () => {
      toolbar.onNavigate('NEXT');
      setActive(2)
    }
    const goToToday = () => {
      toolbar.onNavigate('TODAY');
      setActive(3)
    }
    const[active,setActive] = useState(null)
  
    const setView = (view) => toolbar.onView(view);
  
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button style={{backgroundColor : active==1? "#1877F2":"white" ,color : active==1?"white":"black"}} onClick={goToBack}>Back</button>
          <button style={{backgroundColor : active==3? "#1877F2":"white" ,color : active==3?"white":"black"}} onClick={goToToday}>Today</button>
          <button style={{backgroundColor : active==2? "#1877F2":"white" ,color : active==2?"white":"black"}} onClick={goToNext}>Next</button>
        </span>
  
        <span className="rbc-toolbar-label">{toolbar.label}</span>
  
        <span className="rbc-btn-group">
          <button
            className={toolbar.view === 'month' ? 'rbc-active' : ''}
            onClick={() => {
              setView('month')
              setActive(3)
            }}
          >
            Month
          </button>
          <button
            className={toolbar.view === 'week' ? 'rbc-active' : ''}
            onClick={() =>{
              setView('week')
              setActive(3)
            }}
          >
            Week
          </button>
          <button
            className={toolbar.view === 'day' ? 'rbc-active' : ''}
            onClick={() => {
              setView('day')
              setActive(3)
            }}
          >
            Day
          </button>
          <button
            className={toolbar.view === 'year' ? 'rbc-active' : ''}
            onClick={() => {
              setView('year')
              setActive(3)
            }}
          >
            Year
          </button>
        </span>
      </div>
    );
  };

  export default CustomToolBar