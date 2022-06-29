import React, { useState } from "react";
import moment from "moment";
import ScheduleBar from "../../../calendar/Reusables/components/ScheduleBar";
import { useEffect } from "react";
import AdminScheduleModal from "./AdminScheduleModal";

const ClickableScheduleBar = ({
  daysInWeek,
  storeOpen,
  scheduleHrs,
  timezone,
  employeeSched,
  position,
}) => {
  // console.log("schedules",schedules)
  const [newSchedArr, SetnewSchedArr] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [timeList, setTimeList] = useState();
  const [selectedSched, setSelectedSched] = useState({
    userId: "",
    starttime: "",
    endtime: "",
    workcode: 0,
  });
  const [open, setOpen] = useState(false);
  // console.log("schedules", schedules)

  useEffect(() => {
    const getTimeList = () => {
      const timeOpen = storeOpen?.clone();
      // console.log("storeClose", storeClose.format());
      const timeArray = [storeOpen.format("hh:mm a")];
      const iterTimes = (scheduleHrs * 60) / 15;
      // console.log("iteration time", scheduleHrs, iterTimes)
      for (let i = 0; i < iterTimes; i++) {
        timeArray.push(timeOpen?.add(15, "minutes").format("hh:mm a"));
      }
      setTimeList(() => timeArray);
      // console.log("times", timeArray)
    };
    getTimeList();
  }, []);
  useEffect(() => {
    const setSchedList = () => {
      //update newSchedArr to update list
    };
  }, []);

  const scheduleAction = (e, day) => {
    const selectedScheduleId = e.currentTarget * 1;
    const foundSched = newSchedArr?.find(
      (sched) => sched.idSchedule === selectedScheduleId
    );
    if (foundSched) {
      console.log("edit on");
    } else {
      setSelectedSched((pre) => {
        return { ...pre, userId: employeeSched.userId, workcode: 0 };
      });
      setSelectedDate(() => moment.tz(day, timezone).format("ddd Do"));
      console.log("create on", employeeSched.employeeId);
    }
    // setSelectedSched((pre)=>{return{...pre, userId:employeeSched.userId}})
    setOpen(true);
  };

  // console.log("selectedSched", selectedSched);
  return (
    <>
      <AdminScheduleModal
        employeeSched={employeeSched}
        position={position}
        selectedDate={selectedDate}
        selectedSched={selectedSched}
        timezone={timezone}
        setSelectedSched={setSelectedSched}
        open={open}
        setOpen={setOpen}
        timeList={timeList}
      />

      {daysInWeek?.map((day, i) => {
        //need to change to store hrs
        const today = moment.tz(moment(),timezone)
        const oneDay = moment.tz(day, timezone);
        const dayStart = oneDay
          .clone()
          .set({ h: storeOpen?.hour(), m: storeOpen?.minute() });
        const dayEnd = dayStart.clone().add(scheduleHrs, "hours");

        const foundSched = employeeSched.schedules?.find(
          (sched) =>
            moment.tz(sched.endtime, timezone) > dayStart &&
            moment.tz(sched.starttime, timezone) < dayEnd
        );
        if(oneDay<today){
          return (
            <div
              className="Schedule non-clickable"
              key={`emptySched ${i}`}
            ></div>
          );
        }

        if (foundSched === undefined) {
          return (
            <div
              className="Schedule clickable"
              key={`emptySched ${i}`}
              onClick={(e) => scheduleAction(e, day)}
            ></div>
          );
        } else if (foundSched) {
          const schedFrom = moment.tz(foundSched.starttime, timezone);
          const schedTo = moment.tz(foundSched.endtime, timezone);
          const newFrom = schedFrom > dayStart ? schedFrom : dayStart;
          const newTo = schedTo < dayEnd ? schedTo : dayEnd;

          return (
            <div
              onClick={(e) => scheduleAction(e)}
              key={`Sched ${foundSched?.idSchedule} ${i}`}
              className="Schedule clickable"
              id={foundSched?.idSchedule}
            >
              <ScheduleBar
                dayStart={dayStart}
                dayEnd={dayEnd}
                newFrom={newFrom}
                newTo={newTo}
                schedObj={foundSched}
                timezone={timezone}
              />
              {foundSched.workcode === 0 && (
                <div className="text">
                  {newFrom?.format("h:mma")}-{newTo?.format("h:mma")}
                </div>
              )}
            </div>
          );
        }
      })}
    </>
  );
};

export default ClickableScheduleBar;
