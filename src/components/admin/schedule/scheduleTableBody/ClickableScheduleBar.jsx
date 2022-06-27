import React, { useState } from "react";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ScheduleBar from "../../../calendar/Reusables/components/ScheduleBar";
import { useEffect } from "react";
import ProfileBig from "../../../calendar/Reusables/components/ProfileBig";

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

  const clickDate = (e) => {
    const { value, name } = e.target;
    console.log("value and name", value, name);
    if(name==='starttime'||name==='endtime'){
      const hour = moment(value,"hh:mm a").get("hour");
      const min =moment(value,"hh:mm a").get("minute");
      const time = moment.tz(selectedDate,"ddd Do",timezone).set({'h':hour,'m':min}).format();
      // console.log("time", moment.tz(time, timezone).format("ddd do, hh:mm a z"))
      setSelectedSched((pre)=>{return{...pre, [name]:time}})
    }else{

      setSelectedSched((pre) => {
        return { ...pre, [name]: value };
      }
      );
    }
  };
  // console.log("selectedSched", selectedSched);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Schedule for {employeeSched.firstname}, {employeeSched.lastname}
        </DialogTitle>
        <DialogContent>
          <div className="modal-contents">
            <ProfileBig profile={employeeSched} position={position} />
            <div className="form-box">
              <div className="date-container">
                <label> Date: </label>
                <div className="date">{selectedDate}</div>
                <div className="date-list-start">
                  <label htmlFor="starttime">Shift start:</label>
                  <select
                    name="starttime"
                    onChange={clickDate}
                    value={moment.tz(selectedSched.starttime,timezone).format("hh:mm a")}
                  >
                    <option value="">--choose time--</option>
                    {timeList?.map((time, i) => {
                      return (
                        <option value={time} key={`starttime ${i}`}>
                          {time}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="date-list-end">
                  <label htmlFor="endtime">Shift start:</label>
                  <select
                    name="endtime"
                    onChange={clickDate}
                    value={moment.tz(selectedSched.endtime,timezone).format("hh:mm a")}
                  >
                    <option value="">--choose time--</option>
                    {timeList?.map((time, i) => {
                      return (
                        <option value={time} key={`endtime ${i}`}>
                          {time}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      {daysInWeek?.map((day, i) => {
        //need to change to store hrs
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

        if (foundSched === undefined) {
          return (
            <div
              className="Schedule"
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
              className="Schedule"
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
