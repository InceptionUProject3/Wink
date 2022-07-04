import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Container } from "@mui/system";
import MonthlyCalendarHeader from "./MonthlyCalendarHeader";
import AddEvent from "./AddEvent";
import "./monthlyCalendar.css";
import ScheduleBar from "../../Reusables/components/ScheduleBar";
import { LoginContext } from "../../authentication/LoginProvider";
import { StoreContext } from "../../authentication/StoreProvider";
import DisplayMySched from "../weeklyCalendar/weeklyTableBody/DisplayMySched";
import DisplayMonthlySched from "./DisplayMonthlySched";

const MonthlyCalendar = (props) => {
  const userId = useContext(LoginContext).user?.id || 9;
  const storeId = useContext(StoreContext).store?.Store_idStore || 1;
  const { today, setToday, storeOpen, scheduleHrs,timezone } = props;

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
  const [myMonSched, setMonSched] = useState();
  const storeClose = storeOpen?.clone().add(scheduleHrs, "hours");
  const startOfMonth = today?.clone().startOf("months");
  const endOfMonth = today?.clone().startOf("months");
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
        setMonSched(() => scheduleData.mySchedules[0].schedules);
        //enable this line chduleData
      } catch (err) {
        console.log("failed to fetch schedule data", err);
        setMonSched(() => null);
      }
    };
    startOfMonth && getAllSchedules();
  }, [today, storeId]);

  //console.log("my month Schedule", myMonSched )

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
        <Container alignContent={"center"}>
          <br />
          <MonthlyCalendarHeader
            weekdayHeaders={weekdayHeaders}
            setDate={setDate}
            today={today}
            setToday={setToday}
          />

          <br />

            <div></div>
            {myMonSched && (
              <DisplayMonthlySched
              myProfile={userId && myMonSched[0]}
              storeOpen={storeOpen}
              monthsArray={monthsArray}
              scheduleHrs={scheduleHrs}
              timezone={timezone} />
            )}
          <div className="mainGridStyle">
            {monthsArray?.map((day, index) => {
              
              return (
                <div className="eventDiv" key={`day ${index}`}>
              
                  <div className="eventDivDiv">
                    <AddEvent addEvent={addEvent} />
                  </div>
                  <div className="Empty-div"></div>
                  
                  <div className="text">{day.value}</div>
                  <div className="monthlyShedule">
                    
                    {myMonSched?.map((schedule,index) => {
                      const starttime = moment(schedule.starttime).format("h:mm a")
                      const endtime = moment(schedule.endtime).format("h:mm a")
                      const scheduleDate = moment(schedule.starttime).date()
                      //console.log("starttime", starttime)
                      //console.log("scheduleDate,schedule.starttime  ", scheduleDate, schedule.starttime)
                      if(scheduleDate === day.value){
                        return <div>{starttime} - { endtime}</div>
                      }
                    })}
                    
                  </div>


                </div>
              );
            })}
          </div>

          <div></div>
        </Container>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
