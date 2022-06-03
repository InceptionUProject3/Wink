import React, { useState } from 'react'
import WeeklyCalendar from '../components/calendar/weeklyCalendar/WeeklyCalendar'
import ChatPopup from '../components/messaging/ChatPopup'
import Messaging from '../components/messaging/Messaging'
import PersonalTasks from '../components/tasks/PersonalTasks'
import Training from '../components/training/Training'
import './homepage.css'

const HomePage = () => {
    const [show, setShow] = useState(false)
  return (
      <div className='container'>
    <WeeklyCalendar className="calendar"/>
    <Training className="training"/>
    <PersonalTasks className= "tasks"/>
    <ChatPopup className="message" show={show}/>
        </div>)
}

export default HomePage
