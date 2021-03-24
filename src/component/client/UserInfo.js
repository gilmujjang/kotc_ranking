import React from 'react';

const UserInfo = ({allUsers, allGame, contentMode}) => {
  
  const allUsersByTime = allUsers;
  allUsersByTime.sort(function(a,b){
    return a.time > b.time ? -1 : a.time < b.time ? 1: 0;
  })

    const userInfo = allUsersByTime.map((user,index) => (
        <div className="userInfo" key={index}>
            <div className="userProfile">{user.attachmentUrl
              ? <img className="userImage" src={user.attachmentUrl}/>
              : <img className="userImage" src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg"/>
              }
            </div>
            <div className="userInfoRightSide">
              <div className="userInfoUpSide">
                <div>
                  <span className="studentName">{user.name}</span>
                  <span> . . . </span>
                  <span className="userStatus">{user.status}</span>
                </div>
                
                <div className="win_lose">
                  <div className="department">{user.game_win}승</div>
                  <div className="department">{user.game_lose}패</div>
                </div>
              </div>
              <div className="userInfoBottomSide">
                <span className="rating">레이팅: {user.rating}</span>
                <span className="studentId">{user.studentId}</span>
                <span className="department">{user.department}</span>
                {/* <span className="department">승률: {Math.round(((user.game_win)/(user.game_all))*100)}%</span> */}
              </div>
            </div>
          </div>
    ))
    return (
        <div className="usersInformation">
           {userInfo}
        </div>
    )
};

export default UserInfo;