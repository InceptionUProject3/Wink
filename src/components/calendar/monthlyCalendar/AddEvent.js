import React, { useEffect, useState } from "react";
import "./monthlyCalendar.css";


const AddEvent = (props) => {
  const { today,addEvent, setAddEvent } = props;
  
  const [eventDate,setEventDate] = useState()
  const [eventName,setEventName] = useState()
  
  async function addEveToCalendar(newEvent){
    const newEventDate = today.clone().format("YYYY-MM-DD")  
   //setAddEvent()
    console.log("addEvent today", newEventDate)

  }

  useEffect(() => {
    const addEventData = async () => {
      //const res = await fetch(`/api/events/createEvents?eventDate=${eventDate}&eventName=${eventName}`){
      //   method:"POST",
      //   headers:{ "Content-Type": "application/json", }
      // },body:res,

      //console.log(" res in add event", res)
      //setAddEvent()
    }
    addEventData()
  }, []);


  return (
    <div>
      <button className="addEventButton" onClick={addEveToCalendar}> +</button>
      
    </div>
  );
};

export default AddEvent;
