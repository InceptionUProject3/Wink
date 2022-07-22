import moment from "moment";
import React from "react";

const MonthlySchedBar = (props) => {
  const { myMonSched, day, vacMonSched, setVacMonSched } = props;
  //console.log("vacMonShed", vacMonSched)
  return (
    <div className="monthlyShedule">
      {myMonSched?.map((schedule, index) => {
        const starttime = moment(schedule.starttime).format("h:mm a");
        const endtime = moment(schedule.endtime).format("h:mm a");
        //const startVac
        const scheduleDate = moment(schedule.starttime).date();

        //console.log("vacation", vacMonSched)
        //console.log("scheduleDate,schedule.starttime  ", scheduleDate)
        if (scheduleDate === day.value) {
          return (
            <div key={index}>
              {starttime} - {endtime}
            </div>
          );
        }
        console.log("day value", day.value);
      })}
      {vacMonSched?.map((vacation, index) => {
        const vacDate = moment(vacation.starttime).format("DD");
        if (vacDate === day.value) {
          return (
            <div key={index}>
              <h3>On vacation</h3>
            </div>
          );
        }

        console.log("vacation", vacDate);
      })}
    </div>
  );
};

export default MonthlySchedBar;
