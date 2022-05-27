import React, { useEffect, useState } from "react";
import mockScheduleData from "./mockScheduleData.json";
import moment from "moment";

const WeeklyCalendarBody = (props) => {
  const { selectedDay } = props;

  const [mySched, setMySched] = useState();
  const [cowerkerScheds, setcowerkerScheds] = useState();
  const [myProfile, setMyProfile] = useState();
  const [cowokerProfs, setCowokerProfs] = useState();
  const [week, setWeek] = useState();

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

  const findMy = (arr) => {
    const currentUserData = arr.filter(
      //name will be replaced to id
      (e) => e.name === currentUser.name
    );
    return currentUserData;
  };
  const filterOutMy = (arr) => {
    const currentUserData = arr.filter(
      //name will be replaced to id
      (e) => e.name !== currentUser.name
    );
    return currentUserData;
  };

  useEffect(() => {
    const setAllProfiles = () => {
      const currentUserProf = findMy(mockEmployeeData);
      const otherProfs = filterOutMy(mockEmployeeData);
      setMyProfile(currentUserProf[0]);
      setCowokerProfs(otherProfs);
      console.log("current", myProfile);
    };
    setAllProfiles();
  }, []);

  //need to fetch schedule from server
  useEffect(() => {
    const getAllSchedules = () => {
      const currentUserSched = findMy(mockScheduleData);
      const cowerkerScheds = filterOutMy(mockScheduleData);
      setMySched(currentUserSched);
      setcowerkerScheds(cowerkerScheds);
    };
    getAllSchedules();
  }, []);

  useEffect(() => {
    const weekArray = [];
    for (let i = 0; i < endDay.diff(startDay, "days") + 1; i++) {
      weekArray.push(startDay.clone().add(i, "days").format("MMM DD YYYY"));
    }
    return setWeek(weekArray);
  }, [selectedDay]);

  //   console.log("weekarray",week)
  const filterWeekScheds = (wholeSched) => {
    const weekScheds = wholeSched?.filter(
      (sched) => moment(sched.date) >= startDay && moment(sched.date) <= endDay
    );
    return weekScheds;
  };

  const displaySched = (ForWhom) => {
    //  console.log("filtered", filterWeekScheds(ForWhom));
    return week?.map((day) => {
      const foundSched = filterWeekScheds(ForWhom)?.find(
        (sched) => sched.date === day
      );
      if (foundSched === undefined) {
        //  console.log("print empty div ");
        return <div></div>;
      } else if (foundSched) {
        //  console.log("print displaySched div");
        return (
          <div>
            {foundSched.from}-{foundSched.to}
          </div>
        );
      }
    });
  };

  return (
    <>
      <div>
        <div>{myProfile?.name}</div>
        <div>Me</div>
      </div>
      {mySched && displaySched(mySched)}
      {cowokerProfs?.map((prof) => {
        const schedsForOne = cowerkerScheds?.filter(
          (sched) => sched.name === prof.name
        );
        return (
          <>
            <div>{prof.name}</div>
            {displaySched(schedsForOne)}
          </>
        );
      })}
    </>
  );
};

export default WeeklyCalendarBody;
