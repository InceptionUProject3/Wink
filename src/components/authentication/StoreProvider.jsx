import React, { useEffect, useState } from "react";

const StoreContext = React.createContext(null);

const StoreProvider = ({ children }) => {
  const [store, setStore] = React.useState(() => {
    const localData = localStorage.getItem("store");
    return localData ? JSON.parse(localData) : null;
  });
  const [positions, setPositions] = useState(() => {
    const localData = localStorage.getItem("positions");
    return localData ? JSON.parse(localData) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);

  useEffect(() => {
    localStorage.setItem("positions", JSON.stringify(positions));
  }, [positions]);

  const theValues = { store, setStore, positions, setPositions };
  return (
    <StoreContext.Provider value={theValues}>{children}</StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };
