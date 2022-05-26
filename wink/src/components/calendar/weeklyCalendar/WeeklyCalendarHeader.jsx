import React, { useEffect } from 'react'
// import moment from 'moment';

const WeeklyCalendarHeader = (props) => {
    const {selectedDay,setSelectedDay}= props
    const selectDayInHeader = selectedDay.format('MMM YYYY');
    
    const moveToPreWeek = () =>{
        setSelectedDay((pre)=>pre.clone().subtract(7,'days'))
        // console.log('Selected day',selectedDay)
    }
    const moveToNextWeek=()=>{
        setSelectedDay((pre)=>pre.clone().add(7,'days'))
    }
  return (
    <div className='WeeklyCalHeader'>
        <button onClick={moveToPreWeek}>&lt;</button>
        <div className='DayInHeader'>{selectDayInHeader}</div>
        <button onClick={moveToNextWeek}>&gt;</button>
    </div>
  )
}

export default WeeklyCalendarHeader