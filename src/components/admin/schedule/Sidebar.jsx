import moment from "moment";
import React from "react";

import './sidebar.css'

const Sidebar = (props) => {
  const { storeZone, startWeeks, setSelectedStart, selectedStart } = props;
  const displayWeekList = () => {
    return startWeeks?.map((weekStart, i) => {
      const endWeek = weekStart.clone().endOf('week').format('MMM Do');
      const startWeek = weekStart.format('MMM Do');
      return(<option key={`weekStart ${i}`} value={startWeek}>{startWeek} - {endWeek}
      </option>)
    });
  };

  const updateDate =(e)=>{
    const {value}=e.target
    const momentValue = moment.tz(value, 'MMM Do', storeZone);
    // console.log("value", momentValue)
    setSelectedStart(()=>momentValue)
  }

  // console.log("set weekstart", selectedStart?.format())

  return <div className="Side-bar">
    <div className="Date-choice-box">
      <label>Period:</label>
      <select name="startDate" onChange={updateDate} value={moment(selectedStart)?.format('MMM Do')}>
          {displayWeekList()}
      </select>
    </div>
  </div>;
};

export default Sidebar;
