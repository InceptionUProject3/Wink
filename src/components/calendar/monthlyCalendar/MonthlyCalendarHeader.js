import { IconContext } from "react-icons";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";


const MonthlyCalendarHeader = (props) => {

  const {monInCalendar,setMonInCalendar,weekdayHeaders} = props
  let getNextMonth = () => {
        setMonInCalendar ((next) => next?.clone().add(1, "month"));
        console.log("setMonInCalendar next", monInCalendar.format("MMM"));
    };
    
    let getPreMonth = () => {
      setMonInCalendar ((pre) => pre?.clone().subtract(1,"month"))
      console.log("setMonInCalendar previous", monInCalendar.format("MMM"));
    }
  return (
    <div>
      <div className="test">
        <IconContext.Provider value={{ className: "buttons" }}> 
          <MdOutlineArrowBackIos onClick={getPreMonth} />
          <div className="MonthInHeader">{monInCalendar.format("MMM YYYY")}</div>
          <MdOutlineArrowForwardIos onClick={getNextMonth} />
        </IconContext.Provider>
      </div>
      <div className="headerGrid">
        {weekdayHeaders.map((day, index) => {
          return <div key={index}>{day}</div>;
        })}
      </div>
    </div>
  );
};

export default MonthlyCalendarHeader;
