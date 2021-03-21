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

  return (
    <div className="AdminMain">
      <Header />
      <div className="Content">
        <CreateUser/>
        <RegiMatch allUsers={allUsers}/>
        <UserList allUsers={allUsers}/>
        <MatchList/>
      </div>
    </div>
  );
};

export default AdminMain;
