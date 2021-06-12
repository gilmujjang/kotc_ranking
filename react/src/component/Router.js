import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from '../router/Auth';
import AdminMain from '../router/AdminMain';
import ClientMain from '../router/ClientMain';
import {React, useEffect, useState } from 'react';
import { dbService } from '../fbase'



const AppRouter = ({ userObj }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [allGame, setAllGame] = useState([]);
  useEffect(() => {
    dbService.collection("user").orderBy("rating","desc").get().then(snapshot => {
      snapshot.docs.map(doc => {
        const userObject = {
          name:doc.data().name,
          rating:doc.data().rating,
          start_rating: doc.data().start_rating,
          game_all:doc.data().game_all,
          game_win:doc.data().game_win,
          game_lose:doc.data().game_lose,
          studentid:doc.data().studentid,
          department:doc.data().department,
          status: doc.data().status,
          time:doc.data().time,
          attachmentUrl:doc.data().attachmentUrl
        }
        setAllUsers(allUsers => [...allUsers, userObject]);
      })
    })
  }, [])

  useEffect(() => {
    dbService.collection("games").orderBy("write_time","desc").limit(10).get().then(snapshot => {
      snapshot.docs.map(doc => {
        const gameObject = {
          winners: doc.data().winners,
          losers: doc.data().losers,
          ratingChange: doc.data().ratingChange,
          percentage: doc.data().percentage,
          date: doc.data().date,
          time: doc.data().write_time,
          id: doc.data().date+'-'+doc.data().write_time,
          winnerRatingAfter: doc.data().winnerRatingAfter,
          loserRatingAfter: doc.data().loserRatingAfter
        }
        setAllGame(allGame => [...allGame, gameObject]);
      })
    })
  }, [])
  return(
    <Router>
      <Route exact path = "/">
        <ClientMain allUsers={allUsers} allGame={allGame} userObj={userObj}/>
      </Route>
      <Switch>
        {userObj.displayName ? (
        <Route path="/admin">
          <AdminMain userObj={userObj}  allUsers={allUsers} allGame={allGame}/>
        </Route>
         ) : (
          <Route exact path = "/admin">
            <Auth/>
          </Route>
         )}
      </Switch>
    </Router>
  )
}

export default AppRouter;