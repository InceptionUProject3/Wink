import moment from "moment";
import React, { useState, useContext } from "react";
import TodayButton from "../../components/calendar/Reusables/components/TodayButton";
import WeeklyCalendar from "../../components/calendar/weeklyCalendar/WeeklyCalendar";
import ChatPopup from "../../components/messaging/ChatPopup";

import PersonalTasks from "../../components/tasks/PersonalTasks";
import Training from "../../components/training/Training";
import "./homepage.css";
import { StoreContext } from "../../components/authentication/StoreProvider";

const HomePage = () => {
const storeContext = useContext(StoreContext);
// console.log("this is on the homepage", storeContext);
  const [show, setShow] = useState(false);
  const [selectedDay, setSelectedDay] = useState(moment());

  return (
    <div className="home">
      <div className="calendar-container">
        <div className="calendar-header">
          <TodayButton setSelectedDay={setSelectedDay} />
        </div>
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
