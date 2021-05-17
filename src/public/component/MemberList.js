import { useEffect, useState } from 'react';
import MemberDetail from './MemberDetail';
import styles from '../css/MemberList.module.css'

const MemberList = ({ allUsers }) => {
  const allUsersByTime = [...allUsers];
  allUsersByTime.sort(function(a, b){
    if(a.time < b.time) return 1
    else if(a.time > b.time) return -1
    else return 0
  })
  const [mapList, setMapList] = useState([])
  const [isDetailOn, setIsDetailOn] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [userDetailTarget, setUserDetailTarget] = useState({}) // 상세 정보 보여 줄 타겟 정보

  function showDetail(e) {
    setUserDetailTarget(allUsersByTime.find(el => el.name === e.target.dataset.name))
    setIsDetailOn(true)
  }

  const userInfo = mapList.map((user,index) => (
    <div className={styles.memberInfo} key={index}>
      <div>
        <img className={styles.userImage} src={user.attachmentUrl} onClick={showDetail} data-name={user.name} alt="member list profile"/>
      </div>
      <div className={styles.right}>
        <div className={styles.up}>
          <div>
            <span className={styles.memberName}>{user.name}</span>
            <span className={styles.memberStatus}>{user.status}</span>
          </div>
          <div className={styles.memberRecord}>
            <div>{user.game_win}승</div>
            <div>{user.game_lose}패</div>
          </div>
        </div>
        <div className={styles.bot}>
          <span className={styles.memberRating}>레이팅: {user.rating}</span>
          <span className={styles.memberDepartment}>{user.department}</span>
        </div>
      </div>
    </div>
  ))

  function traceInput(e) {
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
      <input type="text" className="filter__memberList" placeholder="text name..." onChange={traceInput} />
      <div className={styles.allMembers}>
        <div className={styles.memberList}>
          {userInfo}
        </div>
        {isDetailOn && <MemberDetail setIsDetailOn={setIsDetailOn} allUsersByTime={allUsersByTime} userDetailTarget={userDetailTarget} />}
      </div>
    </>
  )
};

export default MemberList