import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from '../router/Auth';
import AdminMain from '../router/AdminMain';
import ClientMain from '../router/ClientMain';


const AppRouter = ({ isLoggedIn, userObj }) => {
  return(
    <Router>
      {isLoggedIn}
      <Switch>
        {isLoggedIn ? (
        <>
          <Route exact path = "/">
            <ClientMain/>
          </Route>
          <Route path="/admin">
            <AdminMain userObj={userObj} />
          </Route>
        </>
         ) : (
          <>
            <Route exact path = "/">
              <ClientMain/>
            </Route>
            <Route exact path = "/admin">
              <Auth/>
            </Route>
          </>
         )}
      </Switch>
    </Router>
  )
}

export default AppRouter;