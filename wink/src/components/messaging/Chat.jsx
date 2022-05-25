import React from "react";
// import useChat from "../useChat";
import { useState } from "react";

const Chat = (props) => {
  const { roomId } = props.match.params; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };
  return (
  <div className="chat">
      <h1 className="room-name">Chatting with: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
        {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
       <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
      </div>
  );
};

export default Chat;
