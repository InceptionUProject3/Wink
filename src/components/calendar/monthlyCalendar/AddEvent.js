import React, { useEffect, useState } from "react";
import "./monthlyCalendar.css";


const AddEvent = (props) => {
  const { today,addEvent, setAddEvent,holidaysOfMonth } = props;
  //console.log("holidaysOfMonth",holidaysOfMonth)
  const [eventDate,setEventDate] = useState()
  const [eventName,setEventName] = useState()
  const [open, setOpen] = useState(false);
  
  async function addEveToCalendar(newEvent){
    const newEventDate = today.clone().format("YYYY-MM-DD")  
   //setAddEvent()
    console.log("addEvent today", newEventDate)
    setOpen(true)
  }
  
    const addEventData = async () => {
      const userData= {
        //sender: employee_calendar_events.user_id,
        eventDate:eventDate,
        eventName:eventName
      }
      const data = JSON.stringify(userData)
      const res = await fetch(`/api/events/createEvents?eventDate=${eventDate}&eventName=${eventName}`,
      {
        method:"POST",
        headers:{ "Content-Type": "application/json", }
      ,body:data
      })
      console.log(" res in add event", res)
      setAddEvent()
    }

  return (

    <div>
      <button className="addEventButton" onClick={addEveToCalendar}> +</button>
      {open&&(<div className="addEventModal">
        <form action="form" method="post"  onSubmit={addEventData}>

        <label for="eventDate">Event Name:</label>
        <input type="text" id="date" name="eventDate"/><br/><br/>
        <label for="eventName">Event Name:</label>
        <input type="text" id="lname" name="eventName"/><br/><br/>
        <input type="submit" value="Submit"/>

        </form>

      </div>)}
    </div>
  );
};

export default AddEvent;
