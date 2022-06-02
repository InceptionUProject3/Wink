import React from 'react'
import WeeklyCalendar from '../components/calendar/weeklyCalendar/WeeklyCalendar'
import ChatPopup from '../components/messaging/ChatPopup'
import Messaging from '../components/messaging/Messaging'
import PersonalTasks from '../components/tasks/PersonalTasks'
import Training from '../components/training/Training'


const HomePage = () => {
  return (
      <div>
    <WeeklyCalendar/>
    <Training/>
    <PersonalTasks/>
    <ChatPopup/>
        </div>)
}

export default HomePage
