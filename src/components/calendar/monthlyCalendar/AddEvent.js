import React, { useEffect, useState } from "react";
import "./monthlyCalendar.css";

const getEventsAll = async function () {
  
};

const AddEvent = (props) => {
  const { addEvent, setAddEvent } = props;

  useEffect(() => {
    // setAddEvent()
  }, [addEvent]);

  return (
    <div>
      <button className="addEventButton"> +</button>
    </div>
  );
};

export default AddEvent;
