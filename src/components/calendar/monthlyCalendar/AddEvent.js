import { FormControl, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./monthlyCalendar.css";

const AddEvent = (props) => {
  const { today,day, addEvent, setAddEvent, holidaysOfMonth } = props;
  //console.log("day",day)
  const [eventDate, setEventDate] = useState();
  const [eventName, setEventName] = useState();
  const [open, setOpen] = useState(false);

  async function addEveToCalendar(newEvent) {
    const newEventDate = today.clone().format("YYYY-MM-DD")
    setAddEvent()
    //console.log("addEvent today", newEventDate);
    setOpen(true);
  }

  const addEventData = async (e) => {
e.preventDefault();
    const userData = {
      //sender: employee_calendar_events.user_id,
      eventDate: day.date,
      eventName: eventName,
    };
    
     const data = JSON.stringify(userData);
     console.log("Event data")
    const res = await fetch(`/api/createEvents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    const response = await res.json()
    //console.log(" res in add event", response);
    setAddEvent();
  };
  // const changeDate =(e)=>{
  //   const value = e.target.value;
  //   //console.log("value", value)
  //   setEventDate(value)
  // }

  const changeName =(e) => {
    const value = e.target.value
    //console.log("name value", value)
    setEventName(value)
  }

  return (
    <div>
      <button className="addEventButton" onClick={addEveToCalendar}>
        {" "}
        +
      </button>
      {open && (
        <div className="addEventModal">
          <button className="eventclose" onClick={() => setOpen(false)}>
            x
          </button>
          <FormControl  onClick={(e)=>addEventData(e)}>
            <label for="eventDate">Event Date:</label>
            {/*<input type="text" id="date" name="eventDate" onChange={changeDate} value={eventDate}/>*/}
            <div>{day.date}</div>
            <br />
            <br />
            {/* <label for="eventName">Event Name:</label>
            <input type="text" id="name" name="eventName"  onChange={changeName} value={eventName}/> */}
            <TextField label={'Event Name'} id="event-name" margin="dense" />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </FormControl>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
