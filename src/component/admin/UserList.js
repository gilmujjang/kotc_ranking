import { React, useEffect, useState } from 'react';
import '../../css/admin.css';
import { Toast, ToastHeader } from 'reactstrap';
import { dbService, storageService } from '../../fbase';

const UserList = ({allUsers}) => {

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
        <div>전적 : {user.game_win}승 {user.game_lose}패</div>
      </div>
    </Toast>
  ))

  return (
    <div className="LongBox">
      {RecentUser}
    </div>
  );
};

export default UserList;
