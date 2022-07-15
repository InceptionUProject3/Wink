import React, { useEffect, useState } from "react";
import ClickableScheduleBar from "./ClickableScheduleBar";
import groupByPosition from "../../../Reusables/functions/groupByPosition";
import ProfileSmall from "../../../Reusables/components/ProfileSmall";
import moment from "moment";
import calculateWeekHrs from "../../../Reusables/functions/calculateWeekHrs";

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
    settingHrsObj,
  } = props;

  const [groupedProfs, setGroupedProfs] = useState();
  const [filteredPos, setFilteredPos] = useState([]);
  console.log('schedules', schedules)
  const [filteredEmpSched, setFilteredEmpSched] = useState(schedules);

  //filter update
  useEffect(() => {
    //update filtered Employee schedules by searched employees 
    const filteredEmpSchedArray = [];
    const searchEmp = () => {
      const filteredEmps = filters?.employees;
      schedules?.map((sched) => {
        filteredEmps?.map((e) => {
          if (sched.userId === e.userId) {
            filteredEmpSchedArray.push(sched);
          }
        });
      });
    };
    searchEmp();
    //update filtered Employee schedules by availabilty.
    const getFilteredHrs = () => {
      const filterHrs = filters?.hours;
      const newSched = [];
      filterHrs?.map((avail) => {
        const foundSched = filteredEmpSchedArray?.filter((sched) => {
          const availinWeek = sched.availability?.availHrsinWeek;
          if(!availinWeek) return true
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
      //set filteredEmpSched to one applied availability and searched filters
      return setFilteredEmpSched(() => newSched);
    };
    getFilteredHrs();

    const getFilteredPos = () => {
      const positionFilterArr = filters?.positions;
      const newPosition = [];
      positionFilterArr?.map((p) => {
        if (p.value) {
          // console.log("position filter", p)
          newPosition.push(p);
        }
      });
      return setFilteredPos(() => newPosition);
    };
    getFilteredPos();
  }, [filters]);

  //after all filters applied, group schedule by positions.
  useEffect(() => {
    
    const groupedObj = groupByPosition(filteredEmpSched);
    setGroupedProfs(() => groupedObj);
  }, [filteredEmpSched]);

  // //function to calculate scheduled hrs in week for each employees
  // const calculateWeekHrs = (emp) => {
  //   let calcHrsinWeek = 0;
  //   const foundEmpScheds = emp.schedules;
  //   foundEmpScheds?.map((sched) => {
  //     //only work schedule will be added.
  //     if (sched.workcode === 0) {
  //       const to = moment(sched.endtime);
  //       const from = moment(sched.starttime);
  //       calcHrsinWeek +=
  //         Math.round((moment(to - from).unix() / 60 / 60) * 100) / 100;
  //     } else {
  //       console.log("Vacation schedule will not be calculated.");
  //     }
  //   });
  //   return calcHrsinWeek;
  // };

  return (
    <>
      {filteredPos?.map((position, i) => {
        const empInPositon = groupedProfs && groupedProfs[position.type];
        // console.log("employee",empInPositon)
        if (empInPositon) {
          return empInPositon?.map((emp, index) => {
            const calcHrsinWeek = calculateWeekHrs(emp);
            const schedHrsinWeek = emp.availability?.availHrsinWeek;
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
