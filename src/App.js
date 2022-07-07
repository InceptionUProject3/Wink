import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginForm from "./components/authentication/LoginForm";

import RequireAuth from "./components/authentication/RequireAuth";
import LoginProvider from "./components/authentication/LoginProvider";

import HomePage from "./pages/homepage/HomePage";
import Messaging from "./components/messaging/Messaging";

import MonthlyCalendar from "./components/calendar/monthlyCalendar/MonthlyCalendar";
// import DisplayHolidays from "./components/calendar/monthlyCalendar/DisplayHolidays"
import Calendar from "./pages/calendar/Calendar";
import Logout from "./components/authentication/Logout";
import ProfileSelection from "./components/authentication/LocationSelection";
import { StoreProvider } from "./components/authentication/StoreProvider";
import FindCoworkers from "./components/messaging/FindCoworkers";
import Message from "./components/messaging/Message";
import MessageWindow from "./components/messaging/MessageWindow";
import Messenger from "./pages/messanger/Messenger";

import AdminSchedule from "./pages/adminSchedule/AdminSchedule";
import MessageProvider, { MessageContext } from "./components/messaging/MessageContext";
import PrivateRoute from "./components/authentication/PrivateRoute";

const SERVER = "http://localhost:4000";

function App() {
  
  return (
    <div className="App">
      <LoginProvider>
        <StoreProvider>
          <MessageProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                {/* <Route path="/location" element={<Location />} /> */}
                <Route path="/selection" element={<ProfileSelection />} />

                <Route path="/coworkers" element={<FindCoworkers />} />

                <Route path="/messenger" element={<Messenger />} />

                <Route
                  path="/calendar"
                  element={<Navigate replace to="/calendar/weekly" />}
                />
                <Route path="/calendar/*" element={<Calendar />} />
                <Route path="/monthlyCalendar" element={<MonthlyCalendar />} />

                <Route path="/" element={<LoginForm />} />
                <Route path="/logout" element={<Logout />} />

              {/* admin route */}
              <Route path="/admin/schedule" mustBeAdmin element={<PrivateRoute element={<AdminSchedule />}/>} />
              
              {/* <Route path="/events" element={<DisplayHolidays />} /> */}
            </Routes>
          </BrowserRouter>
          </MessageProvider>
        </StoreProvider>
      </LoginProvider>
    </div>
  );
}

export default App;
