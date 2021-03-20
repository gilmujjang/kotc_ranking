import { React, useEffect, useState } from 'react';
import { dbService, storageService } from '../fbase';
import Header from '../component/admin/Header';
import CreateUser from '../component/admin/CreateUser'
import RegiMatch from '../component/admin/RegiMatch'
import UserFix from '../component/admin/UserFix'
import MatchList from '../component/admin/MatchList'
import '../css/admin.css';

const AdminMain = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    dbService.collection("user").orderBy("time","desc").onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        const userObject = {
          name:doc.data().name,
          rating:doc.data().rating,
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
        <UserFix allUsers={allUsers}/>
        <MatchList/>
      </div>
    </div>
  );
};

export default AdminMain;
