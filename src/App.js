import './style.css';
import React, { useState, useEffect } from "react";
import AppRouter from "./component/Router";
import { authService } from "./fbase";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])

  const user = authService.currentUser;
  const refreshUser = () => {
    setUserObj(authService.currentUser);
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  return (
    <>
      {init ? (
        <AppRouter 
          refreshUser = {refreshUser}
          isLoggedIn={Boolean(userObj)} 
          userObj={userObj}
        />
        ):(
          "Initailizing...")}
      <fotter>&copy; Nwitter { new Date().getFullYear() }</fotter>
    </>
  );
}

export default App;
