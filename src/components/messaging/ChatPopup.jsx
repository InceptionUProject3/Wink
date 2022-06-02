import React, { useState } from 'react'
import Messaging from './Messaging';
import "./ChatPopup.css";
import { FaGrinWink } from 'react-icons/fa';
const winkLogo = '../images/wink.logo.png'

const ChatPopup = () => {
    const [show, setShow] = useState(false);
  return (<div>
    <div className={show ? "popup show" : "popup"}>
        <Messaging show={show} />
        
        </div>
        <button className='btn' onClick={() => setShow(prevCheck => !prevCheck)} src={winkLogo}> </button>
        </div>
  )
}

export default ChatPopup