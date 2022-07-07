import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { LoginContext } from './LoginProvider'
import { StoreContext } from './StoreProvider';

const PrivateRoute = (props) => {
    const auth = useContext(LoginContext);
  const store = useContext(StoreContext);
    const loggedInUser = auth.user;
    const loggedInStore = store.store;
    const isAdmin =
      loggedInStore?.UserProfile_idUserProfile === 1000 ||
      loggedInStore?.UserProfile_idUserProfile === 1002;
    const{ mustBeAdmin,element }= props
    
    if((isAdmin&&mustBeAdmin)||(loggedInUser&&!mustBeAdmin)){
        return element
    }else{
        return <Navigate to="/"/>
    }
}

export default PrivateRoute