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
import MonthlyCalendar from "./components/calendar/monthlyCalendar/MonthlyCalendar";

import Calendar from "./pages/calendar/Calendar";
import Logout from "./components/authentication/Logout";
import ProfileSelection from "./components/authentication/LocationSelection";
import { StoreProvider } from "./components/authentication/StoreProvider";
import FindCoworkers from "./components/messaging/FindCoworkers";
import Message from "./components/messaging/Message";



const SERVER = "http://localhost:4000";

function App() {
  var socket = socketClient(SERVER);
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });
  return (
    <div className="App">
      <LoginProvider>
        <StoreProvider>
        
        <BrowserRouter>
        <Navbar />
          <Routes>
            {/* <Route path="/location" element={<Location />} /> */}
            <Route path="/selection" element={<ProfileSelection />} />
           
            <Route
              path="/home"
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
            
            <Route path="/" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/coworkers" element={<FindCoworkers/>} />
            <Route path="/message" element={<Message/>} />
            
          </Routes>
        </BrowserRouter>
        </StoreProvider>
      </LoginProvider>
    </div>
  );
}

export default App;
