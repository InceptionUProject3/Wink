/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Container } from "@mui/system";
import MonthlyCalendarHeader from "./MonthlyCalendarHeader"

import "./monthlyCalendar.css"

/**  UI allowing the user to watching headers weekdays. */
const MonthlyCalendar = () => {
  const weekdayHeaders = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  /** For fetching data, Use useEffect and pass [] as a second argument to make sure it fires only on initial mount. */
  const [today, setToday] = useState(moment());
  const [monInCalendar, setMonInCalendar] = useState(moment());
  const [nav, setNav] = useState(0);
  const theDate = new Date();
  const month = theDate.getMonth();
  const year = theDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1);
  const [monthsArray, setMonthsArray] = useState();

  useEffect(() => {
    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const paddingDays = weekdayHeaders.indexOf(dateString.split(", ")[0]);
    let monthArray = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;
      if (i > paddingDays) {
        monthArray.push({
          value: i - paddingDays,
          isCurrentDay: i - paddingDays === today && nav === 0,
          date: dayString,
        });
      } else {
        monthArray.push({
          value: "",
          isCurrentDay: false,
          date: "",
        });
      }
    }
    setToday();
    setMonthsArray(monthArray);
  }, []);
  
<<<<<<< HEAD
<<<<<<< HEAD:src/components/calendar/monthlyCalendar/monthlyCalendar.js
/** This resources below are in comments yet because problably will be use in the future. 
Line 75 to 82 contents this resources. */

  // let weekdayStyle = {
  //   backgroundColor: "var(--mainHeader)",
  //   textAlign:"center",
  //   display: "flex",
  //   width: "flex",
  //   height: "60px",
  //   color: "var(--headerWhiteFont)",
  // };

  /** Style props */
  let weekdayHeadersStyle = {
    display : "grid",
    width: "100%",
    textAlign: "center",
    flexWrap: "wrap",
    fontWeight: "500",
    fontSize: "larger",
    alignContent: "center",
    margin: "auto",
    textTransform: "uppercase",
    gridTemplateColumns: "repeat(7,1fr)"
    
  };
=======
// let getNextMonth = () => {
//     setMonInCalendar ((next) => next?.clone().add(1, "month"));
//     console.log("setMonInCalendar next", monInCalendar.format("MMM"));
// };

// let getPreMonth = () => {
//   setMonInCalendar ((pre) => pre?.clone().subtract(1,"month"))
//   console.log("setMonInCalendar previous", monInCalendar.format("MMM"));
// }
>>>>>>> main:src/components/calendar/monthlyCalendar/MonthlyCalendar.js

  return (
=======
 return (
>>>>>>> main
    <div>
      <div>
        <Container alignContent={"center"}>
          <br />
          <MonthlyCalendarHeader monInCalendar={monInCalendar} setMonInCalendar={setMonInCalendar} weekdayHeaders={weekdayHeaders}/>
          
          <br />
          
          <div className="mainGridStyle">
             {/* <div className="style">           */}
            {monthsArray?.map((day, index) => {
              
              // console.log("day is", day);
              return <div key={`day ${index}`}>
                <div className="text">
                {day.value}</div></div>;
            })}

            {/* </div> */}
            
          </div>
        </Container>
      </div>
    </div>
  );
};


/** It's part of the ES6 module system thats defines a default export. In the case of Wink project MonthlyCalendar. */
export default MonthlyCalendar;
