import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../authentication/StoreProvider";
import { LoginContext } from "../authentication/LoginProvider";

import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import { Box } from "@mui/system";

const FindCoworkers = (props) => {
  const authContext = useContext(LoginContext);
  const storeContext = useContext(StoreContext);
  const user = storeContext.store;
  const [coworkers, setCoworkers] = useState([]);
  const [open, setOpen] = useState(false);

  const handleCollapse = () => {
    setOpen(!open);
  };

  console.log("user", user);
  useEffect(() => {
    const getCoworkers = async (theUser) => {
      try {
        let userToSend = JSON.stringify(theUser);
        console.log("sending userId: " + typeof userToSend);
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
      } catch (err) {
        console.log("failed to get coworkers", err);
        setCoworkers([]);
      }
    };
    if (user) {
      getCoworkers(user);
    }
  }, [user]);

  return (
    <Box sx={{ m: 5 }}>
      <List>
        <ListItem divider>
          <ListItemButton onClick={handleCollapse}>
            <ListItemText primary={"Contacts"} />
          </ListItemButton>
        </ListItem>
      </List>

      <Collapse in={open}>
        <List sx={{ width: 300, display: "flex", flexDirection: "column" }}>
          {coworkers ? (
            coworkers.map((profile, index) => {
              return (
                <ListItem
                  divider
                  sx={{ width: 300, display: "flex", flexDirection: "column" }}
                >
                  <ListItemButton key={index}>
                    <ListItemText
                      primary={`${profile.user.firstname}  ${profile.user.lastname}`}
                      secondary={profile.userprofile.name}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <ListItemText primary="No coworkers found" />
            </ListItem>
          )}
        </List>
      </Collapse>
    </Box>
  );
};

export default FindCoworkers;

{
  /* <div>
      <h1>Find coworkers</h1>
     
      <div>
        {coworkers ? (
          coworkers.map((profile, index) => {
            return (
              <div key={index} className="user">
                <div>{profile.user.firstname} {profile.user.lastname}, {profile.userprofile.name} </div>
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div> */
}
