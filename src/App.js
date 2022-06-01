import logo from "./images/wink.logo.png";
import "./App.css";
import Messaging from "./components/messaging/Messaging";
import MonthlyCalender from "./components/calendar/monthlyCalender/monthlyCalender";
// import Training from "./components/training/Training";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import socketClient from "socket.io-client";
import Chat from "./components/messaging/Chat";
import WeeklyCalendar from "./components/calendar/weeklyCalendar/WeeklyCalendar";
import LoginForm from "./components/authentication/LoginForm";
import Logout from "./components/authentication/Logout";
import RequireAuth from "./components/authentication/RequireAuth";

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
            element={<RequireAuth>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>WINK Optical Software PROJECT</p>
                <a
                  class="App-link"
                  href="https://www.downloadwink.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about WINK
                </a>
              </header>
              </RequireAuth>}
          />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/:roomId" element={<Chat />} />
          <Route path="/weeklyCalender" element={<WeeklyCalendar />}/>
          <Route path="/monthlyCalender" element={<MonthlyCalender />}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
