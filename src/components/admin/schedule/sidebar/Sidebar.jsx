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

  const rearrangeFilter = (key, name) => {
    const newFilterArray = [];
    filters[key].map((hr) => {
      if (hr.type === name) {
        return newFilterArray.push({ type: name, value: !hr.value });
      } else {
        return newFilterArray.push({ type: hr.type, value: hr.value });
      }
    });
    return newFilterArray;
  };
  const onClickHrs = (e) => {
    const { className, name } = e.target;
    // console.log("name and value", name, value);

    // console.log("className", className.includes(name))
    if (className.includes("filterHrs")) {
      const newFilterArray = rearrangeFilter("hours", name);
      setFilters((pre) => {
        return { ...pre, hours: newFilterArray };
      });
    } else if (className.includes("filterPos")) {
      const newFilterArray = rearrangeFilter("positions", name);
      setFilters((pre) => {
        return { ...pre, positions: newFilterArray };
      });
    }
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
          </div>
          <div className="positions">
            {filters?.positions.map((p) => {
              const checked = p.value;
              return (
                <button
                  className={`filterPos ${p.type} ${checked}`}
                  name={p.type}
                  value={p.value}
                  onClick={onClickHrs}
                >
                  {p.type}
                </button>
              );
            })}
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
