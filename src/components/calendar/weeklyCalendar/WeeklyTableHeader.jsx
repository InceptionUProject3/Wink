import React from "react";
import { IconContext } from "react-icons";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import moment from "moment";

const WeeklyTableHeader = (props) => {
  const { selectedDay, setSelectedDay, daysInWeek } = props;
  const selectDayInHeader = selectedDay?.format("MMM YYYY");

  const moveToPreWeek = () => {
    setSelectedDay((pre) => pre?.clone().subtract(7, "days"));
    // console.log("Selected day", selectedDay);
  };
  const moveToNextWeek = () => {
    setSelectedDay((pre) => pre?.clone().add(7, "days"));
  };

  return (
    <>
      <div className="WeeklyCal-header">
        <IconContext.Provider value={{className: "buttons" }}>
          <MdOutlineArrowBackIos onClick={moveToPreWeek} />
          <div className="DayInHeader">{selectDayInHeader}</div>
          <MdOutlineArrowForwardIos onClick={moveToNextWeek} />
        </IconContext.Provider>
      </div>

      {daysInWeek?.map((day, index) => {
        // console.log('days', moment(day), moment(day).day())
        const isWeekend =
          moment(day).day() === 0 || moment(day).day() === 6 ? "Weekend" : "";
        const isToday = day === moment().startOf("day").format() ? "Today" : "";
        // console.log("isWeekend", moment(day).day());

        return (
          <div
            className={`WeeklyCal-date ${isToday} ${isWeekend}`}
            key={`daysInWeek ${index}`}
          >
            {moment(day).format("ddd DD")}
          </div>
        );
      })}
    </>
  );
};

export default WeeklyTableHeader;
