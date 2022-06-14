import moment from 'moment';
import React, { useState } from 'react'

const DailyCalendarTable = () => {
    const [selectedDay, setSelectedDay] = useState(moment());
  return (
    <div className='DailyCal-container'>
        <div>{selectedDay?.format("MMM DD")}</div>
        <div>{selectedDay?.format("dddd")}</div>
    </div>
  )
}

export default DailyCalendarTable