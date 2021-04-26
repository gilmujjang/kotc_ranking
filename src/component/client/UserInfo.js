import React, { useEffect, useState } from 'react';
import UserDetail from './UserDetail';

const UserInfo = ({ allUsers }) => {
  const allUsersByTime = [...allUsers];
  allUsersByTime.sort(function(a,b){
    return a.time > b.time ? -1 : a.time < b.time ? 1: 0;
  })
  const [mapList, setMapList] = useState([])
  const [isDetailOn, setIsDetailOn] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [userKey, setUserKey] = useState(0)

  function showDetail(e) {
    setIsDetailOn(true)
    setUserKey(e.target.dataset.num)
  }

  const userInfo = mapList.map((user,index) => (
    <div className="userInfo" key={index}>
      <div>
        <img className="userImage" src={user.attachmentUrl} onClick={showDetail} data-num={index} alt="profile--detail"/>
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
          <span className="rating">레이팅: {user.rating}</span>
          <span className="department">{user.department}</span>
          {/* <span className="department">승률: {Math.round(((user.game_win)/(user.game_all))*100)}%</span> */}
        </div>
      </div>
    </div>
  ))

  function onChangeAction(e) {
    setFilterName(e.target.value)
  }

  useEffect(() => {
    if(filterName) {
      setMapList(allUsersByTime.filter(el => el.name === filterName))
    } else {
      setMapList(allUsersByTime.sort(function(a,b){
        return a.time > b.time ? -1 : a.time < b.time ? 1: 0;
      }))
    }
  }, [filterName])

  return (
    <>
      <input type="text" className="filter--info" placeholder="text name..." onChange={onChangeAction} />
      <div className="usersInformation">
        <div className="userList">
          {userInfo}
        </div>
        {isDetailOn && <UserDetail setIsDetailOn={setIsDetailOn} allUsersByTime={allUsersByTime} userKey={userKey} />}
      </div>
    </>
  )
};

export default UserInfo;