import React, { useState } from "react";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ScheduleBar from "../../../calendar/Reusables/components/ScheduleBar";

const ClickableScheduleBar = ({
  daysInWeek,
  storeOpen,
  scheduleHrs,
  schedules,
  timezone,
}) => {
  const [newSchedArr, SetnewSchedArr] = useState();
  const [open, setOpen] = useState(false);

  const scheduleAction = (e) => {};

  return (
    <>
      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={()=>setOpen(false)}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      {daysInWeek?.map((day, i) => {
        //need to change to store hrs
        const oneDay = moment.tz(day, timezone);
        const dayStart = oneDay
          .clone()
          .set({ h: storeOpen?.hour(), m: storeOpen?.minute() });
        const dayEnd = dayStart.clone().add(scheduleHrs, "hours");

        const foundSched = schedules?.find(
          (sched) =>
            moment.tz(sched.endtime, timezone) > dayStart &&
            moment.tz(sched.starttime, timezone) < dayEnd
        );

        if (foundSched === undefined) {
          return (
            <div
              className="Schedule"
              key={`emptySched ${schedules?.scheduleId} ${i}`}
              onClick={()=>setOpen(true)}
            ></div>
          );
        } else if (foundSched) {
          const schedFrom = moment.tz(foundSched.starttime, timezone);
          const schedTo = moment.tz(foundSched.endtime, timezone);
          const newFrom = schedFrom > dayStart ? schedFrom : dayStart;
          const newTo = schedTo < dayEnd ? schedTo : dayEnd;

          return (
            <div
              onClick={ ()=>setOpen(true)}
              key={`Sched ${schedules?.scheduleId} ${i}`}
              className="Schedule"
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
