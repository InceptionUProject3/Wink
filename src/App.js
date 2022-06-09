import "./App.css";
import Messaging from "./components/messaging/Messaging";
import MonthlyCalendar from "./components/calendar/monthlyCalendar/monthlyCalendar";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import socketClient from "socket.io-client";
import Chat from "./components/messaging/Chat";
import WeeklyCalendar from "./components/calendar/weeklyCalendar/WeeklyCalendar";
import LoginForm from "./components/authentication/LoginForm";

import RequireAuth from "./components/authentication/RequireAuth";
import HomePage from "./pages/homepage/HomePage";
import DailyCalendar from "./components/calendar/dailyCalendar/DailyCalendar";
import LoginProvider from "./components/authentication/LoginProvider";

const SERVER = "http://localhost:4000";

function App() {
  var socket = socketClient(SERVER);
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });
  return (
    <div className="App">
      <LoginProvider>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />

            <Route
              path="/messaging"
              element={
                <RequireAuth>
                  <Messaging />
                </RequireAuth>
              }
            />
            <Route path="/:roomId" element={<Chat />} />
            <Route path="/monthlyCalendar" element={<MonthlyCalendar />} />
            <Route path="/weeklyCalendar" element={<WeeklyCalendar />} />
            <Route path="/dailyCalendar" element={<DailyCalendar />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </div>
  );
}

export default App;
