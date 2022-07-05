import React, { useState } from "react";
import moment from "moment";
import ScheduleBar from "../../../Reusables/components/ScheduleBar";
import { useEffect } from "react";
import AdminScheduleModal from "./AdminScheduleModal";

const ClickableScheduleBar = ({
  daysInWeek,
  timezone,
  employeeSched,
  position,
  setSchedModalOpen,
  selectedDate,
  setSelectedDate,
  selectedSched,
  setSelectedSched,
  settingHrsObj,
}) => {
  const [timeList, setTimeList] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getTimeList = () => {
      const timeOpen = settingHrsObj?.startTimeOfDay?.clone();
      const timeArray = [settingHrsObj?.startTimeOfDay?.format("hh:mm a")];
      const iterTimes = (settingHrsObj?.scheduleHrs * 60) / 15;
      // console.log("iteration time", scheduleHrs, iterTimes)
      for (let i = 0; i < iterTimes; i++) {
        timeArray.push(timeOpen?.add(15, "minutes").format("hh:mm a"));
      }
      setTimeList(() => timeArray);
      // console.log("times", timeArray)
    };
    getTimeList();
  }, []);

  // console.log("selected date is set to", selectedDate)
  // set initial values for schedule modal
  const scheduleAction = (e, day, foundSched) => {
    //set Date
    const dayClicked = moment.tz(day, timezone);
    setSelectedDate(() => {
      return {
        starttime: dayClicked,
        endtime: dayClicked,
      };
    });
    //set Schedule
    if (foundSched) {
      console.log("Modal - editing schedule", foundSched);
      setSelectedSched(() => foundSched);
    } else {
      setSelectedSched((pre) => {
        console.log(
          "Modal - creating schedule",
          employeeSched.userId,
          employeeSched.storeId
        );
        return {
          ...pre,
          User_idUser: employeeSched.userId,
          Store_idStore: employeeSched.storeId,
          starttime: "",
          endtime: "",
          // starttime: moment.tz(day, timezone),
          // endtime: moment.tz(day, timezone),
        };
      });
    }
    // console.log('store open', startTimeOfDay)
    // open modal
    setOpen(true);
  };

  const sendDelete = async (e, foundsched) => {
    console.log("Deleting schedule");
    e.stopPropagation();
    const pretendDelete = {
      ...foundsched,
      starttime: "0",
      endtime: "0",
    };

    const dataToSend = JSON.stringify(pretendDelete);
    const response = await fetch(`/api/schedule/scheduling`, {
      method: "PATCH",
      headers: { "content-Type": "application/json" },
      body: dataToSend,
    });
    if (response.status === 200) {
      console.log(await response.json());
    }
    setSchedModalOpen((pre) => !pre);
  };

  return (
    <>
      {daysInWeek?.map((day, i) => {
        //need to change to store hrs
        const today = moment.tz(moment(), timezone);
        const oneDay = moment.tz(day, timezone);
        const dayStart = oneDay
          .clone()
          .set({
            h: settingHrsObj?.startTimeOfDay?.hour(),
            m: settingHrsObj?.startTimeOfDay?.minute(),
          });
        const dayEnd = dayStart
          .clone()
          .add(settingHrsObj?.scheduleHrs, "hours");

        const foundSched = employeeSched.schedules?.find(
          (sched) =>
            moment.tz(sched.endtime, timezone) > dayStart &&
            moment.tz(sched.starttime, timezone) < dayEnd
        );

        if (oneDay < today) {
          return (
            <div
              className="Schedule non-clickable"
              key={`emptySched ${i}`}
            ></div>
          );
        } else if (oneDay >= today) {
          if (foundSched === undefined) {
            return (
              <div
                className="Schedule clickable"
                key={`emptySched ${i}`}
                onClick={(e) => scheduleAction(e, day, foundSched)}
              ></div>
            );
          } else if (foundSched) {
            const schedFrom = moment.tz(foundSched.starttime, timezone);
            const schedTo = moment.tz(foundSched.endtime, timezone);
            const newFrom = schedFrom > dayStart ? schedFrom : dayStart;
            const newTo = schedTo < dayEnd ? schedTo : dayEnd;

            return (
              <div
                onClick={(e) => scheduleAction(e, day, foundSched)}
                key={`Sched ${foundSched?.idSchedule} ${i}`}
                className="Schedule clickable"
                id={foundSched?.idSchedule}
              >
                <button
                  className="delete"
                  onClick={(e) => sendDelete(e, foundSched)}
                >
                  x
                </button>
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
                    {newFrom?.format("h:mm a")}-{newTo?.format("h:mm a")}
                  </div>
                )}
              </div>
            );
          }
        }
      })}
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
        setSchedModalOpen={setSchedModalOpen}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
};

export default ClickableScheduleBar;
