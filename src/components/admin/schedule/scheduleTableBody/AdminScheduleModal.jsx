import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { ProfileIcon } from "../../../calendar/Reusables/components/ProfileIcon";
import { useState } from "react";

import "./adminScheduleModal.css";

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
}) => {
  const [onlyStarttime, setOnlyStarttime] = useState();

  const updateTime = (e) => {
    const { value, name } = e.target;
    const hour = moment(value, "hh:mm a").get("hour");
    const min = moment(value, "hh:mm a").get("minute");
    const time = selectedDate.set({ h: hour, m: min }).format();
    setSelectedSched((pre) => {
      return { ...pre, [name]: time };
    });
  };
  // console.log("selected scheudles", selectedSched);

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
  };

  const sendEvent = async () => {
    try {
      if (selectedSched.idSchedule) {
        console.log("editing schedule... on ", selectedSched);
      } else {
        console.log("creating schedule...", selectedSched);
        const dataToSend = JSON.stringify(selectedSched);
        const response = await fetch(`/api/schedule/create`, {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: dataToSend,
        });
        if (response.status === 200) {
          console.log("success");
          resetEvent();
          setOpen(false);
        }
      }
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
          <div className="date-container">
            <label> Date: </label>
            <div className="date">{selectedDate?.format("ddd, MMM do")}</div>
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
                const endPotential = moment.tz(time, "hh:mm a", timezone);
                const start = moment.tz(onlyStarttime, "hh:mm a", timezone);
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
