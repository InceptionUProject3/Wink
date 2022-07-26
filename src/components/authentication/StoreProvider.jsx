import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { LoginContext } from "./LoginProvider";

const StoreContext = React.createContext(null);

const StoreProvider = ({ children }) => {
  const loggedInUser = useContext(LoginContext).user;

  const [store, setStore] = React.useState(() => {
    const localData = localStorage.getItem("store");
    return localData ? JSON.parse(localData) : null;
  });
  const [positions, setPositions] = useState(() => {
    const localData = localStorage.getItem("positions");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    // console.log('d',loggedInUser)
    loggedInUser?.id ===store?.User_idUser&&
    localStorage.setItem("store", JSON.stringify(store));
  }, [store,loggedInUser]);

  useEffect(() => {
    localStorage.setItem("positions", JSON.stringify(positions));
  }, [positions]);
//   useEffect(() => {console.log('isUser',loggedInUser?.id, store?.User_idUser)
//   loggedInUser?.id !==store?.User_idUser && localStorage.setItem('store','null')
// }
//   , [loggedInUser]);
  const theValues = { store, setStore, positions, setPositions };
  return (
    <StoreContext.Provider value={theValues}>{children}</StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
