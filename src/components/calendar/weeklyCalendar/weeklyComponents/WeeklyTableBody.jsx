import React, { useContext, useEffect, useState } from "react";
import DisplayOthersSched from "./weeklyTableBody/DisplayOthersSched";
import DisplayMySched from "./weeklyTableBody/DisplayMySched";
import setPositionList from "../../../Reusables/functions/setPositionList";
import { LoginContext } from "../../../authentication/LoginProvider";
import { StoreContext } from "../../../authentication/StoreProvider";
import moment from "moment";

const WeeklyTableBody = (props) => {
  const { selectedDay, settingHrsObj, daysInWeek, timezone, filter } =
    props;
  const userId = useContext(LoginContext).user?.id || 9;
  const storeId = useContext(StoreContext).store?.Store_idStore ||1;
  // console.log("filter in table body", filter);

  const [positions, setPositions] = useState();
  const [mySched, setMySched] = useState();
  const [cowokersSched, setCoworkersSched] = useState();
  const [filteredEmpSched, setFilteredEmpSched] = useState();

  const startDay = selectedDay?.clone().startOf("week");



  //set schdules & position colors
  useEffect(() => {
    console.log("fetching useEffect")
    const getAllSchedules = async () => {
      try {
        //need to fetch schedule with priod from server
        const weekStart = startDay?.clone().format();
        const res = await fetch(
          `/api/schedule/week?storeId=${storeId}&userId=${userId}&startDay=${weekStart}`
        );
        const scheduleData = await res.json();
          
        setMySched(() => scheduleData.mySchedules);
        setCoworkersSched(() => scheduleData.coworkersSchedules);
        //enable this line chduleData
        const positionArray =
          scheduleData &&
          setPositionList([
            ...scheduleData.mySchedules,
            ...scheduleData.coworkersSchedules,
          ]);
        setPositions(positionArray);
      } catch (err) {
        console.log("failed to fetch schedule data", err);
        setMySched(() => null);
        setCoworkersSched(() => null);
      }
    };
    startDay && getAllSchedules();
  }, [selectedDay, storeId]);

  useEffect(() => {
    const applyFilter = () => {
      // console.log("filter", filter, filter==="All");
      if (filter === "All") {
        console.log("all filter")
        return setFilteredEmpSched(() => cowokersSched);
      } else if (filter === "My Position") {
        const filteredByPosition = cowokersSched?.filter(
          (sched) => sched.position === mySched[0].position
        );
        console.log("filteredByposiotn", filteredByPosition);
        return setFilteredEmpSched(() => filteredByPosition);
      } else if (filter === "Working") {
        const filteredByWorking = cowokersSched?.filter(
          (sched) => sched.schedules.length !== 0
        );
        return setFilteredEmpSched(()=>filteredByWorking);
      } else {
        return console.log("Can not find filter");
      }
    };
    applyFilter();
    // console.log("seted scheduels",filteredEmpSched)
  }, [filter, selectedDay, cowokersSched, mySched]);

  return (
    <>
      <div className="Empty-div"></div>
      {mySched && (
        <DisplayMySched
          myProfile={mySched[0]}
          positions={positions}
          daysInWeek={daysInWeek}
          settingHrsObj={settingHrsObj}
          timezone={timezone}
        />
      )}

      {cowokersSched && (
        <DisplayOthersSched
          schedules={filteredEmpSched}
          positions={positions}
          daysInWeek={daysInWeek}
          settingHrsObj={settingHrsObj}
          timezone={timezone}
        />
      )}
    </>
  );
};

export default WeeklyTableBody;
