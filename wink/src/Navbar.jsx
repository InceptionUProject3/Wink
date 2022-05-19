import React from 'react';
import { Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/Calendar.jsx">Calendar</Link>
    </li>
    <li>
      <Link to="/Messaging.jsx">Messaging</Link>
    </li>
    <li>
      <Link to="/Training.jsx">Training</Link>
    </li>
    <li>
    <Link to="/ProgressTracking.jsx">Progress Tracking</Link>
    </li>
  </div>
)}

  //This is a NavBar