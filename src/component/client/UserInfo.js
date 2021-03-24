import React from 'react';

const UserInfo = ({allUsers, allGame, contentMode}) => {

    const allUsersByTime = allUsers.sort(function(a,b){
        return a.time > b.time ? -1 : a.time < b.time ? 1: 0;
    })

    const userInfo = allUsersByTime.map((user,index) => (
        <div className="userInfo" key={index}>
            <div>{user.attachmentUrl
              ? <img className="userImage" src={user.attachmentUrl}/>
              : <img className="userImage" src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg"/>
              }</div>
            <div className="item--right">
              <span className="studentName">{user.name}</span>
              <span className="rating">레이팅: {user.rating}</span>
              <span className="studentId">{user.studentId}</span>
              <span className="department">{user.department}</span>
            	<span className="department">전체: {user.game_all}</span>
              <span className="department">승: {user.game_win}</span>
              <span className="department">패: {user.game_lose}</span>
              <span className="department">승률: {Math.round(((user.game_win)/(user.game_all))*100)}%</span>
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