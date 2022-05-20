import logo from './images/wink.logo.jpg';
import './App.css';
import Messaging from './components/messaging/Messaging';
import Calendar from './components/calendar/Calendar';
import Training from './components/training/Training';
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ 
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is our project for Wink Optical Software.
        </p>
        <a
          className="App-link"
          href="https://www.downloadwink.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about Wink
        </a>
      </header>
      } />
      <Route path="/messaging" element={<Messaging/> } />
      </Routes>
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
