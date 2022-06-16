import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import DailyTableBody from "./DailyTableBody";
import { DailyTableHeader } from "./DailyTableHeader";

import findMy from "../Reusables/functions/findMy";
import MyDailySched from "./dailyTablebody/MyDailySched";
import OthersDailyScheds from "./dailyTablebody/OthersDailyScheds";
import filterOutMy from "../Reusables/functions/filterOutMy";
import { LoginContext } from "../../authentication/LoginProvider";
import ScheduleBar from "../Reusables/components/ScheduleBar";

const DailyCalendarTable = (props) => {
  const { positions, selectedDay, setSelectedDay, daySchedules } = props;

  const userId = useContext(LoginContext).user?.id || 9;
  const dayStart = selectedDay.clone().startOf("day");
  const dayEnd = selectedDay.clone().endOf("day");

  const displayTimes = () => {
    const timeArray = [];
    console.log("day start and end", dayStart, dayEnd);
    const iterTimes = dayEnd?.diff(dayStart, "hours") + 1;
    // console.group("itertimes", iterTimes);
    for (let i = 0; i < iterTimes; i++) {
      timeArray.push(dayStart?.clone().add(i, "hours").format("HH:mm"));
    }
    // console.log("timeArray", timeArray)
    return timeArray.map((time) => <div>{time}</div>);
  };

  const displaySched = (schedules) => {
    //most of case schedule is one. For some case, can be more than two
    return schedules?.map((sched, i) => {
      const from = moment(sched.starttime);
      const to = moment(sched.endtime);
      return (
        <div
          key={`Dailyched ${schedules?.scheduleId} ${i}`}
          className="Schedule"
        >
          <ScheduleBar
            dayStart={dayStart}
            dayEnd={dayEnd}
            schedFrom={from}
            schedTo={to}
            schedObj={sched}
          />
        </div>
      );
    });
  };

  return (
    <div className="DailyCal-container">
      <DailyTableHeader
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className="Table-body-container">
        <div className="Time-header">{displayTimes()}</div>
        <div className="Table-body">
          {daySchedules && (
            <MyDailySched
              mySched={findMy(daySchedules, userId)[0]}
              positions={positions}
              displaySched={displaySched}
            />
          )}
          {daySchedules && (
            <OthersDailyScheds
              othersScheds={filterOutMy(daySchedules, userId)}
              positions={positions}
            />
          )}
        </div>
      </div>
      {/* <DailyTableBody
        selectedDay={selectedDay}
        positions={positions}
        daySchedules={daySchedules}
       
      /> */}
    </div>
  );
};

export default DailyCalendarTable;
