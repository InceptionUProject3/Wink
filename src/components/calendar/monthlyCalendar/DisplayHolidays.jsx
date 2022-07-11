import moment from "moment";
import React, { useEffect } from "react";

const DisplayHolidays = (props) => {
  const {
    today,
    setholidaysOfMonth,
    holidaysOfMonth,
    day,
    startOfMonth,
    endOfMonth,
  } = props;
  //console.log("startOfMonth",startOfMonth )
  useEffect(() => {
    const getMonHolidays = async () => {
      const startOfMonth = today?.clone().startOf("months");
      const endOfMonth = today?.clone().endOf("months");
      const startOfHoliday = startOfMonth.clone().format("YYYY-MM-DD");
      const endOfHoliday = endOfMonth.clone().format("YYYY-MM-DD");
      //console.log("startOfHoliday   endOfHoliday",startOfMonth,endOfMonth)
      const res = await fetch(
        `/api/events?startOfHoliday=${startOfHoliday}&endOfHoliday=${endOfHoliday}`
      );
      const holidaysData = await res.json();
      //console.log("holidaysData", holidaysData);
      const newHoliday = [];
      holidaysData?.holidayData.map((holiday) => {
        const newdate = moment
          .tz(holiday.event_date, "UTC")
          .format("YYYY-MM-DD");
        newHoliday.push({ date: newdate, name: holiday.nameEn });
        //console.log("holiday", newdate)
      });
      //console.log("newHoliday", newHoliday)

      setholidaysOfMonth(() => newHoliday);
    };

    startOfMonth && getMonHolidays();
  }, [today]);
  //console.log("holidaysOfMonth",holidaysOfMonth)

  return (
    <div>
      {holidaysOfMonth?.map((holiday, index) => {
        const data = moment(holiday.date, "YYYY-MM-DD").date();
        //const data = holiday[0]
        //console.log("data",moment(holiday.date,("YYYY-MM-DD")))
        if (data === day.value) {
          //console.log("final destination", holiday.name )
          return <div className="holidays">{holiday.name}</div>;
        }
        //console.log("data", data)
      })}
    </div>
  );
};

export default DisplayHolidays;
