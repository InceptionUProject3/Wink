import moment from "moment";
import React from "react";

import "./sidebar.css";

const Sidebar = (props) => {
  const {
    storeZone,
    startWeeks,
    setSelectedStart,
    selectedStart,
    filters,
    setFilters,
  } = props;

  const displayWeekList = () => {
    return startWeeks?.map((weekStart, i) => {
      const endWeek = weekStart.clone().endOf("week").format("MMM Do");
      const startWeek = weekStart.format("MMM Do");
      return (
        <option key={`weekStart ${i}`} value={startWeek}>
          {startWeek} - {endWeek}
        </option>
      );
    });
  };

  const updateDate = (e) => {
    const { value } = e.target;
    const momentValue = moment.tz(value, "MMM Do", storeZone);
    // console.log("value", momentValue)
    setSelectedStart(() => momentValue);
  };

  const onClickHrs = (e) => {
    const { name, value } = e.target;
    // console.log("name and value", name, value);
    const newHrsArray = [];
    filters.hours.map((hr) => {
      if (hr.type === name) {
        return newHrsArray.push({ type: name, value: !hr.value });
      } else {
        return newHrsArray.push({ type: hr.type, value: hr.value });
      }
    });
    setFilters((pre) => {
      return { ...pre, hours: newHrsArray };
    });
  };
  const onClickPositions = (e) => {
    const { name, value } = e.target;
    // console.log("name and value", name, value);
    const newPosArray = [];
    filters.positions.map((p) => {
      if (p.type === name) {
        return newPosArray.push({ type: name, value: !p.value });
      } else {
        return newPosArray.push({ type: p.type, value: p.value });
      }
    });
    setFilters((pre) => {
      return { ...pre, hours: newPosArray };
    });
  };
  console.log("Changed filters", filters);

  return (
    <div className="Side-bar">
      <div className="Date-choice-box">
        <label>Period:</label>
        <select
          name="startDate"
          onChange={updateDate}
          value={moment(selectedStart)?.format("MMM Do")}
        >
          {displayWeekList()}
        </select>
      </div>
      <div className="filters">
        <div className="hours">
          {filters?.hours.map((hr) => {
            const checked = hr.value;
            return (
              <button
                className={`filterHrs ${hr.type} ${checked}`}
                name={hr.type}
                value={hr.value}
                onClick={onClickHrs}
              >
                {hr.type}
              </button>
            );
          })}
          <div className="positions">
          {filters?.positions.map((p)=>{
            const checked = p.value;
            return(
              <button
              className={`filterPos ${p.type} ${checked}`}
              name={p.type}
              value={p.value}
              onClick={onClickPositions}
            >
              {p.type}
            </button>
            )
          })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
