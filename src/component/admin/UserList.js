import { React, useEffect, useState } from 'react';
import '../../css/admin.css';
import { Toast, ToastHeader } from 'reactstrap';
import { dbService, storageService } from '../../fbase';

const UserList = () => {
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

  const RecentUser = allUsers.map(user => (
    <Toast>
      <ToastHeader>
        <div className="spaceBetween">
          <div>{user.name}__</div>
          <div>{user.status}</div>
        </div>
      </ToastHeader>
      <div className="needMargin spaceBetween">
        <div>학번 : {user.studentid}</div>
        <div>학과 : {user.department}</div>
      </div>
      <div className="needMargin spaceBetween">
        <div>Rating : {user.rating}</div>
        <div>{user.time}</div>
      </div>
    </Toast>
  ))

  return (
    <div className="Box">
      {RecentUser}
    </div>
  );
};

export default UserList;
