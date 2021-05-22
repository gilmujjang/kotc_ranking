import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react'
import classNames from 'classnames'
import styles from '../css/Ranking.module.css'

const RankingContent = ({ groupMembers }) => {
  const [membersToShow, setMembersToShow] = useState([]);
  const [currentType, setCurrentType] = useState('전체');
  const [wantedMember, setWantedMember] = useState('');

  useEffect(() => {
    switch(currentType) {
      case '전체':
        if(wantedMember) {
          setMembersToShow(groupMembers.filter(el => el.name === parseInt(wantedMember) || el.displayName === parseInt(wantedMember)))
        } else{
          setMembersToShow(groupMembers)
        }
        setMembersToShow(groupMembers)
        break;
      default:
        setMembersToShow(allUsersList)
        break;
    }
  }, [groupMembers, currentType, wantedMember])

  const userRankingList = membersToShow.map((member,index) => (
    <div className={styles.ranking} key={index}>
      <p className={classNames({[styles.left]: true, [styles.grade]: true})}>
        {index + 1}
      </p>
      <div className={styles.middle}>
        {
        member.photoURL ?
        <img src={member.photoURL} alt="member profile"/> :
        <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="profile-img"/>
        }
      </div>
      <div className={styles.right}>
        <span className={styles.rating}>{member.rating}</span>
        <div>
          <span className={styles.studentName}>{member.name}</span>
          <span className={styles.studentId}>{member.studentid}</span>
          <span className={styles.department}>{member.department}</span>
        </div>
      </div>
    </div>
  ))


  function filterWantedMember(e) {
    setWantedMember(e.target.value)
  }

  function filterMembersToShow(e) {
    setCurrentType(e.target.dataset.type)
  }

  const rankingContentFilter = (
    <>
      <div className="dropdown dropdown__rankingContainer">
        <div className="dropdown__selected">
          <span className="selected">{currentType}</span>
          <Icon size="large" name="caret down"/>
        </div>
        <ul className="dropdown__list">
          <li className="dropdown__list__item" data-type="전체" onClick={filterMembersToShow}>전체</li>
        </ul>
      </div>
      <input type="text" className="filter__rankingContainer" placeholder="text me..." onChange={filterWantedMember} />
    </>
  )

  return (
    <>
      {rankingContentFilter}
      <div className={styles.rankingContainer}>
        {userRankingList}
      </div>
    </>
  )
};

export default RankingContent;