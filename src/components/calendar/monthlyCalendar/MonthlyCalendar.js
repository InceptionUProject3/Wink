import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import { Container } from "@mui/system";
import MonthlyCalendarHeader from "./MonthlyCalendarHeader";
import AddEvent from "./AddEvent";
import "./monthlyCalendar.css";
import ScheduleBar from "../Reusables/components/ScheduleBar";
import { LoginContext } from "../../authentication/LoginProvider";
import { StoreContext } from "../../authentication/StoreProvider";
import DisplayMySched from "../weeklyCalendar/weeklyTableBody/DisplayMySched";

const MonthlyCalendar = (props) => {
  const userId = useContext(LoginContext).user?.id || 9;
  const storeId = useContext(StoreContext).store?.Store_idStore || 1;
  const {
    today,
    setToday,
    storeOpen,
    scheduleHrs,
    } = props;

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
  const [addEvent, setAddEvent] = useState();
  const [mySched, setMySched] = useState();
  const storeClose = storeOpen?.clone().add(scheduleHrs, "hours");
  const startOfMonth = today?.clone().startOf("months")
  const endOfMonth = today?.clone().startOf("months")
 // console.log("startOfMonth",startOfMonth)
 


  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        //need to fetch schedule with priod from server
        const monthStart = startOfMonth.clone().format("YYYY-MM-DD");
        //console.log("today, startOfMonth", today, startOfMonth);
        const res = await fetch(
          `/api/schedule/monthly?storeId=${storeId}&userId=${userId}&startOfMonth=${monthStart}`
        );
        const scheduleData = await res.json();
         //console.log('fetched data', scheduleData)
         setMySched(() => scheduleData.mySchedules);
        //enable this line chduleData
        } catch (err) {
        console.log("failed to fetch schedule data", err);
        setMySched(() => null);
      }
    };
    startOfMonth && getAllSchedules();
  }, [today, storeId]);

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

  const displaySched = (schedules) => {
    return monthsArray?.map((day, i) => {
      //need to change to store hrs
      const oneDay = moment(day, "MMM DD YYYY HH:mm");
      const dayStart = oneDay
        .clone()
        .set({ h: storeOpen?.hour(), m: storeOpen?.minute() });
      const dayEnd = oneDay.set({
        h: storeClose?.hour(),
        m: storeClose?.minute(),
      });

      //console.log("sched", schedules);
      const foundSched = schedules?.find(
        (sched) =>
          moment(sched.endtime) > dayStart && moment(sched.starttime) < dayEnd
      );
      // console.log("foundsched", foundSched);
      if (foundSched === undefined) {
        // console.log("print empty div ");
        return (
          <div
            className="Schedule"
            key={`emptySched ${schedules?.scheduleId} ${i}`}
          ></div>
        );
      } else if (foundSched) {
        // console.log("day period", dayStart, dayEnd);
        // console.log("foundSched", foundSched);
        const schedFrom = moment(foundSched.starttime);
        const schedTo = moment(foundSched.endtime);
        const newFrom = schedFrom > dayStart ? schedFrom : dayStart;
        const newTo = schedTo < dayEnd ? schedTo : dayEnd;
        // console.log("schedule in a day", newFrom, "-", newTo);

        return (
          <div key={`Sched ${schedules?.scheduleId} ${i}`} className="Schedule">
            <ScheduleBar
              dayStart={dayStart}
              dayEnd={dayEnd}
              newFrom={newFrom}
              newTo={newTo}
              schedObj={foundSched}
            />
            {foundSched.workcode === 0 && (
              <div className="text">
                {newFrom?.format("h:mma")}-{newTo?.format("h:mma")}
              </div>
            )}
          </div>
        );
      }
    });
  };

  return (
    <div>
      <div>
        <Container alignContent={"center"}>
          <br />
          <MonthlyCalendarHeader
            weekdayHeaders={weekdayHeaders}
            setDate={setDate}
            today={today}
            setToday={setToday}
          />

          <br />

          <div className="mainGridStyle">
            {monthsArray?.map((day, index) => {
              //  const isWeekend = moment(day).day() === 0 || moment(day).day() === 6 ? "Weekend" : "";
              //  let isToday = day === moment().startOf("day").format() ? "Today" : "";

              //  console.log("isWeekend",isWeekend)
              //  console.log("isToday",isToday)

              return (
                <div className="eventDiv" key={`day ${index}`}>
                  <div className="eventDivDiv">
                    <AddEvent addEvent={addEvent} />
                  </div>
                  <div className="Empty-div"></div>
                  {/* {scheduleData && (
                    <DisplayMySched
                      myProfile={userId && findMy(scheduleData, userId)[0]}
                      displaySched={displaySched}
                      positions={positions}
                    />
                  )} */}
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
