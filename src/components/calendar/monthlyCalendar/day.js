import React, {  useState } from "react";
import moment from "moment";
//import MonthlyCalendarHeader from "./monthlyCalendarHeader";

const Day = () => {
  const [today, setToday] = useState(moment());
  const [daysInMonth, setDaysInMonth] = useState();

  const className = `day ${today.value === "padding" ? "padding" : ""} ${
    today.isCurrentDay ? "currentDay" : ""
  }`;
  const borderColor = function (value) {
    if (value !== "padding") {
      return " 1px solid lightGrey";
    } else return " 1px solid white";
  };

   
  return(
    <div
    className={className}
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

export default Day;
