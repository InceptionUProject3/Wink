import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { ProfileIcon } from "../../../Reusables/components/ProfileIcon";
import { useState } from "react";

import "./adminScheduleModal.css";
import { useEffect } from "react";

const AdminScheduleModal = ({
  employeeSched,
  position,
  selectedDate,
  selectedSched,
  timezone,
  setSelectedSched,
  open,
  setOpen,
  timeList,
  setSchedModalOpen,
}) => {
  const [onlyStarttime, setOnlyStarttime] = useState();
  const [message, setMessage] = useState();
  const [vacEndDates, setVacEndDates] = useState();

  useEffect(() => {
    const getVacDateList = () => {
      const startDate = selectedDate?.clone();
      const dateArray = [startDate?.format("ddd, MMM Do")];
      const iterDay = 30;
      // console.log("iteration time", scheduleHrs, iterTimes)
      for (let i = 0; i < iterDay; i++) {
        dateArray.push(startDate?.add(1, "days").format("ddd, MMM Do"));
      }
      setVacEndDates(() => dateArray);
    };
    getVacDateList();
  }, [selectedDate]);

  // console.log('selectedSched', selectedSched);

  const updateTime = (e) => {
    const { value, name } = e.target;
    const hour = moment(value, "hh:mm a").get("hour");
    const min = moment(value, "hh:mm a").get("minute");
    const time = moment
      .tz(selectedSched[name], timezone)
      .set({ h: hour, m: min })
      .format();
    // console.log("time", time);
    setSelectedSched((pre) => {
      return { ...pre, [name]: time };
    });
  };
  // console.log("selected date", selectedDate , selectedDate?.format("ddd, MMM Do"));
  // console.log("selected scheudles",selectedSched, moment.tz(selectedSched?.starttime, timezone).format("hh:mm a"));
  // console.log("only start time",onlyStarttime.format('hh:mm a'));

  const updateDate = (e) => {
    const { value } = e.target;
    const date = moment(value, "ddd, MMM Do", timezone).get("date");
    const month = moment(value, "ddd, MMM Do", timezone).get("month");

    const newDate = moment
      .tz(selectedSched.endtime, timezone)
      .set({ month: month, date: date })
      .format();
    console.log("date end vacation", newDate);
    setSelectedSched((pre) => {
      return { ...pre, endtime: newDate };
    });
  };

  const updateWorkcode = (e) => {
    const { name, value } = e.target;
    setSelectedSched((pre) => {
      return { ...pre, [name]: value * 1 };
    });
  };

  const resetEvent = () => {
    setSelectedSched({
      User_idUser: "",
      Store_idStore: "",
      starttime: "",
      endtime: "",
      workcode: 0,
    });
    setOpen(false);
    setMessage();
  };

  const sendEvent = async () => {
    try {
      //Check if all fields are filled
      // console.log("selectedSched", selectedSched);
      const isNull = Object.values(selectedSched).some((value) => {
        if (value === null || value === "") {
          return true;
        }
        return false;
      });
      // console.log('isnull?', isNull)
      if (isNull) return setMessage("All fields need to be filled.");

      if (selectedSched.idSchedule) {
        //edit schedule
        console.log("editing schedule... on ", selectedSched);
        const dataToSend = JSON.stringify(selectedSched);
        const response = await fetch(`/api/schedule/scheduling`, {
          method: "PATCH",
          headers: { "content-Type": "application/json" },
          body: dataToSend,
        });
        if (response.status === 200) {
          console.log(await response.json());

          resetEvent();
        }
      } else {
        //create schedule
        console.log("creating schedule...", selectedSched);
        const dataToSend = JSON.stringify(selectedSched);
        const response = await fetch(`/api/schedule/scheduling`, {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: dataToSend,
        });
        if (response.status === 200) {
          console.log(await response.json());
          resetEvent();
        }
      }
      setSchedModalOpen((pre) => !pre);
      setOpen(false);
      setMessage();
    } catch (err) {
      console.log("Saving schedule action is failed.");
    }
  };
  // console.log("selectedDay", selectedDate);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        <span>Scheduling for</span>
        <ProfileIcon profile={employeeSched} color={position.color} />
        <div className="name">
          {employeeSched.firstname}, {employeeSched.lastname}
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="modal-contents">
          {message ? <div>{message}</div> : null}
          <div className="dateNtime">
            <div className="date-container">
              <label> Date: </label>
              <div className="date">{selectedDate?.format("ddd, MMM Do")}</div>
            </div>
            {selectedSched.workcode === 1 && (
              <div className="vacation-endDate-container">
                <label htmlFor="vacation-endDate">End date:</label>
                <select
                  name="vacation-endDate"
                  onChange={updateDate}
                  value={moment
                    .tz(selectedSched.endtime, timezone)
                    .format("ddd, MMM Do")}
                >
                  {vacEndDates?.map((date) => {
                    return <option value={date}>{date}</option>;
                  })}
                </select>
              </div>
            )}
          </div>
          <div className="workcode-container">
            <label htmlFor="workcode">Schedule type:</label>
            <select
              name="workcode"
              onChange={updateWorkcode}
              value={selectedSched.workcode}
            >
              <option value="0">Shift</option>
              <option value="1">Vacation</option>
            </select>
          </div>
          <div className="date-list-start">
            <label htmlFor="starttime">
              Start time ({selectedDate?.format("z")}):
            </label>
            <select
              name="starttime"
              onChange={(e) => {
                updateTime(e);
                setOnlyStarttime(e.target.value);
              }}
              value={moment
                .tz(selectedSched.starttime, timezone)
                .format("hh:mm a")}
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
            <label htmlFor="endtime">
              End time ({selectedDate?.format("z")}):
            </label>
            <select
              name="endtime"
              onChange={updateTime}
              value={moment
                .tz(selectedSched.endtime, timezone)
                .format("hh:mm a")}
            >
              <option value="">--choose time--</option>
              {timeList?.map((time, i) => {
                const foundstart = moment
                  .tz(selectedSched?.starttime, timezone)
                  .format("hh:mm a");
                const endPotential = moment.tz(time, "hh:mm a", timezone);
                const start = foundstart
                  ? moment.tz(foundstart, "hh:mm a", timezone)
                  : moment.tz(onlyStarttime, "hh:mm a", timezone);

                if (endPotential > start) {
                  return (
                    <option value={time} key={`endtime ${i}`}>
                      {time}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetEvent}>Cancel</Button>
        <Button onClick={sendEvent}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminScheduleModal;
