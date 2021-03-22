import { React, useEffect, useState } from 'react';
import { dbService } from '../fbase';
import Header from '../component/admin/Header';
import CreateUser from '../component/admin/CreateUser'
import RegiMatch from '../component/admin/RegiMatch'
import UserList from '../component/admin/UserList'
import MatchList from '../component/admin/MatchList'
import '../css/admin.css';

const AdminMain = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allGame, setAllGame] = useState([]);

  useEffect(() => {
    dbService.collection("user").orderBy("time","desc").get().then(snapshot => {
      snapshot.docs.map(doc => {
        const userObject = {
          name:doc.data().name,
          rating:doc.data().rating,
          game_all:doc.data().game_all,
          game_win:doc.data().game_win,
          game_lose:doc.data().game_lose,
          studentid:doc.data().studentid,
          department:doc.data().department,
          status: doc.data().status,
          time:doc.data().time
        }
        setAllUsers(allUsers => [...allUsers, userObject]);
      })
    })
  }, [])

  useEffect(() => {
    dbService.collection("game").orderBy("write_time","desc").limit(10).get().then(snapshot => {
      snapshot.docs.map(doc => {
        const gameObject = {
          winners:doc.data().winners,
          losers:doc.data().losers,
          ratingChange:doc.data().ratingChange,
          percentage:doc.data().percentage,
          date:doc.data().date,
          time:doc.data().write_time,
          id:doc.data().date+'-'+doc.data().write_time
        }
        setAllGame(allGame => [...allGame, gameObject]);
      })
    })
  }, [])

  return (
    <div className="AdminMain">
      <Header />
      <div className="Content">
        <CreateUser/>
        <RegiMatch allUsers={allUsers}/>
        <UserList allUsers={allUsers}/>
        <MatchList allGame={allGame}/>
      </div>
    </div>
  );
};

export default AdminMain;
