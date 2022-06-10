/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import React, { useState } from "react";
import moment from "moment";

/** This resources below are in comments yet because problably will be use in the future. 
Line 7 contents this resource. */
//import MonthlyCalendarHeader from "./monthlyCalendarHeader";

/**  UI allowing the user to obsever the relative day of the month. Specific day as "Today" */
const Day = () => {
  const [today, setToday] = useState(moment());
  const [daysInMonth, setDaysInMonth] = useState();

/** Const content "CSS applied" props */
  const className = `day ${today.value === "padding" ? "padding" : ""} ${
    today.isCurrentDay ? "currentDay" : ""
  }`;

/** Const content "CSS applied" props */  
  const borderColor = function (value) {
    // Condition.
    if (value !== "padding") {
      return " 1px solid lightGrey";
    } else return " 1px solid white";
  };
/** Returns the result of "CSS applied" */
  return(
    <div
    className={className}
    // CSS proprieties.
      style={{
        width: "14%",
        height: "130px",
        cursor: "pointer",
        boxSizing: "borderBox",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        border: borderColor(today.value),
        zIndex: "100",
        position: "relative",
      }}

    >
      {daysInMonth?.map((e,index)=>(
      <div key={`daysInMonth ${index}`}>
        {e}
      </div>
      ))}

    </div>
  )};

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project Day. */
export default Day;