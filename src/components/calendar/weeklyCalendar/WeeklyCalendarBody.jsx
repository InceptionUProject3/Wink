import React, { useEffect, useState } from "react";
import mockScheduleData from "./mockScheduleData.json";
import moment, { duration } from "moment";

import DisplayOthersSched from "./scheduleBody/DisplayOthersSched";
import DisplayMySched from "./scheduleBody/DisplayMySched";

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
    { name: "Hana", position: "Supervisor" },
    { name: "Ann", position: "Store Manager" },
    { name: "Patrick", position: "Receptionist" },
    { name: "John", position: "Supervisor" },
    { name: "Tim", position: "Receptionist" },
  ];
  //need to fetch store information
  const storeOpen = moment("09:00", "HH:mm");
  // console.log("storeStart", storeOpen)
  const storeClose = moment("20:00", "HH:mm");
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
      //set my profile
      const currentUserProf = findMy(mockEmployeeData);
      setMyProfile(currentUserProf[0]);
      //set coworkers' profiles
      const otherProfs = filterOutMy(mockEmployeeData);
      setCowokerProfs(otherProfs);
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
      (sched) =>
        moment(sched.to, "MMM DD YYYY HH:mm") > startDay &&
        moment(sched.from, "MMM DD YYYY HH:mm") < endDay
    );
    return weekScheds;
  };
  const shedBar = (dayStart, dayEnd, newFrom, newTo) => {
    const maxBar = moment(dayEnd - dayStart).unix() / 60;
    // console.log("store hrs in minutes", maxBar);
    //Divide maxBar every 15min
    const barLength = maxBar / 15;
    // console.log("division", barLength);
    const barStart = moment(newFrom - dayStart).unix() / 60 / 15;
    const barEnd = moment(newTo - dayStart).unix() / 60 / 15 ;
    console.log("bar indexs", barStart, barEnd);

    // let barColorArray = [];
    // for (let i = 0; i < barLength; i++) {
      
    //   if (i >= barStart && i <= barEnd) {
    //     barColorArray[i] = i
    //     // "filled";
    //   } else {
    //     barColorArray[i] = i
    //     // "unfilled";
    //   }
    // }

    // return barColorArray.map((fill, index) => {
    //   const percentage = /barLength
    //   return (
    //     <div
    //       key={index}
    //       className={`Percentage-bar ${fill}`}
    //     ></div>
    //   );
    // });
    return (<div style={{display:"grid", width: "100%", height: "100%", gridTemplateColumns: `repeat(${barLength-1},1fr)` }}>
      <div style={{backgroundColor:"red",gridColumn: `${barStart+1}/${barEnd}`}}></div>
    </div>)
  };

  const displaySched = (ForWhom) => {
    //  console.log("filtered", filterWeekScheds(ForWhom));
    return week?.map((day, i) => {
      //need to change to store hrs
      const oneDay = moment(day, "MMM DD YYYY HH:mm");
      const dayStart = oneDay
        .clone()
        .set({ h: storeOpen.hour(), m: storeOpen.minute() });
      const dayEnd = oneDay.set({
        h: storeClose.hour(),
        m: storeClose.minute(),
      });
      // console.log('day end and start', dayStart, '-', dayEnd)
      const foundSched = filterWeekScheds(ForWhom)?.find(
        (sched) =>
          moment(sched.to, "MMM DD YYYY HH:mm") > dayStart &&
          moment(sched.from, "MMM DD YYYY HH:mm") < dayEnd
      );
      console.log("filtered sched", foundSched);
      if (foundSched === undefined) {
        //  console.log("print empty div ");
        return (
          <div className="Schedule" key={`emptySched ${ForWhom.id} ${i}`}></div>
        );
      } else if (foundSched) {
        // console.log("foundSched", foundSched);
        const from = moment(foundSched.from, "MMM DD YYYY HH:mm");
        const to = moment(foundSched.to, "MMM DD YYYY HH:mm");
        const newFrom = from > dayStart ? from : dayStart;
        const newTo = to < dayEnd ? to : dayEnd;
        // console.log("day end and start", newFrom, "-", newTo);

        return (
          <div className="Schedule">
            {foundSched.workCode==="Working"?<div className="hours">{moment(newTo-newFrom).unix()/60/60}hrs</div>:""}
            <div
              className="Full-bar"
              
            >
              {shedBar(dayStart, dayEnd, newFrom, newTo)}
            </div>
            <div className="text">{newFrom.format("HH:mm")}-{newTo.format("HH:mm")}</div>
          </div>
        );
      }
    });
  };

  return (
    <>
      <DisplayMySched
        myProfile={myProfile}
        mySched={mySched}
        displaySched={displaySched}
      />

      <DisplayOthersSched
        cowokerProfs={cowokerProfs}
        cowerkerScheds={cowerkerScheds}
        displaySched={displaySched}
      />
    </>
  );
};

export default WeeklyCalendarBody;
