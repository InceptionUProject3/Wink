import React from 'react'
import FindCoworkers from '../../components/messaging/FindCoworkers'
import Unread from '../../components/messaging/Unread'

const Contacts = () => {
  return (
    <div>
    <div>Contacts</div>
    <FindCoworkers/>
    <Unread/>
    </div>
  )
}

export default Contacts