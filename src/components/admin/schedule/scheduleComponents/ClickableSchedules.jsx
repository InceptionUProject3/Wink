import React, { useEffect, useState } from "react";
import ClickableScheduleBar from "./ClickableScheduleBar";
import groupByPosition from "../../../Reusables/functions/groupByPosition";
import ProfileSmall from "../../../Reusables/components/ProfileSmall";
import moment from "moment";

const ClickableSchedules = (props) => {
  const {
    schedules,
    daysInWeek,
    timezone,
    filters,
    setSchedModalOpen,
    selectedDate,
    setSelectedDate,
    selectedSched,
    setSelectedSched,
    settingHrsObj
  } = props;
  // console.log("all", schedules, positions, daysInWeek, startTimeOfDay, storeClose)
  const [groupedProfs, setGroupedProfs] = useState();
  const [filteredPos, setFilteredPos] = useState([]);
  const [filteredEmpSched, setFilteredEmpSched] = useState([]);

  //filter update
  //Fiilter availability
  useEffect(() => {

    const getFilteredHrs = () => {
      const filterHrs = filters?.hours;
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
        });
        return newSched.push(...foundSched);
      });
      return setFilteredEmpSched(() => newSched);
    };

    const getFilteredPos = () => {
      const positionFilterArr = filters?.positions;
      const newPosition = [];
      positionFilterArr?.map((p)=>{
        if(p.value){
          // console.log("position filter", p)
          newPosition.push(p);
        }
      })
      return setFilteredPos(()=>newPosition)
    };

    getFilteredHrs();
    getFilteredPos();
    
  }, [schedules, filters]);

  //filter employees with employee filter
  useEffect(() => {
    const searchEmp = () => {
      const filteredEmps = filters?.employees;
      //If there is no filtered employees, return all employees
      if (filteredEmps?.length === 0) return;
      //filtering schedules for filtered employees
      setFilteredEmpSched([]);
      schedules?.map((sched) => {
        filteredEmps?.map((e) => {
          if (sched.userId === e.userId) {
            setFilteredEmpSched((pre) => [...pre, sched]);
          }
        });
      });
    };
    searchEmp();
  }, [schedules, filters]);

  //after all filters applied, group schedule by positions.
  useEffect(() => {
    const groupedObj = groupByPosition(filteredEmpSched);
    setGroupedProfs(() => groupedObj);
  }, [filteredEmpSched]);

  //function to calculate scheduled hrs in week for each employees
  const calculateWeekHrs = (emp) => {
    let calcHrsinWeek = 0;
    const foundEmpScheds = emp.schedules;
    foundEmpScheds?.map((sched) => {
      //only work schedule will be added.
      if (sched.workcode === 0) {
        const to = moment(sched.endtime);
        const from = moment(sched.starttime);
        calcHrsinWeek +=
          Math.round((moment(to - from).unix() / 60 / 60) * 100) / 100;
      }else{
        console.log('Vacation schedule will not be calculated.')
      }
    });
    return calcHrsinWeek;
  };

  return (
    <>
      {filteredPos?.map((position, i) => {
        const empInPositon = groupedProfs && groupedProfs[position.type];
        // console.log('filteredpos i', filteredPos, groupedProfs)
        if (empInPositon) {
          return empInPositon?.map((emp, index) => {
            const calcHrsinWeek = calculateWeekHrs(emp);
            const schedHrsinWeek = emp.availability.availHrsinWeek;
            return (
              <React.Fragment key={`OtherScheds ${i} ${index}`}>
                <ProfileSmall
                  emp={emp}
                  position={position}
                  i={i}
                  index={index}
                  calcHrsinWeek={calcHrsinWeek}
                  schedHrsinWeek={schedHrsinWeek}
                />
                <ClickableScheduleBar
                  daysInWeek={daysInWeek}
                  settingHrsObj={settingHrsObj}
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
