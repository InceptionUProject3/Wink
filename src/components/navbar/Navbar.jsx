import React from 'react'
import "./NavBar.css";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="container">
        <h1 class="text">WINK SYSTEM</h1>
          <ul><ul><ul><ul><ul><ul>        
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
            <a className="menu" href="/"><button class="Training">TRAINING</button></a>
            </p>
            <p> 
            <a className="menu" href="/"><button class="Employee">EMPLOYEE</button></a>
            </p>
            <p> 
            <a className="menu" href="/"><button class="Employeer">EMPLOYEER</button></a>
            </p>
            <p> 
            <a className="menu" href="/"><button class="Adjustment"></button></a>
            </p>
          </ul></ul></ul></ul></ul></ul>
        </div>
        </div>

  )
}



export default Navbar
