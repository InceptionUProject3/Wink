import React from 'react';

const StoreContext = React.createContext(null);



const StoreProvider = ({children }) => {
    const [store, setStore] = React.useState(null);
    const theValues = {store, setStore};
    return <StoreContext.Provider value={theValues}>{children}</StoreContext.Provider>;
}

export { StoreProvider, StoreContext };