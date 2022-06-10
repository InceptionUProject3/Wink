import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import socketClient from "socket.io-client";
import LoginForm from "./components/authentication/LoginForm";

import RequireAuth from "./components/authentication/RequireAuth";
import LoginProvider from "./components/authentication/LoginProvider";

import HomePage from "./pages/homepage/HomePage";
import Messaging from "./components/messaging/Messaging";
import Chat from "./components/messaging/Chat";
import MonthlyCalendar from "./components/calendar/monthlyCalendar/monthlyCalendar";

import Calendar from "./pages/calendar/Calendar";

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
            <Route path='/calendar' element={<Navigate replace to="/calendar/monthly"/>}/>
            <Route path="/calendar/*" element={<Calendar/>}/>
            <Route path="/monthlyCalendar" element={<MonthlyCalendar />} />
            
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </div>
  );
}

export default App;
