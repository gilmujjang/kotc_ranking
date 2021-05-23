import { useEffect, useState } from 'react';
import MemberDetail from './MemberDetail';
import styles from '../css/MemberList.module.css'

const MemberList = ({ groupMembers }) => {
  const groupMemberList = groupMembers.concat().sort(function(a, b) {a.name - b.name})
  const [mapList, setMapList] = useState([])
  const [isDetailOn, setIsDetailOn] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [memberDetailTarget, setMemberDetailTarget] = useState({}) // 상세 정보 보여 줄 타겟 정보

  function showDetail(e) {
    setMemberDetailTarget(groupMemberList.find(el => el.name === e.target.dataset.name))
    setIsDetailOn(true)
  }

  const memberInfoCard = mapList.map((member,index) => (
    <div className={styles.memberInfo} key={index}>
      <div>
        <img className={styles.userImage} src={member.photoURL} onClick={showDetail} data-name={member.name} alt="member list profile"/>
      </div>
      <div className={styles.right}>
        <div className={styles.up}>
          <div>
            <span className={styles.memberName}>{member.name}</span>
            <span className={styles.memberStatus}>{member.status}</span>
          </div>
          <div className={styles.memberRecord}>
            <div>{member.game_win}승</div>
            <div>{member.game_lose}패</div>
          </div>
        </div>
        <div className={styles.bot}>
          <span className={styles.memberRating}>레이팅: {member.rating}</span>
          <span className={styles.memberDepartment}>{member.department}</span>
        </div>
      </div>
    </div>
  ))

  function traceInput(e) {
    setFilterName(e.target.value)
  }

  useEffect(() => {
    if(filterName) {
      setMapList(groupMemberList.filter(el => el.name.includes(filterName)))
    } else {
      setMapList(groupMemberList)
    }
  }, [filterName])

  return (
    <>
      <input type="text" className="filter__memberList" placeholder="text name..." onChange={traceInput} />
      <div className={styles.allMembers}>
        <div className={styles.memberList}>
          {memberInfoCard}
        </div>
        {isDetailOn && <MemberDetail setIsDetailOn={setIsDetailOn} allUsersByTime={allUsersByTime} memberDetailTarget={memberDetailTarget} />}
      </div>
    </>
  )
};

export default MemberList