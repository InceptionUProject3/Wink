import React, { useEffect, useState } from "react";
import moment from "moment";
import { Container, style } from "@mui/system";

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

  const [today, setToday] = useState(moment());
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
          value: "padding",
          isCurrentDay: false,
          date: "",
        });
      }
    }
    // console.log("padding days is", paddingDays);
    // console.log("Days in Month is ", daysInMonth);
    // console.log("month Array is", monthArray);
    setToday();
    setMonthsArray(monthArray);
  }, []);
  let mainGridStyle = {
    height: "auto",
    width: "100%",
    margin: "auto",
    display: "grid",
    flexWrap: "wrap",
    border: "1px solid black",
    gridTemplateColumns: "repeat(7,1fr)",
    gridAutoRows: "50px",
  };
  
  let weekdayStyle = {
    backgroundColor: "var(--mainHeader)",
    display: "flex",
    width: "100%",
    height: "60px",
    color: "var(--headerWhiteFont)",
  };

  let weekdayHeadersStyle = {
    width: "14.25%",
    padding: ".6%",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "larger",
    alignContent: "center",
    margin: "auto",
    textTransform: "uppercase",
  };

  return (
    <div>
      <Container>
        <div
          id="container"
          style={{
            width: "95%",
            border: "1px solid black",
            margin: "auto",
          }}
        >
          <div id="weekdays" style={weekdayStyle}>
            {weekdayHeaders.map((day, index) => {
              return (
                <div key={index} style={weekdayHeadersStyle}>
                  {day}
                </div>
              );
            })}
          </div>
          <div style={mainGridStyle}>
            {monthsArray?.map((day, index) => {
              // console.log("day is", day);
              return <div>{day.value}</div>;
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MonthlyCalendar;
