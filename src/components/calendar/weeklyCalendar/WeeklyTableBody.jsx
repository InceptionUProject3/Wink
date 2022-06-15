import React, { useContext, useEffect, useState } from "react";

//fetch sheduleData for store
// import mockScheduleData from "../mockScheduleData.json";

import moment from "moment";

import DisplayOthersSched from "./weeklyTableBody/DisplayOthersSched";
import DisplayMySched from "./weeklyTableBody/DisplayMySched";
import ScheduleBar from "../Reusables/components/ScheduleBar";
import setPositionList from "../Reusables/functions/setPositionList";
import findMy from "../Reusables/functions/findMy";
import filterOutMy from "../Reusables/functions/filterOutMy";
import { LoginContext } from "../../authentication/LoginProvider";

const WeeklyTableBody = (props) => {
  const { user } = useContext(LoginContext);
  // console.log('calendar user',user)
  const { selectedDay, storeOpen, storeClose } = props;

  const [week, setWeek] = useState();
  const [positions, setPositions] = useState();
  const [scheduleData, setScheduleData] = useState();

  const startDay = selectedDay?.clone().startOf("day");
  const endDay = selectedDay?.clone().add(6, "days").endOf("day");

  //need to fetch current logged in user useContext
  const currentUser = { userId: 9, storeId: 1 };

  //set schdules
  useEffect(() => {
    const getAllSchedules = async () => {
      //need to fetch schedule with priod from server
      const weekStart = selectedDay
        .clone()
        .startOf("week")
        .utc()
        .format("YYYY-MM-DD HH:mm");
      // console.log("weekstart", selectedDay, weekStart);
      const res = await fetch(
        `/api/schedule/week?storeId=${currentUser.storeId}&startDay=${weekStart}`
      );
      const scheduleData = await res.json();
      console.log('fetched data', scheduleData)
      setScheduleData(() => scheduleData);
      //enable this line chduleData
      const positionArray = scheduleData && setPositionList(scheduleData);
      setPositions(positionArray);
      //Filter cowokers' schedules and only bring those which meet this period condition. Send startDay and endDay and store info to find schedule to backend
      // const thisWeekSched = mockScheduleData?.filter(
      //   (sched) =>
      //     moment(sched.endTime, "MMM DD YYYY HH:mm") > startDay &&
      //     moment(sched.startTime, "MMM DD YYYY HH:mm") < endDay
      // );
    };
    getAllSchedules();
  }, [selectedDay]);

  useEffect(() => {
    const weekArray = [];
    for (let i = 0; i < endDay?.diff(startDay, "days") + 1; i++) {
      weekArray.push(startDay?.clone().add(i, "days").format("MMM DD YYYY"));
    }
    return setWeek(weekArray);
  }, [selectedDay]);

  //   console.log("weekarray",week)

  const displaySched = (schedules) => {
    // console.log("schedules", schedules)
    return week?.map((day, i) => {
      //need to change to store hrs
      const oneDay = moment(day, "MMM DD YYYY HH:mm");
      const dayStart = oneDay
        .clone()
        .set({ h: storeOpen.hour(), m: storeOpen.minute() });
      const dayEnd = oneDay.set({
        h: storeClose.hour(),
        m: storeClose.minute(),
      });

      const foundSched = schedules?.find(
        (sched) =>
          moment(sched.endtime) > dayStart &&
          moment(sched.starttime) < dayEnd
      );
      // console.log("filtered sched", foundSched);
      if (foundSched === undefined) {
        //  console.log("print empty div ");
        return (
          <div
            className="Schedule"
            key={`emptySched ${schedules?.scheduleId} ${i}`}
          ></div>
        );
      } else if (foundSched) {
        // console.log("foundSched", foundSched);
        const from = moment(foundSched.starttime, "MMM DD YYYY HH:mm");
        const to = moment(foundSched.endtime, "MMM DD YYYY HH:mm");

        // console.log("day end and start", from, "-", to);

        return (
          <div className="Schedule">
            <ScheduleBar
              dayStart={dayStart}
              dayEnd={dayEnd}
              schedFrom={from}
              schedTo={to}
              schedObj={foundSched}
            />
          </div>
        );
      }
    });
  };

  return (
    <>
      <div className="Empty-div"></div>
      {scheduleData && (
        <DisplayMySched
          myProfile={findMy(scheduleData, currentUser)[0]}
          displaySched={displaySched}
          positions={positions}
        />
      )}

      {scheduleData && (
        <DisplayOthersSched
          cowokerProfs={filterOutMy(scheduleData, currentUser)}
          positions={positions}
          displaySched={displaySched}
        />
      )}
    </>
  );
};

export default WeeklyTableBody;
