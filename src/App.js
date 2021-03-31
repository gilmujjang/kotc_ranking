import './style.css';
import React, { useState, useEffect } from "react";
import AppRouter from "./component/Router";
import { authService } from "./fbase";


function App() {
  const user = authService.currentUser;
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState({displayName: null});
  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        authService.signInAnonymously()
        .catch((error) => {
          console.log(error.code)
          console.log(error.message)
        })
      }
      setInit(true);
    });
  }, [])


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
    </>
  );
};

export default App;
