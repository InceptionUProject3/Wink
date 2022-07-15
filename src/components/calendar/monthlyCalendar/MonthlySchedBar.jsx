import moment from "moment";
import React from "react";

const MonthlySchedBar = (props) => {
  const {  myMonSched,  day } =
    props;

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
