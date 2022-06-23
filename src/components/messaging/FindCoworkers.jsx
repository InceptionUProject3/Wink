import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from "../authentication/StoreProvider";
import { LoginContext } from "../authentication/LoginProvider";



const FindCoworkers = (props) => {

    const authContext = useContext(LoginContext);
    const storeContext = useContext(StoreContext);
    const user = storeContext.store;
    const [ coworkers, setCoworkers ] = useState([]);

console.log("user", user);
    useEffect(() => {
        const getCoworkers = async (theUser) => {
          let userToSend = JSON.stringify(theUser);
          console.log("sending userId: " + typeof(userToSend));
          const response = await fetch("/api/coworkers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: userToSend,
          });
          const data = await response.text();
          console.log("getting store data", data);
          const userData = JSON.parse(data);
          console.log(response);
          setCoworkers(userData);
          console.log("we have the user data", userData);
        };
        if (user) {
          getCoworkers(user);
        }
      }, [user]);

  return (<div>
    <h1>Find coworkers</h1>
    <div> {JSON.stringify(coworkers)}</div>
    </div>
    )
     
       }

export default FindCoworkers
