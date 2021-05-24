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

  const memberListCard = mapList.map((member,index) => (
    <div className={styles.member_card} key={index}>
      <div className={styles.top}>
        <img src={member.photoURL} alt="member profile" />
      </div>
      <div className={styles.mid}>
        <span className={styles.displayName}>{member.displayName}</span>
        <span className={styles.name}>{member.name}</span>
        <span className={styles.introduce}>{member.introduce}</span>
      </div>
      <div className={styles.bot}>
        <div className="button__index">Look Detail</div>
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
          {memberListCard}
        </div>
        {isDetailOn && <MemberDetail setIsDetailOn={setIsDetailOn} allUsersByTime={allUsersByTime} memberDetailTarget={memberDetailTarget} />}
      </div>
    </>
  )
};

export default MemberList