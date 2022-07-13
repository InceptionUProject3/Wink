import React from "react";
import WeeklyTableHeader from "../../weeklyWebView/weeklyComponents/WeeklyTableHeader";

const HeaderMobile = ({ selectedDay, setSelectedDay, daysInWeek, timezone }) => {
  return <div>
    <WeeklyTableHeader 
    selectedDay={selectedDay}
    setSelectedDay={setSelectedDay}/>
  </div>;
};

export default HeaderMobile;
