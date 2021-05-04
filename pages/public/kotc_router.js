import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from '../../pages/public/Auth';
import AdminMain from '../../pages/public/admin_main';
import ClientMain from '../../pages/public/team_main';
import {React, useEffect, useState } from 'react';
import { dbService } from '../../src/fbase'

const AppRouter = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allGame, setAllGame] = useState([]);
  const [userObj, setUserObj] = useState({displayName: null});
  
  useEffect( () => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoUrl: user.photoURL,
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
    dbService.collection("game").orderBy("write_time","desc").limit(10).get().then(snapshot => {
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
      <Route exact path = "/team_main">
        <ClientMain allUsers={allUsers} allGame={allGame} userObj={userObj}/>
      </Route>
      <Switch>
        {userObj.displayName ? (
        <Route path="/team_main/admin">
          <AdminMain userObj={userObj}  allUsers={allUsers} allGame={allGame}/>
        </Route>
         ) : (
          <Route exact path = "/team_main/admin">
            <Auth/>
          </Route>
         )}
      </Switch>
    </Router>
  )
}

export default AppRouter;