import React, { useState, useEffect, useRef } from "react";
import styles from "./Availability.module.css";
import Menu from "./components/Menu.svg";
import Calend from "./components/Calend.svg";
import Fill from "./components/Fill.svg";
import Into from "./components/Into.svg";
import Add from "./components/Add.svg";
import Copy from "./components/Copy.svg";
import axios from "axios";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './App.css'
import Emj from './components/Emj.svg'




import Yearview from "./Yearview";
import CustomToolBar from './CustomToolBar' 

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});




// we have to fetch accepted rejected past events




// lets fetch from the backend
function Availability1({ user, activeComponent,isMobile}) {
  const [view, setView] = useState("month"); // "day", "week", "month", "agenda"
  const [date, setDate] = useState(new Date());
  const[events,setEvents] = useState([])

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleNavigate = (date) => {
    setDate(date);
  };

  const [select, setSelect] = useState(1);
  const [arr, setArr] = useState(
    Array(6)
      .fill()
      .map(() => [{ start: "", end: "" }])
    // at start it will be empty
  );
  const [checked, setChecked] = useState(Array(6).fill(false));
  let availability = [
    { day: "Monday", slots: [{ start: "", end: "" }] },
    { day: "Tuesday", slots: [{ start: "", end: "" }] },
    { day: "Wednesday", slots: [{ start: "", end: "" }] },
    { day: "Thursday", slots: [{ start: "", end: "" }] },
    { day: "Friday", slots: [{ start: "", end: "" }] },
    { day: "Saturday", slots: [{ start: "", end: "" }] },
    { day: "Sunday", slots: [{ start: "", end: "" }] },
  ]; // fetched value will be of this structure
  const hasUpdated = useRef(false);

  // initially checkbox isnt filled so it will have value false

  

  // so we have to get pending and update Availability

  async function getAvailability() {
    try {
      let request = await axios.get(
        `https://meetingsbackend.onrender.com/user/getAvailability/${user.id}`,
        { withCredentials: true }
      );
      // lets see the structure and set the values
      // arr contains array of time slots
      // we should have new ARR
      let fetchedAvailability = request.data.availability;

      let newArr = fetchedAvailability.map(
        (day) => (day.slots.length > 0 ? day.slots : [{ start: "", end: "" }]) // Make sure it's an array of slots
      );
      setArr(newArr);
      let fetchedEvents = request.data.events.map((item) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
      }));
     
      setEvents(fetchedEvents)


      // lets update checked array

      // update checked array
      let newChecked = checked.map((item, index) => {
        if (
          newArr[index].length > 1 ||
          newArr[index][0].start.length > 0 ||
          newArr[index][0].end.length > 0
        ) {
          return true;
        }
        return false;
      });
      setChecked(newChecked);
    } catch (err) {

    }
  }

  // get availability function is working fine we have to write update availability function
  async function updateAvailability(passedArr) {
    try {
      availability[0].slots = passedArr[0];
      availability[1].slots = passedArr[1];
      availability[2].slots = passedArr[2];
      availability[3].slots = passedArr[3];
      availability[4].slots = passedArr[4];
      availability[5].slots = passedArr[5];
      let request = await axios.put(
        `https://meetingsbackend.onrender.com/user/updateAvailability/${user.id}`,
        { updatedAvailability: availability },
        { withCredentials: true }
      );
    } catch (err) {
      
    }
  }

  

  useEffect(() => {
    getAvailability();
    
  }, []);

  const arrRef = useRef(arr);

  useEffect(() => {
    arrRef.current = arr;
  }, [arr]);

  useEffect(() => {
    
    return () => {
      if (!hasUpdated.current) {
        updateAvailability(arrRef.current); // shoud be called when the compoenent unmounts
        hasUpdated.current = true;
      }
    };
  }, [activeComponent]);

  // Array    of  Array  Of Objects
  // [  [  {start : " ",end = " "},{start : " ",end = " "},{start : " ",end = " "}   ]   ]

  const handleCheckboxChange = (dayIndex) => {
    setChecked((prev) => {
      const newChecked = [...prev];
      newChecked[dayIndex] = !newChecked[dayIndex];
      //updating checkbox changes
      // if checkbox changes its value we are updating
      return newChecked;
    });

    setArr((prevArr) => {
      const newArr = [...prevArr];
      if (!checked[dayIndex]) {
        newArr[dayIndex] = [{ start: "08:00", end: "20:00" }];
        // initial if initial field isnt filled  the field will have default value available for whole day
      } else {
        newArr[dayIndex] = [{ start: "", end: "" }];
        // next if the field is updated  we will change timings
      }
      return newArr;
    });
  };

  const handleTimeChange = (dayIndex, index, field, value) => {
    setArr((prevArr) => {
      const newArr = [...prevArr];
 
      newArr[dayIndex][index][field] = value;

      if (newArr[dayIndex][0].start !== "" && newArr[dayIndex][0].end !== "") {
        if (
          newArr[dayIndex][0].start === "00:00" &&
          newArr[dayIndex][0].end === "23:59"
        ) {
          newArr[dayIndex] = [{ start: "", end: "" }];
        }
      }
      return newArr;
    });
  };

  const addTimeField = (dayIndex) => {
    // ensure a new time field is created only if its previous field is completely filled
    if (
      arr[dayIndex].length === 0 ||
      (arr[dayIndex][arr[dayIndex].length - 1].start &&
        arr[dayIndex][arr[dayIndex].length - 1].end)
    ) {
      setArr((prevArr) => {
        const newArr = [...prevArr];
        newArr[dayIndex].push({ start: "", end: "" });
        return newArr;
      });
    }
  };

  const removeTimeField = (dayIndex, index) => {
    setArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[dayIndex].splice(index, 1);
      // we can remove fields htat are starting after initial fields
      if (newArr[dayIndex].length === 0)
        newArr[dayIndex] = [{ start: "", end: "" }];
      return newArr;
    });
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // days[0] = Monday days[1] = Tuesday....

  return (
    <div className={styles.create}>
      {!isMobile ? (<>
        <div className={styles.up}>
        <p className={styles.first}>Availability</p>
        <p className={styles.second}>
          Configure times when you are available for bookings
        </p>
      </div>

      <div className={styles.header}>
        <div
          onClick={() => setSelect(1)}
          className={styles.view1}
          style={{ backgroundColor: select === 1 ? "white" : "#E8E8E8" }}
        >
          <img src={Menu} alt="menu" /> <p>Availability</p>
        </div>
        <div
          onClick={() => setSelect(2)}
          className={styles.view2}
          style={{ backgroundColor: select === 2 ? "white" : "#E8E8E8" }}
        >
          <img src={Calend} alt="calendar" /> <p>Calendar View</p>
        </div>
      </div>

      {select === 1 ? (
        <div className={styles.avail}>
          <div className={styles.top}>
            <div className={styles.same}>
              <p>Activity</p>
              <p>Event type ⌵</p>
            </div>
            <div className={styles.same}>
              <p>Time Zone</p>
              <p>Indian Standard Time</p>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.week}>
            <p>Weekly hours</p>
            <div className={styles.list}>
              <div className={styles.field}>
                <div className={styles.c1}>
                  <img
                    style={{ height: "11px", width: "11px" }}
                    src={Fill}
                    alt="fill"
                  />
                  <div>Sun</div>
                </div>
                <div className={styles.c2}>Unavailable</div>
                <div className={styles.c3}>
                  <img src={Add} alt="add" />
                  <img src={Copy} alt="copy" />
                </div>
              </div>
              {days.map((day, dayIndex) => (
                <div key={dayIndex} className={styles.day}>
                  <div className={styles.actual}>
                    <div className={styles.child1}>
                      <input
                        type="checkbox"
                        checked={checked[dayIndex]}
                        onChange={() => handleCheckboxChange(dayIndex)}
                      />
                      <div>{day}</div>
                    </div>

                    <div className={styles.child2}>
                      <input
                        type="time"
                        value={arr[dayIndex][0].start}
                        onChange={(e) =>
                          handleTimeChange(dayIndex, 0, "start", e.target.value)
                        }
                      />
                      <div className={styles.btw}></div>
                      <input
                        type="time"
                        value={arr[dayIndex][0].end}
                        onChange={(e) =>
                          handleTimeChange(dayIndex, 0, "end", e.target.value)
                        }
                      />
                    </div>

                    <div className={styles.child3}>
                      <img
                        onClick={() => addTimeField(dayIndex)}
                        src={Add}
                        alt="add"
                      />
                      <img src={Copy} alt="copy" />
                    </div>
                  </div>
                  {arr[dayIndex].map(
                    (timeSlot, index) =>
                      index > 0 && (
                        <div key={index} className={styles.addn}>
                          <input
                            type="time"
                            value={timeSlot.start}
                            onChange={(e) =>
                              handleTimeChange(
                                dayIndex,
                                index,
                                "start",
                                e.target.value
                              )
                            }
                          />
                          <div className={styles.btw}></div>
                          <input
                            type="time"
                            value={timeSlot.end}
                            onChange={(e) =>
                              handleTimeChange(
                                dayIndex,
                                index,
                                "end",
                                e.target.value
                              )
                            }
                          />
                          <img
                            src={Into}
                            alt="delete"
                            onClick={() => removeTimeField(dayIndex, index)}
                          />
                        </div>
                      )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (<div className={styles.calendar}>

            <div className={styles.top}>
            <div className={styles.same}>
              <p>Activity</p>
              <p>Event type ⌵</p>
            </div>
            <div className={styles.same}>
              <p>Time Zone</p>
              <p>Indian Standard Time</p>
            </div>
          </div>
          <div className={styles.line1}> </div>
          <div className={styles.calendly}> 
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            
            views={{ month: true, week: true, day: true, year: Yearview }}
            view={view}
            date={date}
            onView={handleViewChange} 
            onNavigate={handleNavigate}
            components={{toolbar: CustomToolBar,
            }}
            showAllDayEvents={false}
            /*style: {
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '6px',
              }*/

                eventPropGetter={(event)=>{
                  return {
                    className : `${view}-${event.status}`
                  }
                }}

            popup
            nowIndicator={false}
            
            
            

          />
          </div>
             
        
         </div>) }
      </>) :
      // ****** Mobile  View  ******
      <> 
      <div className={styles.up}>
        <p className={styles.first}>Availability <img src={Emj}/> </p>
        <p className={styles.second}>
          Configure times when you are available for bookings
        </p>
      </div>

      <div className={styles.header}>
        <div
          onClick={() => setSelect(1)}
          className={styles.view1}
          style={{ backgroundColor: select === 1 ? "white" : "#E8E8E8" }}
        >
          <img src={Menu} alt="menu" /> <p>Availability</p>
        </div>
        <div
          onClick={() => setSelect(2)}
          className={styles.view2}
          style={{ backgroundColor: select === 2 ? "white" : "#E8E8E8" }}
        >
          <img src={Calend} alt="calendar" /> <p>Calendar View</p>
        </div>
      </div>
      
      {select === 1 ? (
        <div className={styles.avail}>
          <div className={styles.top}>
            <div className={styles.same}>
              <p>Activity</p>
              <p>Event type ⌵</p>
            </div>
            <div className={styles.same}>
              <p>Time Zone</p>
              <p>Indian Standard Time</p>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.week}>
            
            <div className={styles.list}>
              <div className={styles.field}>
                <div className={styles.c1}>
                  <img
                    style={{ height: "15px", width: "15px",borderRadius : "0.4dvb"}}
                    src={Fill}
                    alt="fill"
                  />
                  <div>Sun</div>
                </div>
                <div className={styles.c2}>Unavailable</div>
                <div className={styles.c3}>
                  <img src={Add} alt="add" />
                  <img src={Copy} alt="copy" />
                </div>
              </div>
              {days.map((day, dayIndex) => (
                <div key={dayIndex} className={styles.day}>
                  <div className={styles.actual}>
                    <div className={styles.child1}>
                      <input
                        type="checkbox"
                        checked={checked[dayIndex]}
                        onChange={() => handleCheckboxChange(dayIndex)}
                      />
                      <div>{day}</div>
                    </div>

                    <div className={styles.child2}>
                      <input
                        type="time"
                        value={arr[dayIndex][0].start}
                        onChange={(e) =>
                          handleTimeChange(dayIndex, 0, "start", e.target.value)
                        }
                      />
                      <div className={styles.btw}></div>
                      <input
                        type="time"
                        value={arr[dayIndex][0].end}
                        onChange={(e) =>
                          handleTimeChange(dayIndex, 0, "end", e.target.value)
                        }
                      />
                    </div>

                    <div className={styles.child3}>
                      <img
                        onClick={() => addTimeField(dayIndex)}
                        src={Add}
                        alt="add"
                      />
                      <img src={Copy} alt="copy" />
                    </div>
                  </div>
                  {arr[dayIndex].map(
                    (timeSlot, index) =>
                      index > 0 && (
                        <div key={index} className={styles.addn}>
                          <input
                            type="time"
                            value={timeSlot.start}
                            onChange={(e) =>
                              handleTimeChange(
                                dayIndex,
                                index,
                                "start",
                                e.target.value
                              )
                            }
                          />
                          <div className={styles.btw}></div>
                          <input
                            type="time"
                            value={timeSlot.end}
                            onChange={(e) =>
                              handleTimeChange(
                                dayIndex,
                                index,
                                "end",
                                e.target.value
                              )
                            }
                          />
                          <img
                            src={Into}
                            alt="delete"
                            onClick={() => removeTimeField(dayIndex, index)}
                          />
                        </div>
                      )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (<div className={styles.calendar}>

            <div className={styles.top}>
            <div className={styles.same}>
              <p>Activity</p>
              <p>Event type ⌵</p>
            </div>
            <div className={styles.same}>
              <p>Time Zone</p>
              <p>Indian Standard Time</p>
            </div>
          </div>
          <div className={styles.line1}> </div>
          <div className={styles.calendly}> 
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            
            views={{ month: true, week: true, day: true, year: Yearview }}
            view={view}
            date={date}
            onView={handleViewChange} 
            onNavigate={handleNavigate}
            components={{toolbar: CustomToolBar,
            }}
            showAllDayEvents={false}
            /*style: {
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '6px',
              }*/

                eventPropGetter={(event)=>{
                  return {
                    className : `${view}-${event.status}`
                  }
                }}

            popup
            nowIndicator={false}
            
            
            

          />
          </div>
             
        
         </div>) }
      </>}
    </div>
  );
}

export default Availability1;
