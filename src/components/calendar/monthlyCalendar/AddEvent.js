
import moment from "moment";
import React, { useEffect, useState } from "react";
import "./monthlyCalendar.css";

const AddEvent = (props) => {
  const {
    today,
    day,
    addEvent,
    setAddEvent,
    holidaysOfMonth,
    setholidaysOfMonth,
  } = props;
  
  const [eventDate, setEventDate] = useState();
  const [message,setMessage] = useState()
  const [eventName, setEventName] = useState("");
  const [open, setOpen] = useState(false);

  async function addEveToCalendar(newEvent) {
    // const addtoholiday = () => {
    //   setholidaysOfMonth((pre) => [...pre, "New"]);
    // };
    
    setAddEvent();
    //console.log("addEvent today", newEventDate);
    setOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      //sender: employee_calendar_events.user_id,
      date: moment(day.date).format("YYYY-MM-DD"),
      name: eventName,
    };
    console.log("day.date",day.date)
    setholidaysOfMonth([...holidaysOfMonth,userData])
    const data = JSON.stringify(userData);
    //console.log("Event data");
    const res = await fetch(`/api/createEvents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    // setMessage(res.message)
    // if(res.status==='Event saved'){
    //   setholidaysOfMonth()
    // }
    
    const response = await res.json();
    //console.log(" response in add event", response);
    setAddEvent();
    setOpen(false)
  };

  const changeName = (e) => {
    const value = e.target.value;
    //console.log("name value", value)
    setEventName(value);
  };

  return (
    <div>
      <button className="addEventButton" onClick={addEveToCalendar}>
        {/* {message && (<div><lable style={{ color: "red" }}>{message}!</lable></div>)} */}
        +
      </button>
      {open && (
        <div className="addEventModal">
          <button className="eventclose" onClick={() => setOpen(false)}>
            x
          </button>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="eventDate">Event Date: </label>
            <div>{moment(day.date).format("YYYY-MM-DD")}</div>

            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="name"
              name="eventName"
              onChange={changeName}
              value={eventName}
            />
            {/* <TextField label={'Event Name'} id="event-name" margin="dense" /> */}
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
