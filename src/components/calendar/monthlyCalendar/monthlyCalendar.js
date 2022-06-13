import React, { useEffect, useState } from "react";
import moment from "moment";
import { Container } from "@mui/system";



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
  const [monInCalendar, setMonInCalendar] = useState(moment());
  const [nav, setNav] = useState(0);
  const theDate = new Date();
  const month = theDate.getMonth();
  const year = theDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1);
  const [monthsArray, setMonthsArray] = useState();

  //console.log("monthsArray in mon cal", monthsArray);
  console.log("monInCalendar in mon cal", monInCalendar.format("MMM"));

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

    let weekdayHeadersStyle = {
    display: "grid",
    width: "100%",
    textAlign: "center",
    flexWrap: "wrap",
    fontWeight: "500",
    fontSize: "larger",
    alignContent: "center",
    margin: "auto",

    gridTemplateColumns: "repeat(7,1fr)",
  };

  return (
    <div>
      <div>
        <Container alignContent={"center"}>
        
          <br />
          
            <div> <h1>{monInCalendar.format("MMM")}</h1></div>
            <div style={weekdayHeadersStyle}>
              {weekdayHeaders.map((day, index) => {
                return <div style={weekdayHeadersStyle}>{day}</div>;
              })}
            </div>

            <br />
            <div style={mainGridStyle}>
              {monthsArray?.map((day, index) => {
                // console.log("day is", day);
                return <div>{day.value}</div>;
              })}
            </div>
          
        </Container>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
