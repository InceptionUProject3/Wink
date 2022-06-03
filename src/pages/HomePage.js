import React, { useState } from 'react'
import WeeklyCalendar from '../components/calendar/weeklyCalendar/WeeklyCalendar'
import ChatPopup from '../components/messaging/ChatPopup'

import PersonalTasks from '../components/tasks/PersonalTasks'
import Training from '../components/training/Training'
import './homepage.css'

const HomePage = () => {
    const [show, setShow] = useState(false)
  return (
      <div className='home'>
    <WeeklyCalendar className="calendar"/>
    <Training className="training"/>
    <PersonalTasks className= "tasks"/>
    <ChatPopup className="message" show={show}/>
        </div>)
}

export default HomePage
