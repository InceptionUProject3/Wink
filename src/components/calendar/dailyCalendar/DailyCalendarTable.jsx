import moment from "moment";
import React, { useEffect, useState } from "react";
import DailyTableBody from "./DailyTableBody";
import { DailyTableHeader } from "./DailyTableHeader";

import mockScheduleData from "../mockScheduleData.json";

const DailyCalendarTable = (props) => {
  const { positions } = props;

  const [selectedDay, setSelectedDay] = useState(moment());
  const [allDayScheds, setAllDayScheds] = useState();

  const currentUser = { userid: 4, storeId: 1 };
 

  useEffect(() => {
    const getAllDaySchedules = async () => {
      //need to fetch schedule with date from server
      // const res = await fetch(`/api/schedule/store/${currentUser.storeId}`);
      // const scheduleData = await res.json();
      //--------filter can be replaced with filter in server
      const startDay = selectedDay?.clone().startOf("day");
      const endDay = selectedDay?.clone().endOf("day");
      const todaySched = mockScheduleData?.map((emp) => {
        const dayschedule = emp?.schedules.filter(
          (sched) =>
            moment(sched.endTime, "MMM DD YYYY HH:mm") > startDay &&
            moment(sched.startTime, "MMM DD YYYY HH:mm") < endDay
        );
        return { ...emp, schedules: dayschedule };
      });
      //-------
      const scheduleData = todaySched;
      // console.log("dayschedule data",scheduleData)
      setAllDayScheds(() => scheduleData);
    };
    getAllDaySchedules();
  }, [selectedDay]);

  return (
    <div className="DailyCal-container">
      <DailyTableHeader
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        
      />
      <DailyTableBody
        selectedDay={selectedDay}
        positions={positions}
        daySchedules={allDayScheds}
       
      />
    </div>
  );
};

export default DailyCalendarTable;
