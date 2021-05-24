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

  const memberRankingCard = membersToShow.map((member,index) => (
    <div className={styles.ranking_card} key={index}>
      <div className={styles.left}>
        <div className={styles.left__top}>
          <div className={styles.profile_img}>
            {
            member.photoURL ?
            <img src={member.photoURL} alt="member profile"/> :
            <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="profile-img"/>
            }
          </div>
          <div className={styles.names}>
            <span className={styles.displayName}>{member.displayName}</span>
            <span className={styles.name}>{member.name}</span>
          </div>
        </div>
        <div className={styles.left__bot}>
          <span className={styles.rating}>
            <span>{member.rating}</span>  
            <span>Rating</span>
          </span>
          <span className={styles.win}>
            <span>{member.game_win}</span>
            <span>승</span>
          </span>
          <span className={styles.lose}>
            <span>{member.game_lose}</span>
            <span>패</span>
          </span>
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.ranking}>{index + 1}</span>
        <span>Ranking</span>
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
        {memberRankingCard}
      </div>
    </>
  )
};

export default RankingContent;