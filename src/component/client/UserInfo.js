import React, { useState } from 'react';
import UserDetail from './UserDetail';

const UserInfo = ({allUsers, allGame, contentMode}) => {
  
  const [isUserDetailOn, setIsUserDetailOn] = useState(false)
  const allUsersByTime = [...allUsers];
  allUsersByTime.sort(function(a,b){
    return a.time > b.time ? -1 : a.time < b.time ? 1: 0;
  })
  
  function onClickAction(e) {
    const target = e.target
    setIsUserDetailOn(true)
    console.log(isUserDetailOn);
  }

  const userInfo = allUsersByTime.map((user,index) => (
    <div className="userInfo" key={index}>
      <div className="userProfile">
        <img className="userImage" src={user.attachmentUrl} onClick={onClickAction} alt="info profile"/>
      </div>
      <div className="userInfoRightSide">
        <div className="userInfoUpSide">
          <div>
            <span className="studentName">{user.name}</span>
            <span className="userStatus">{user.status}</span>
          </div>
          <div className="win_lose">
            <div className="department">{user.game_win}승</div>
            <div className="department">{user.game_lose}패</div>
          </div>
        </div>
        <div className="userInfoBottomSide">
          <span className="rating">MMR : {user.rating}</span>
          <span className="studentId">{user.studentId}</span>
          <span className="department">{user.department}</span>
          {/* <span className="department">승률: {Math.round(((user.game_win)/(user.game_all))*100)}%</span> */}
        </div>
      </div>
    </div>
  ))
  
  return (
    <>
      <div className="usersInformation">
        {userInfo}
      </div>
      {isUserDetailOn && <UserDetail setIsUserDetailOn={setIsUserDetailOn} allUsers={allUsers}/>}
    </>
  )
};

export default UserInfo;