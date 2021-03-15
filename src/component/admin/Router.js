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
            주소에 /#/admin 또는 /#/client 를 붙이세요
          </Route>
          <Route exact path = "/admin">
            <AdminMain userObj={userObj} />
          </Route>
        </div>
         ) : (
          <>
            <Route exact path = "/client">
              여기다 client 작성하셈
            </Route>
            <Route exact path = "/">
              주소에 /#/admin 또는 /#/client 를 붙이세요
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