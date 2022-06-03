import "./App.css";
import Messaging from "./components/messaging/Messaging";
import MonthlyCalender from "./components/calendar/monthlyCalender/monthlyCalender";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import socketClient from "socket.io-client";
import Chat from "./components/messaging/Chat";
import WeeklyCalendar from "./components/calendar/weeklyCalendar/WeeklyCalendar";
import LoginForm from "./components/authentication/LoginForm";
import Logout from "./components/authentication/Logout";
import RequireAuth from "./components/authentication/RequireAuth";
import HomePage from "./pages/HomePage";

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
              // <RequireAuth>
                <HomePage />
              // </RequireAuth>
            }
          />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/:roomId" element={<Chat />} />
          <Route path="/weeklyCalendar" element={<WeeklyCalendar />} />
          <Route path="/monthlyCalender" element={<MonthlyCalender />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
