import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Messaging.css";

const Messaging = () => {
  const [roomName, setRoomName] = useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const [margin, setMargin] = useState("auto");
  const [padding, setPadding] = useState("10px");
  const [show, setShow] = useState(true);


  useEffect(() => {
    if (!show) return;
    setMargin("0");
    setPadding("0");
  }, [show]);

  return (
    <div className="Messaging-container" margin={margin} padding={padding}>
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/${roomName}`} className="enter-room-button">
        Join room!
      </Link>
    </div>
  );
};

export default Messaging;