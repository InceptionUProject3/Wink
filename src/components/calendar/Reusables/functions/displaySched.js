import moment from "moment";
import ScheduleBar from '../components/ScheduleBar'

const displaySched = (daysInWeek, storeOpen, storeClose, schedules) => {
    return daysInWeek?.map((day, i) => {
      //need to change to store hrs
    //   console.log('all', daysInWeek, storeOpen,storeClose, schedules)
      const oneDay = moment(day);
      const dayStart = oneDay
        .clone()
        .set({ h: storeOpen?.hour(), m: storeOpen?.minute() });
      const dayEnd = oneDay.set({
        h: storeClose?.hour(),
        m: storeClose?.minute(),
      });


      const foundSched = schedules?.find(
        (sched) =>
          moment(sched.endtime) > dayStart && moment(sched.starttime) < dayEnd
      );

      if (foundSched === undefined) {
        return (
          <div
            className="Schedule"
            key={`emptySched ${schedules?.scheduleId} ${i}`}
          ></div>
        );
      } else if (foundSched) {
        const schedFrom = moment(foundSched.starttime);
        const schedTo = moment(foundSched.endtime);
        const newFrom = schedFrom > dayStart ? schedFrom : dayStart;
        const newTo = schedTo < dayEnd ? schedTo : dayEnd;

        return (
          <div key={`Sched ${schedules?.scheduleId} ${i}`} className="Schedule">
            <ScheduleBar
              dayStart={dayStart}
              dayEnd={dayEnd}
              newFrom={newFrom}
              newTo={newTo}
              schedObj={foundSched}
            />
            {foundSched.workcode === 0 && (
              <div className="text">
                {newFrom?.format("h:mma")}-{newTo?.format("h:mma")}
              </div>
            )}
          </div>
        );
      }
    });
  };

export default displaySched;