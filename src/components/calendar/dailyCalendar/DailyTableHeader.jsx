import React from "react";
import { IconContext } from "react-icons";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
export const DailyTableHeader = (props) => {
  const { selectedDay, setSelectedDay } = props;

  const moveToYesterday = () => {
    setSelectedDay((pre) => pre?.clone().subtract(1, "days"));
  };
  const moveToTomorrow = () => {
    setSelectedDay((pre) => pre?.clone().add(1, "days"));
  };
 
  return (
    <IconContext.Provider value={{ className: "buttons" }}>
      <MdOutlineArrowBackIos onClick={moveToYesterday} />
      <div className="DayInHeader">
        <div>{selectedDay?.format("MMM DD")},</div>
        <div>{selectedDay?.format("ddd")}</div>
      </div>
      <MdOutlineArrowForwardIos onClick={moveToTomorrow} />
    </IconContext.Provider>
  );
};
