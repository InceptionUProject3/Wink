import logo from "./images/wink.logo.jpg";
import "./App.css";
import Messaging from "./components/messaging/Messaging";
import Calendar from "./components/calendar/Calendar";
import Training from "./components/training/Training";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import socketClient from "socket.io-client";
import Chat from "./components/messaging/Chat";
import WeeklyCalendar from "./components/calendar/weeklyCalendar/WeeklyCalendar";

const SERVER = "http://localhost:4000";

function App() {
  var socket = socketClient(SERVER);
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>This is our project for Wink Optical Software.</p>
                <a
                  className="App-link"
                  href="https://www.downloadwink.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about Wink
                </a>
              </header>
            }
          />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/:roomId" element={<Chat />} />
          <Route path="/weeklyCalender" element={<WeeklyCalendar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
