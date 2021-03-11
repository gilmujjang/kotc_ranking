import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from '../../router/Auth';
import AdminMain from '../../router/AdminMain';

const AppRouter = ({ refreshUser,isLoggedIn, userObj }) => {
  return(
    <Router>
      {isLoggedIn}
      <Switch>
        {isLoggedIn ?(
        <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
          }}
        >
          <Route exact path = "/">
            <AdminMain userObj={userObj} />
          </Route>
        </div>
         ) : (
          <>
            <Route exact path = "/">
              <Auth/>
            </Route>
          </>
         )}
      </Switch>
    </Router>
  )
}

export default AppRouter;