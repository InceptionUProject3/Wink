import moment from "moment";
import React, { useContext, useState } from "react";
// import DailyTableBody from "./DailyTableBody";
import { DailyTableHeader } from "./DailyTableHeader";

import findMy from "../Reusables/functions/findMy";
import MyDailySched from "./dailyTablebody/MyDailySched";
import OthersDailyScheds from "./dailyTablebody/OthersDailyScheds";
import filterOutMy from "../Reusables/functions/filterOutMy";
import { LoginContext } from "../../authentication/LoginProvider";
import ScheduleBar from "../Reusables/components/ScheduleBar";
import TableGrid from "./TableGrid";

const DailyCalendarTable = (props) => {
  const { positions, selectedDay, setSelectedDay, daySchedules , storeOpen, scheduleHrs} = props;

  const userId = useContext(LoginContext).user?.id || 9;


  const dayStart = selectedDay.clone().set({ h: storeOpen.hour(), m: storeOpen.minute() });
  const dayEnd = selectedDay.clone().add(scheduleHrs,'hours')

  const displayTimes = () => {
    const timeArray = [];
    const iterTimes = scheduleHrs + 2;
  
    for (let i = 0; i < iterTimes; i = i + 2) {
      timeArray.push(dayStart?.clone().add(i, "hours").format("h:mm a"));
    }
    // console.log("timeArray", timeArray)
    return timeArray.map((time) => <div>{time}</div>);
  };
  // console.log('time display', timeDisplay)

  const displaySched = (schedules, index) => {
    //most of case schedule is one. For some case, can be more than two
    return schedules?.map((sched, i) => {
      const schedFrom = moment(sched.starttime);
      const schedTo = moment(sched.endtime);
      const newFrom = schedFrom > dayStart ? schedFrom : dayStart;
      const newTo = schedTo < dayEnd ? schedTo : dayEnd;

      return (
        <div
          key={`Dailyched ${schedules?.scheduleId} ${i}`}
          className={`Schedule ${index} ${i}`}
        >
          <ScheduleBar
            dayStart={dayStart}
            dayEnd={dayEnd}
            newFrom={newFrom}
            newTo={newTo}
            schedObj={sched}
            profIndex={index}
            schedIndex={i}
          />
        </div>
      );
    });
  };

  return (
    <div className="Table-container">
      <DailyTableHeader
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className="Time-header-container">
        <div className="Time-header">{displayTimes()}</div>
      </div>
      <div className="Table-body-container">
        <TableGrid hrs={scheduleHrs}/>
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
            displaySched={displaySched}
          />
        )}
      </div>
    </div>
  );
};

export default DailyCalendarTable;
