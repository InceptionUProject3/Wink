import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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

  const clickDate = (e) => {
    const { value, name } = e.target;
    // console.log("value and name", value, name);
    if (name === "starttime" || name === "endtime") {
      const hour = moment(value, "hh:mm a").get("hour");
      const min = moment(value, "hh:mm a").get("minute");
      const time = selectedDate.set({ h: hour, m: min }).format();
      setSelectedSched((pre) => {
        return { ...pre, [name]: time };
      });
    } else {
      setSelectedSched((pre) => {
        return { ...pre, [name]: value };
      });
    }
  };
  // console.log("selected scheudles", selectedSched);
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
          {/* <div className="form-box"> */}
          <div className="date-container">
            <label> Date: </label>
            <div className="date">{selectedDate?.format("ddd do")}</div>
          </div>
          <div className="date-list-start">
            <label htmlFor="starttime">Shift start:</label>
            <select
              name="starttime"
              onChange={(e) => {
                clickDate(e);
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
            <label htmlFor="endtime">Shift end:</label>
            <select
              name="endtime"
              onChange={clickDate}
              value={moment
                .tz(selectedSched.endtime, timezone)
                .format("hh:mm a")}
            >
              <option value="">--choose time--</option>
              {timeList?.map((time, i) => {
                const endPotential = moment.tz(time, "hh:mm a", timezone);
                const start = moment.tz(onlyStarttime, "hh:mm a", timezone);
                // console.log('times', endPotential,start)
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

        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => setOpen(false)}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminScheduleModal;
