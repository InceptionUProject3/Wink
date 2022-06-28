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
import ProfileBig from "../../../calendar/Reusables/components/ProfileBig";

const AdminScheduleModal = ({
  employeeSched,
  position,
  selectedDate,
  selectedSched,
  timezone,
  setSelectedSched,
  open,
  setOpen,
  timeList
}) => {
  const clickDate = (e) => {
    const { value, name } = e.target;
    // console.log("value and name", value, name);
    if (name === "starttime" || name === "endtime") {
      const hour = moment(value, "hh:mm a").get("hour");
      const min = moment(value, "hh:mm a").get("minute");
      const time = moment
        .tz(selectedDate, "ddd Do", timezone)
        .set({ h: hour, m: min })
        .format();
      // console.log("time", moment.tz(time, timezone).format("ddd do, hh:mm a z"))
      setSelectedSched((pre) => {
        return { ...pre, [name]: time };
      });
    } else {
      setSelectedSched((pre) => {
        return { ...pre, [name]: value };
      });
    }
  };
  return (
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
                <label htmlFor="endtime">Shift start:</label>
                <select
                  name="endtime"
                  onChange={clickDate}
                  value={moment
                    .tz(selectedSched.endtime, timezone)
                    .format("hh:mm a")}
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
  );
};

export default AdminScheduleModal;
