/** Import resorces from files. It work as a "tools" to produce the functionality of the app. */
import React from 'react'

/** The authProvider methods must return a Promise. */
const MonthlyCalendarHeader = (props) => {
    const {day,setday} = props
    const monthInHeader = day.format('MMM YYYY')
    
/** Returns the result of className denominated Monthly-header. */
  return (
    <div className='Monthly-header'>

    </div>
  )
}

/** It's part of the ES6 module system thats defines a default export. In the case of Wink project MonthlyCalendarHeader. */
export default MonthlyCalendarHeader