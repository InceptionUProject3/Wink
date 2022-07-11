import React, { useEffect, useState } from "react";
import "./monthlyCalendar.css";

const AddEvent = (props) => {
  const { addEvent, setAddEvent } = props;
  const [eventDate,setEventDate] = useState()
  const [eventName,setEventName] = useState()

  async function addEveToCalendar(newEvent){
    

  }

  useEffect(() => {
    const addEventData = async () => {
      //const res = await fetch(`/api/events/createEvents?eventDate=${eventDate}&eventName=${eventName}`)
      //console.log(" res in add event", res)
      //setAddEvent()
    }
    addEventData()
  }, []);


  return (
    <div>
      <button className="addEventButton" > +</button>
      {/* onClick={addEveToCalendar()} */}
    </div>
  );
};

export default AddEvent;
