import React, { useEffect, useState } from "react";
import mockScheduleData from "./mockScheduleData.json";
import moment from "moment";

import DisplayOthersSched from "./weeklyTableBody/DisplayOthersSched";
import DisplayMySched from "./weeklyTableBody/DisplayMySched";

const WeeklyTableBody = (props) => {
  const { selectedDay, storeOpen, storeClose } = props;

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

  const shedBar = (dayStart, dayEnd, from, to, foundSched) => {
    const newFrom = from > dayStart ? from : dayStart;
    const newTo = to < dayEnd ? to : dayEnd;
    const maxBar = moment(dayEnd - dayStart).unix() / 60;
    // console.log("store hrs in minutes", maxBar);
    //Divide maxBar every 15min
    const barLength = maxBar / 15;
    // console.log("division", barLength);
    const barStart = moment(newFrom - dayStart).unix() / 60 / 15;
    const barEnd = moment(newTo - dayStart).unix() / 60 / 15;
    console.log("bar indexs", barStart, barEnd);

    if (foundSched.workCode === "Working") {
      return (
        <>
          <div
            className="Full-bar"
            style={{ gridTemplateColumns: `repeat(${barLength - 1},1fr)` }}
          >
            <div
              className="Percentage-bar working"
              style={{ gridColumn: `${barStart + 1}/${barEnd}` }}
            >
              <p className="hours">
                {moment(newTo - newFrom).unix() / 60 / 60}hrs
              </p>
            </div>
          </div>
          <div className="text">
            {newFrom.format("HH:mm")}-{newTo.format("HH:mm")}
          </div>
        </>
      );
    } else if (foundSched.workCode === "Vacation") {
      return (
        <>
          <div
            className="Full-bar"
            style={{ gridTemplateColumns: `repeat(${barLength - 1},1fr)` }}
          >
            <div
              className={"Percentage-bar vacation"}
              style={{ gridColumn: `${barStart + 1}/${barEnd}` }}
            ></div>
          </div>
        </>
      );
    }
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

        // console.log("day end and start", newFrom, "-", newTo);

        return (
          <div className="Schedule">
            {shedBar(dayStart, dayEnd, from, to, foundSched)}
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

export default WeeklyTableBody;
