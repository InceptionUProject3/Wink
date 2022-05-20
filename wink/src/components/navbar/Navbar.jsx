import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="container">
        <h1>
          Wink Scheduling System
        </h1>

        <ul>
        <li>
            <p>
              <a className="menu" href="/">Home</a>
            </p>
          </li>
          <li>
            <p>
              <a className="menu" href="/messaging">Messaging</a>
            </p>
          </li>

          </ul>
        </div>
        </div>

  )
}

export default Navbar