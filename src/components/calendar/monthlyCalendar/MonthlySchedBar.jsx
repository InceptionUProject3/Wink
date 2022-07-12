import moment from "moment";
import React, { useEffect } from "react";

const MonthlySchedBar = (props) => {
  const {startOfMonth,storeId,userId,setMonSched,myMonSched,today,day} = props
  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        const monthStart = startOfMonth.clone().format("YYYY-MM-DD");
        //console.log("today, startOfMonth", today, startOfMonth);
        const res = await fetch(
          `/api/schedule/monthly?storeId=${storeId}&userId=${userId}&startOfMonth=${monthStart}`
        );
        const scheduleData = await res.json();
        //console.log('fetched data', scheduleData)
        setMonSched(() => scheduleData.mySchedules[0].schedules);
      } catch (err) {
        console.log("failed to fetch schedule data", err);
        setMonSched(() => null);
      }
    };
    startOfMonth && getAllSchedules();
  }, [today, storeId]);

  //console.log("my month Schedule", myMonSched);

  return (
    <div className="monthlyShedule">
      {myMonSched?.map((schedule, index) => {
        const starttime = moment(schedule.starttime).format("h:mm a");
        const endtime = moment(schedule.endtime).format("h:mm a");
        const scheduleDate = moment(schedule.starttime).date();

        //console.log("starttime", starttime)
        //console.log("scheduleDate,schedule.starttime  ", scheduleDate)
        if (scheduleDate === day.value) {
          return (
            <div key={index}>
              {starttime} - {endtime}
            </div>
          );
        }
      })}
    </div>
  );
};

export default MonthlySchedBar;
