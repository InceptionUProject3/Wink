import logo from './wink_logo.jpg';
import './App.css';
import Messaging from './Messaging';
import Calendar from './Calendar';
import Training from './Training';

function App() {
  return (
    <div className="App">
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
      <Messaging/> 
      <Calendar/>
      <Training/>
    </div>
    
  );
}

export default App;
