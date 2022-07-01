import React, { useEffect, useState } from "react";
import ClickableScheduleBar from "./ClickableScheduleBar";
import groupByPosition from "../../../calendar/Reusables/functions/groupByPosition";
import ProfileSmall from "../../../calendar/Reusables/components/ProfileSmall";
import moment from "moment";

const ClickableSchedules = (props) => {
  const {
    schedules,
    positions,
    daysInWeek,
    storeOpen,
    scheduleHrs,
    timezone,
    filters,
    selectedEmp,
    setSchedModalOpen,
    selectedDate,
    setSelectedDate,
    selectedSched,
    setSelectedSched,
  } = props;
  // console.log("all", schedules, positions, daysInWeek, storeOpen, storeClose)
  const [groupedProfs, setGroupedProfs] = useState();
  const [filteredPos, setFilteredPos] = useState();
  const [filteredEmpSched, setFilteredEmpSched] = useState([]);
  // const [workHrsinWeek, setWorkHrsinWeek] = useState();
  //filter update
  useEffect(() => {
    // console.log("filters", filters);
    const filteringHrs = () => {
      // const filteredEmpSched
      const filterHrs = filters?.hours;
      // const availArray = filterHrs?.map((avail)=>{return{[avail.type]:avail.value}})
      const newSched = [];
      filterHrs?.map((avail) => {
        const foundSched = schedules?.filter((sched) => {
          const availinWeek = sched.availability.availHrsinWeek;
          if (avail.value) {
            if (avail.min && avail.max) {
              return availinWeek >= avail.min && availinWeek < avail.max;
            } else if (avail.min === 0) {
              return availinWeek < avail.max;
            } else if (!avail.max) {
              return availinWeek >= avail.min;
            } else {
              console.log("Filter range is wrong");
            }
          }
          // console.log("result", foundSched);
        });
        return newSched.push(...foundSched);
      });
      console.log("result", newSched);
      return setFilteredEmpSched(() => newSched);
    };

    const filteringPosition = () => {
      // if (selectedEmp) return setFilteredPos(positions);

      const positionfilterArr = filters?.positions;
      const newPosition = [];
      positions?.map((p) => {
        const checked = positionfilterArr?.find((e) => e.type === p.position);
        // console.log('filtering position',checked)
        if (checked?.value === true) {
          newPosition.push(p);
        }
      });
      // console.log("newPosition",newPosition)
      return setFilteredPos(() => newPosition);
    };
    filteringHrs();
    filteringPosition();
  }, [schedules, filters, selectedEmp, positions]);

  useEffect(() => {
    const searchEmp = () => {
      // console.log("filtering emp", filteredEmpSched);
      if (selectedEmp?.length === 0) return;
      setFilteredEmpSched([]);
      return schedules?.map((sched) => {
        return selectedEmp.map((e) => {
          if (sched.userId === e.userId) {
            return setFilteredEmpSched((pre) => [...pre, sched]);
          }
        });
      });
    };
    searchEmp();
  }, [schedules, selectedEmp, filters]);
  // console.log("outside", filteredEmpSched);
  useEffect(() => {
    // console.log("select emp sched", filteredEmpSched);
    const groupedObj = groupByPosition(filteredEmpSched);
    setGroupedProfs(() => groupedObj);
  }, [filteredPos, filteredEmpSched]);

  const calculatingWeekHrs = (emp) => {
    //calculated hours
    let calcHrsinWeek = 0;
    const foundEmpScheds = emp.schedules;
    foundEmpScheds?.map((sched) => {
      if (sched.workcode === 0) {
        const to = moment(sched.endtime);
        const from = moment(sched.starttime);
        calcHrsinWeek +=
          Math.round((moment(to - from).unix() / 60 / 60) * 100) / 100;
      }
    });
    return calcHrsinWeek;
  };

  return (
    <>
      {filteredPos?.map((position, i) => {
        const empInPositon = groupedProfs && groupedProfs[position.position];
        // console.log('here', position.position)
        if (empInPositon) {
          return empInPositon?.map((emp, index) => {
            const calcHrsinWeek = calculatingWeekHrs(emp);
            const schedHrsinWeek = emp.availability.availHrsinWeek
            return (
              <React.Fragment key={`OtherScheds ${i} ${index}`}>
                <ProfileSmall
                  emp={emp}
                  position={position}
                  i={i}
                  index={index}
                  calcHrsinWeek={calcHrsinWeek}
                  schedHrsinWeek ={schedHrsinWeek}
                />
                <ClickableScheduleBar
                  daysInWeek={daysInWeek}
                  storeOpen={storeOpen}
                  scheduleHrs={scheduleHrs}
                  employeeSched={emp}
                  timezone={timezone}
                  position={position}
                  setSchedModalOpen={setSchedModalOpen}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedSched={selectedSched}
                  setSelectedSched={setSelectedSched}
                />
              </React.Fragment>
            );
          });
        }
      })}
    </>
  );
};

export default ClickableSchedules;
