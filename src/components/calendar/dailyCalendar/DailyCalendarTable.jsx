import moment from "moment";
import React from "react";
// import DailyTableBody from "./DailyTableBody";
import { DailyTableHeader } from "./DailyTableHeader";

import MyDailySched from "./dailyTablebody/MyDailySched";
import OthersDailyScheds from "./dailyTablebody/OthersDailyScheds";
import ScheduleBar from "../../Reusables/components/ScheduleBar";
import TableGrid from "./TableGrid";

const DailyCalendarTable = (props) => {
  const {
    positions,
    selectedDay,
    setSelectedDay,
    myDaySchedules,
    coworkerDaySchedules,
    storeOpen,
    scheduleHrs,
  } = props;

  // const userId = useContext(LoginContext).user?.id || 9;

  const dayStart = selectedDay
    ?.clone()
    .set({ h: storeOpen.hour(), m: storeOpen.minute() });
  const dayEnd = dayStart?.clone().add(scheduleHrs, "hours");
  // console.log("Daily: day start and end", selectedDay, dayStart, dayEnd, storeOpen, scheduleHrs)
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
      // console.log("schedule", sched);
      const schedFrom = moment(sched.starttime);
      const schedTo = moment(sched.endtime);

      if (schedTo > dayStart && schedFrom < dayEnd) {
        const newFrom = schedFrom > dayStart ? schedFrom : dayStart;
        const newTo = schedTo < dayEnd ? schedTo : dayEnd;
        // console.log('newdates', newFrom, newTo)
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
      }
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
        <TableGrid hrs={scheduleHrs} />
        {myDaySchedules&& (
          <MyDailySched
            mySched={myDaySchedules[0]}
            positions={positions}
            displaySched={displaySched}
          />
        )}

        {coworkerDaySchedules && (
          <OthersDailyScheds
            othersScheds={coworkerDaySchedules}
            positions={positions}
            displaySched={displaySched}
          />
        )}
      </div>
    </div>
  );
};

export default DailyCalendarTable;
