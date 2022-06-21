import React, { useEffect, useState } from "react";
import moment from "moment";
import { Container } from "@mui/system";
import MonthlyCalendarHeader from "./MonthlyCalendarHeader";

import "./monthlyCalendar.css";

const MonthlyCalendar = (props) => {
  const weekdayHeaders = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [today, setToday] = useState(moment());
  const [monInCalendar, setMonInCalendar] = useState(moment());
  const [theDate, setDate] = useState(new Date());
  const [nav, setNav] = useState(0);
  //const theDate = new Date();
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
          />

          <br />

          <div className="mainGridStyle">
            {monthsArray?.map((day, index) => {
              // console.log("day is", day);
              return (
                <div key={`day ${index}`}>
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
