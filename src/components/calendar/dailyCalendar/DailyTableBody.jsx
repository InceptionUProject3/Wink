import moment from "moment";
import React from "react";
import MyDailySched from "./dailyTablebody/MyDailySched";
import OthersDailyScheds from "./dailyTablebody/OthersDailyScheds";

import findMy from "../Reusables/functions/findMy";
import filterOutMy from "../Reusables/functions/filterOutMy";

const DailyTableBody = (props) => {
  const { selectedDay, positions, daySchedules } = props;
  //need to fetch store information
  const storeOpen = moment("09:00", "HH:mm");
  // console.log("storeStart", storeOpen)
  const storeClose = moment("21:00", "HH:mm");
  //userContext
  const currentUser = { storeId: 1, userId: 4 };

  const displayTime = () => {
    const timeArray = [];
    const iterTimes = storeClose?.diff(storeOpen, "hours") + 1;
    // console.group("itertimes", iterTimes);
    for (let i = 0; i < iterTimes; i++) {
      timeArray.push(storeOpen?.clone().add(i, "hours").format("HH:mm"));
    }
    // console.log("timeArray", timeArray)
    return timeArray.map((time) => <div>{time}</div>);
  };
  console.log(daySchedules);
  return (
    <div className="Table-body-container">
      <div className="Time-header">{displayTime()}</div>
      <div className="Table-body">
        {daySchedules && (
          <MyDailySched
            mySched={findMy(daySchedules, currentUser)[0]}
            positions={positions}
          />
        )}
        {daySchedules && (
          <OthersDailyScheds
            othersScheds={filterOutMy(daySchedules, currentUser)}
            positions={positions}
          />
        )}
      </div>
    </div>
  );
};

export default DailyTableBody;
