import React from 'react'

const MonthlyCalendarHeader = (props) => {
    const {day,setday} = props
    const monthInHeader = day.format('MMM YYYY')
    
    
  return (
    <div className='Monthly-header'>

    </div>
  )
}

export default MonthlyCalendarHeader

