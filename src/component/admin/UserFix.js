import { React, useEffect, useState } from 'react';
import '../../css/admin.css';
import { Toast, ToastHeader } from 'reactstrap';
import { dbService, storageService } from '../../fbase';

const UserFix = ({allUsers}) => {
  const RecentUser = allUsers.map(user => (
    <Toast>
      <ToastHeader>{user.name}</ToastHeader>
      <div className="needMargin flexWrap userInfo">
        <div>학번 : {user.studentid}</div>
        <div>학과 : {user.department}</div>
      </div>
      <div className="needMargin flexWrap userInfo">
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

export default UserFix;
