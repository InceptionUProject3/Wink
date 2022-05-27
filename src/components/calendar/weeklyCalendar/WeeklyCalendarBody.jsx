import React, { useEffect, useState } from "react";
import mockScheduleData from "./mockScheduleData.json";
import moment from "moment";

const WeeklyCalendarBody = (props) => {
  const { selectedDay } = props;

  const [mySched, setMySched] = useState();
  const [week, setWeek] = useState();
  const [coworkerSched, setCoworkerSched] = useState();

  const startDay = selectedDay.clone().startOf("day");
  const endDay = selectedDay.clone().add(6, "days").endOf("day");
  //need to fetch employee profiles from server.
  const mockEmployeeData = [
    { name: "Hana" },
    { name: "John" },
    { name: "Ann" },
  ];
  //need to fetch current logged in user
  const currentUser = { name: "Ann" };
  //need to fetch schedule from server
  useEffect(() => {
    const getAllSchedules = () => {
      const currentUserSched = mockScheduleData.filter(
        (e) => e.name === currentUser.name
      );
      const coworkerSched = mockScheduleData.filter(
        (e) => e.name !== currentUser.name
      );
      setMySched(currentUserSched);
      setCoworkerSched(coworkerSched);
      console.log(
        "my schedule",
        currentUserSched,
        "coworker schedule",
        coworkerSched
      );
    };
    getAllSchedules();
  }, []);
  useEffect(() => {
    const weekArray = [];
    for (let i = 0; i < endDay.diff(startDay, "days") + 1; i++) {
      weekArray.push(startDay.clone().add(i, "days").format("MMM DD YYYY"));
    }
    return setWeek(weekArray);
  }, []);

//   console.log("weekarray",week)
  const filterWeekScheds = (wholeSched) => {
    const weekScheds = wholeSched?.filter(
      (sched) => moment(sched.date) >= startDay && moment(sched.date) <= endDay
    );
    return weekScheds;
  };
  const schedule = (ForWhom) => {
      
     console.log("filtered", filterWeekScheds(ForWhom));
     return week?.map((day)=>{
         const foundSched = filterWeekScheds(ForWhom)?.find(
           (sched) => sched.date === day
         );
         if (foundSched === undefined) {
           console.log("print empty div");
           return <div></div>;
         } else if (foundSched) {
           console.log("print schedule div");
           return <div>{foundSched.from}-{foundSched.to}</div>;
         }

     })

  };

  //   const coworkerProfiles = () => {
  //     return mockEmployeeData.map((emp) => {
  //       const mockSchedFiltered = mockScheduleData
  //         .filter((sched) => sched.name !== currentUser.name)
  //         .filter((sched) => sched.name === emp.name);
  //       //   console.log("other people", mockSchedFiltered);
  //       return (
  //         <div>
  //           <div className="name">{emp.name}</div>
  //         </div>
  //       );
  //     });
  //   };

  return (
    <>
      <div>{currentUser.name}</div>
      {mySched && schedule(mySched)}
      {/* <div>{mySchedul()}</div> */}
     
    </>
  );
};

export default WeeklyCalendarBody;
