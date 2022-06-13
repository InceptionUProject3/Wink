import React, { useEffect, useState } from "react";
//useContext to fetch data from server
import mockUsersData from "../mockUsersData.json";
//fetch sheduleData for store
import mockScheduleData from "../mockScheduleData.json";

import moment from "moment";

import DisplayOthersSched from "./weeklyTableBody/DisplayOthersSched";
import DisplayMySched from "./weeklyTableBody/DisplayMySched";
import ScheduleBar from "../Reusables/components/ScheduleBar";
import setPositionList from "../Reusables/functions/setPositionList";
import findMy from "../Reusables/functions/findMy";
import filterOutMy from "../Reusables/functions/filterOutMy";

const WeeklyTableBody = (props) => {
  const { selectedDay, storeOpen, storeClose } = props;

  const [weekAllScheds, setWeekAllScheds] = useState();
  // const [AllProfiles, setAllProfiles] = useState();
  const [week, setWeek] = useState();
  const [positions, setPositions] = useState();

  const startDay = selectedDay?.clone().startOf("day");
  const endDay = selectedDay?.clone().add(6, "days").endOf("day");

  //need to fetch current logged in user useContext
  const currentUser = { UserId: 2, storeId: 1 };

  useEffect(() => {
    const positionArray = setPositionList(mockUsersData);
    setPositions(positionArray);
    //add dependence fetched profile data
  }, []);

  useEffect(() => {
    const setAllProfiles = () => {
      //send store id
      //backend=>useprevileges : find userids, UserprofileId then user: find user  name and userprofile: position
      // setAllProfiles(mockScheduleData);
    };
    setAllProfiles();
  }, []);

  //set schdules
  useEffect(() => {
    const getAllSchedules = () => {
      //need to fetch schedule from server
      //Filter cowokers' schedules and only bring those which meet this period condition. Send startDay and endDay and store info to find schedule to backend
      const thisWeekSched = mockScheduleData?.filter(
        (sched) =>
          moment(sched.to, "MMM DD YYYY HH:mm") > startDay &&
          moment(sched.from, "MMM DD YYYY HH:mm") < endDay
      );
      // console.log("this week schedules", thisWeekSched)
      setWeekAllScheds(thisWeekSched);
    };
    getAllSchedules();
  }, [selectedDay]);

  useEffect(() => {
    const weekArray = [];
    for (let i = 0; i < endDay?.diff(startDay, "days") + 1; i++) {
      weekArray.push(startDay?.clone().add(i, "days").format("MMM DD YYYY"));
    }
    return setWeek(weekArray);
  }, [selectedDay]);

  //   console.log("weekarray",week)

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

      const foundSched = ForWhom?.find(
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
      <div className="Empty-div"></div>
      <DisplayMySched
        myProfile={findMy(mockUsersData, currentUser)[0]}
        mySched={findMy(weekAllScheds, currentUser)}
        displaySched={displaySched}
        positions={positions}
      />

      <DisplayOthersSched
        cowokerProfs={filterOutMy(mockUsersData, currentUser)}
        cowerkerScheds={filterOutMy(weekAllScheds, currentUser)}
        positions={positions}
        displaySched={displaySched}
      />
    </>
  );
};

export default WeeklyTableBody;
