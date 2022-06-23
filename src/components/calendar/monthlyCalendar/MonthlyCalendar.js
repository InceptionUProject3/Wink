import React, { useEffect, useState } from "react";
import moment from "moment";
import { Container } from "@mui/system";
import MonthlyCalendarHeader from "./MonthlyCalendarHeader";
import AddEvent from "./AddEvent";

import "./monthlyCalendar.css";

const MonthlyCalendar = (props) => {
  const {today, setToday} = props
  
  const weekdayHeaders = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  
  const [monInCalendar, setMonInCalendar] = useState(moment());
  const [theDate, setDate] = useState(new Date());
  const [nav, setNav] = useState(0);
  const month = theDate.getMonth();
  const year = theDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1);
  const [monthsArray, setMonthsArray] = useState();
  const [addEvent, setAddEvent] = useState();

  useEffect(() => {
    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const paddingDays = weekdayHeaders.indexOf(dateString.split(", ")[0]);
    const endPaddingDays = 7 - ((paddingDays + daysInMonth) % 7);
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

    for (let i = 0; i < endPaddingDays; i++) {
      monthArray.push({
        value: "",
        isCurrentDay: false,
        date: "",
      });
    }

    setToday();
    setMonthsArray(monthArray);
  }, [theDate]);
  

  return (
    <div>
      <div>
        <Container alignContent={"center"}>
          <br />
          <MonthlyCalendarHeader
            monInCalendar={monInCalendar}
            setMonInCalendar={setMonInCalendar}
            weekdayHeaders={weekdayHeaders}
            setDate={setDate}
            today={today}
            setToday={setToday}
            
          />

          <br />

          <div className="mainGridStyle">
            {monthsArray?.map((day, index) => {
              // const isWeekend = moment(day).day() === 0 || moment(day).day() === 6 ? "Weekend" : "";
              // let isToday = day === moment().startOf("day").format() ? "Today" : "";
              
              return (
                <div className="eventDiv" key={`day ${index}`}>
                  <div className="eventDivDiv">
                    <AddEvent addEvent={addEvent} />
                  </div>
                  {/* <div
                    className={`"abc" ${isToday} ${isWeekend}`}
                    key={`monthsArray ${index}`}
                    
                  ></div> */}
                    
                  <div className="text">{day.value}</div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
