import React, { useEffect, useState } from "react";
//useContext to fetch data from server
import mockUsersData from "../mockUsersData.json"
//fetch sheduleData for store
import mockScheduleData from "../mockScheduleData.json";

import moment from "moment";

import DisplayOthersSched from "./WeeklyTableBody/DisplayOthersSched";
import DisplayMySched from "./WeeklyTableBody/DisplayMySched";
import setPositionList from "../Reusables/functions/setPositionList";
import ScheduleBar from "../Reusables/components/ScheduleBar";

const WeeklyTableBody = (props) => {
  const { selectedDay, storeOpen, storeClose } = props;

  const [mySched, setMySched] = useState();
  const [cowerkerScheds, setcowerkerScheds] = useState();
  const [myProfile, setMyProfile] = useState();
  const [cowokerProfs, setCowokerProfs] = useState();
  const [week, setWeek] = useState();
  const [positions, setPositions] = useState();

  const startDay = selectedDay.clone().startOf("day");
  const endDay = selectedDay.clone().add(6, "days").endOf("day");

  //need to fetch current logged in user useContext
  const currentUser = { UserId: 2 ,storeId:1 };

  const findMy = (arr) => {
    const currentUserData = arr.filter(
      
      (e) => e.UserId === currentUser.UserId
    );
    return currentUserData;
  };
  const filterOutMy = (arr) => {
    const currentUserData = arr.filter(
      
      (e) => e.UserId !== currentUser.UserId
    );
    return currentUserData;
  };
  useEffect(() => {
    const positionArray = setPositionList(mockUsersData);
    setPositions(positionArray);
    //add dependence fetched profile data
  }, []);

  useEffect(() => {
    const setAllProfiles = () => {
      //set my profile
      const currentUserProf = findMy(mockUsersData);
      setMyProfile(currentUserProf[0]);
      //set coworkers' profiles
      const otherProfs = filterOutMy(mockUsersData);
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
      // console.log("filtered sched", foundSched);
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
            <ScheduleBar
              dayStart={dayStart}
              dayEnd={dayEnd}
              schedFrom={from}
              schedTo={to}
              schedObj={foundSched}
            />
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
        positions={positions}
      />

      <DisplayOthersSched
        cowokerProfs={cowokerProfs}
        cowerkerScheds={cowerkerScheds}
        positions={positions}
        displaySched={displaySched}
      />
    </>
  );
};

export default WeeklyTableBody;
