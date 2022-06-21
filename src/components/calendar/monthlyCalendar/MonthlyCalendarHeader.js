import { useEffect } from "react";
import { IconContext } from "react-icons";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const MonthlyCalendarHeader = (props) => {
  const {
    monInCalendar,
    setMonInCalendar,
    weekdayHeaders,
    daysInMonth,
    setDate,
  } = props;
  useEffect(() => {
    setDate(new Date(monInCalendar));
  }, [monInCalendar]);

  let getNextMonth = () => {
    setMonInCalendar((next) => next?.clone().add(1, "month"));
  };

  let getPreMonth = () => {
    setMonInCalendar((pre) => pre?.clone().subtract(1, "month"));
  };
  return (
    <div>
      <div className="test">
        <IconContext.Provider value={{ className: "buttons" }}>
          <MdOutlineArrowBackIos onClick={getPreMonth} />
          <div className="MonthInHeader">
            {monInCalendar.format("MMM YYYY")}
          </div>
          <MdOutlineArrowForwardIos onClick={getNextMonth} />
        </IconContext.Provider>
      </div>

      {daysInMonth?.map((day, index) => {
        console.log("day in daysInMonth ", day);
      })}
      <div className="headerGrid">
        {weekdayHeaders.map((day, index) => {
          return <div key={index}>{day}</div>;
        })}
      </div>
    </div>
  );
};

export default MonthlyCalendarHeader;
