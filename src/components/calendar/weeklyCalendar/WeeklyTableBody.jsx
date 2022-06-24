import React, { useContext, useEffect, useState } from "react";

//fetch sheduleData for store
// import mockScheduleData from "../mockScheduleData.json";

// import moment from "moment";

import DisplayOthersSched from "./weeklyTableBody/DisplayOthersSched";
import DisplayMySched from "./weeklyTableBody/DisplayMySched";
// import ScheduleBar from "../Reusables/components/ScheduleBar";
import setPositionList from "../Reusables/functions/setPositionList";

import { LoginContext } from "../../authentication/LoginProvider";
import { StoreContext } from "../../authentication/StoreProvider";

const WeeklyTableBody = (props) => {
  const { selectedDay, storeOpen, scheduleHrs, daysInWeek,timezone } = props;
  const userId = useContext(LoginContext).user?.id ||9;
  const storeId = useContext(StoreContext).store?.Store_idStore||1 ;
  // console.log('calendar user',user)
  // console.log("weekstart", selectedDay);

  // const [week, setWeek] = useState();
  const [positions, setPositions] = useState();
  const [mySched, setMySched] = useState();
  const [cowokersSched, setCoworkersSched] = useState();

  const startDay = selectedDay?.clone().startOf("week");
  // const endDay = selectedDay?.clone().endOf("week");
  // const storeClose = storeOpen?.clone().add(scheduleHrs, "hours");
  //need to fetch current logged in user useContext
  console.log("userid : ", userId, "storeid : ", storeId);

  //set schdules & position colors
  useEffect(() => {
    const getAllSchedules = async () => {
      try {
        //need to fetch schedule with priod from server
        const weekStart = startDay?.clone().format();
        const res = await fetch(
          `/api/schedule/week?storeId=${storeId}&userId=${userId}&startDay=${weekStart}`
        );
        const scheduleData = await res.json();
        // console.log('fetched data',...scheduleData.mySchedules,
        // ...scheduleData.coworkersSchedules)
        setMySched(() => scheduleData.mySchedules);
        setCoworkersSched(() => scheduleData.coworkersSchedules);
        //enable this line chduleData
        const positionArray =
          scheduleData &&
          setPositionList(
            [...scheduleData.mySchedules,
            ...scheduleData.coworkersSchedules]
          );
        setPositions(positionArray);
      } catch (err) {
        console.log("failed to fetch schedule data", err);
        setMySched(() => null);
        setCoworkersSched(() => null);
      }
    };
    startDay && getAllSchedules();
  }, [selectedDay, storeId]);

  return (
    <>
      <div className="Empty-div"></div>
      {mySched && (
        <DisplayMySched
          myProfile={userId && mySched[0]}
          positions={positions}
          daysInWeek={daysInWeek}
          storeOpen={storeOpen}
          scheduleHrs={scheduleHrs}
          timezone={timezone}
          // storeClose={storeClose}
        />
      )}

      {cowokersSched && (
        <DisplayOthersSched
          cowokerProfs={userId && cowokersSched}
          positions={positions}
          daysInWeek={daysInWeek}
          storeOpen={storeOpen}
          scheduleHrs={scheduleHrs}
          timezone={timezone}
          // storeClose={storeClose}
          
        />
      )}
    </>
  );
};

export default WeeklyTableBody;
