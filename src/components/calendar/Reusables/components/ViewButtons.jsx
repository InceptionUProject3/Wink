import moment from "moment";
import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import './viewButtons.css'

const ViewButtons = () => {

  const navigate = useNavigate();
  const [selectedCal, setSelectedCal] = useState("monthly ");
  
  
  const buttonActive = (e) => {
    const clicked = e.currentTarget.className;
    return setSelectedCal(clicked);
  };
  return (
   
      <div className="View-buttons">
        <button
          className={`monthly ${selectedCal === "monthly " ? "selected" : ""}`}
          onClick={(e) => {
            navigate("/calendar/monthly");
            buttonActive(e);
          }}
        >
          <BsCalendar />
          <p>M</p>
        </button>
        <button
          className={`weekly ${selectedCal === "weekly " ? "selected" : ""}`}
          onClick={(e) => {
            navigate("/calendar/weekly");
            buttonActive(e);
          }}
        >
          <BsCalendar />
          <p>W</p>
        </button>
        <button
          className={`daily ${selectedCal === "daily " ? "selected" : ""}`}
          onClick={(e) => {
            navigate("/calendar/daily");
            buttonActive(e);
          }}
        >
          <BsCalendar />
          <p>D</p>
        </button>
      </div>
      
    
  );
};

export default ViewButtons;
