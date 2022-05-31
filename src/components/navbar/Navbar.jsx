import React from 'react'
import "./NavBar.css";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="container">
        <h1 class="text">WINK Scheduling System</h1>
        <ul>
            <p>
              <a className="menu" href="/"><button class ="Home">HOME</button></a>
            </p>
            <p>
              <a className="menu" href="/messaging"><button class="Messaging">MESSAGING</button></a>
            </p>
            <p>
              <a className="menu" href="/"><button class="Calendar">CALENDAR</button></a>
            </p>
            <p>
            <a className="menu" href="/"><button class="Training"></button></a>
            </p>
          </ul>
        </div>
        </div>

  )
}



export default Navbar
