import React, { useState } from "react";
import moment from "moment";

import "./style/scheduleBar.css";

const ScheduleBar = (props) => {
  const { dayStart, dayEnd, newFrom, newTo, schedObj, schedIndex, profIndex,timezone } =
    props;
  const [timeDisplay, setTimeDisplay] = useState(-1);
  //  console.log(dayStart, dayEnd)
  //Divide maxmum of Bar every 15min
  const barLength = Math.round(moment(dayEnd - dayStart).unix() / 60 / 15);

  // console.log("division", barLength);
  const barStart = Math.round(moment(newFrom - dayStart).unix() / 60 / 15);
  const barEnd = Math.round(moment(newTo - dayStart).unix() / 60 / 15);
  // console.log("bar indexs", barStart, barEnd);
  const hrs =
    Math.round((moment(newTo - newFrom).unix() / 60 / 60) * 100) / 100;

  if (schedObj.workcode === 0) {
    return (
      <>
        <div
          className="Full-bar"
          style={{ gridTemplateColumns: `repeat(${barLength},1fr)` }}
        >
          <div
            className="Percentage-bar working"
            style={{ gridColumn: `${barStart + 1}/${barEnd + 1}` ,zIndex:100}}
            onMouseEnter={() => setTimeDisplay(`${profIndex} ${schedIndex}`)}
            onMouseLeave={() => setTimeDisplay(-1)}
          >
            <p className="hours">{hrs}hrs</p>
            {profIndex && timeDisplay === `${profIndex} ${schedIndex}` && (
              <div className="text">
                {newFrom?.format("h:mma")}-{newTo?.format("h:mma")}
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else if (schedObj.workcode === 1) {
    return (
      <>
        <div
          className="Full-bar"
          style={{ gridTemplateColumns: `repeat(${barLength - 1},1fr)` }}
        >
          <div
            className={"Percentage-bar vacation"}
            style={{ gridColumn: `${barStart + 1}/${barEnd}` }}
          ></div>
        </div>
      </>
    );
  }
};

export default ScheduleBar;
