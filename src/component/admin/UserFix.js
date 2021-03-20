import { React, useEffect, useState } from 'react';
import '../../css/admin.css';
import { Toast, ToastHeader } from 'reactstrap';
import { dbService, storageService } from '../../fbase';

const UserFix = ({allUsers}) => {

  const changeStatus = async(e) => {
    await dbService.collection("user").doc(e.target.id).update({status: "졸업"})
    alert(e.target.id+" 를 졸업으로 변경했습니다")
  }

  const RecentUser = allUsers.map(user => (
    <div className="displayFlex">
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
      <i class="fas fa-wrench deleteIcon" id={user.name} onClick={changeStatus}></i>
    </div>
  ))

  return (
    <div className="Box">
      {RecentUser}
    </div>
  );
};

export default UserFix;
