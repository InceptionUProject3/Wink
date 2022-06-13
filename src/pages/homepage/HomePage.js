import moment from "moment";
import React, { useState } from "react";
import TodayButton from "../../components/calendar/Reusables/components/TodayButton";
import WeeklyCalendar from "../../components/calendar/weeklyCalendar/WeeklyCalendar";
import ChatPopup from "../../components/messaging/ChatPopup";

import PersonalTasks from "../../components/tasks/PersonalTasks";
import Training from "../../components/training/Training";
import "./homepage.css";

const HomePage = () => {
  const [show, setShow] = useState(false);
  const [selectedDay, setSelectedDay] = useState(moment());
  return (
    <div className="home">
      <div className="calendar-container">
        <TodayButton setSelectedDay={setSelectedDay} />
        <WeeklyCalendar
          className="calendar"
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </div>

      <Training className="training" />
      <PersonalTasks className="tasks" />
      <ChatPopup className="message" show={show} />
    </div>
  );
};

export default HomePage;
