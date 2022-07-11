import React, { useContext, useEffect, useState } from "react";
import { Container } from "@mui/system";
import MonthlyCalendarHeader from "./MonthlyCalendarHeader";
import AddEvent from "./AddEvent";
import "./monthlyCalendar.css";
import { LoginContext } from "../../authentication/LoginProvider";
import { StoreContext } from "../../authentication/StoreProvider";
import DisplayHolidays from "./DisplayHolidays";
import MonthlySchedBar from "./MonthlySchedBar";

const MonthlyCalendar = (props) => {
  const userId = useContext(LoginContext).user?.id || 9;
  const storeId = useContext(StoreContext).store?.Store_idStore || 1;
  const { today, setToday, storeOpen, scheduleHrs, timezone } = props;

  // console.log("positions",positions)

  const weekdayHeaders = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [theDate, setDate] = useState(new Date());
  const month = theDate.getMonth();
  const year = theDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1);
  const [monthsArray, setMonthsArray] = useState();
  const [addEvent, setAddEvent] = useState(false);
  const [myMonSched, setMonSched] = useState();
  const [holidaysOfMonth, setholidaysOfMonth] = useState();
  const startOfMonth = today?.clone().startOf("months");
  const endOfMonth = today?.clone().endOf("months");

  // console.log("startOfMonth",startOfMonth)

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
          isCurrentDay: i - paddingDays === today,
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

    setMonthsArray(monthArray);
  }, [theDate]);

  return (
    <div>
      <div>
        <Container sx={{ alignContent: "center" }}>
          <br />
          <MonthlyCalendarHeader
            weekdayHeaders={weekdayHeaders}
            setDate={setDate}
            today={today}
            setToday={setToday}
          />

          <div className="mainGridStyle">
            {monthsArray?.map((day, index) => {
              return (
                <div className="eventDiv" key={`day ${index}`}>
                  <div className="eventDivDiv">
                    <AddEvent addEvent={addEvent} />
                  </div>
                  <div className="Empty-div"></div>

                  <div className="text">{day.value}</div>

                  <MonthlySchedBar
                    startOfMonth={startOfMonth}
                    storeId={storeId}
                    userId={userId}
                    setMonSched={setMonSched}
                    myMonSched={myMonSched}
                    today={today}
                    day={day}
                  />
                  <DisplayHolidays
                    today={today}
                    holidaysOfMonth={holidaysOfMonth}
                    setholidaysOfMonth={setholidaysOfMonth}
                    startOfMonth={startOfMonth}
                    day={day}
                  />
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
