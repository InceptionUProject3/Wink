import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react';
// import "./Home.css";

const Messaging = () => {
  const [roomName, setRoomName] = useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };
  return (
    <div className='messaging'>
      
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/${roomName}`} className="enter-room-button">
        Join room
      </Link>
      </div>
  )
}

export default Messaging