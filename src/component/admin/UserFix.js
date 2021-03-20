import { React, useEffect, useState } from 'react';
import '../../css/admin.css';
import { Toast, ToastHeader } from 'reactstrap';
import { dbService, storageService } from '../../fbase';

const UserFix = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    dbService.collection("user").onSnapshot(snapshot => {
      const userArray = [];
      snapshot.docs.map(doc => (
        userArray.push(doc.data().name),
        userArray.push(doc.data().rating),
        userArray.push(doc.data().studentid),
        userArray.push(doc.data().department),
        userArray.push(doc.data().time)
      ))
      setAllUsers(userArray);
    })
  }, [])

  return (
    <div className="Box">
    </div>
  );
};

export default UserFix;
