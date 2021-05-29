import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react'
import classNames from 'classnames'
import styles from '../css/Ranking.module.css'

const RankingContent = ({ groupPlayers }) => {
  const [playersToShow, setPlayersToShow] = useState([]);
  const [currentType, setCurrentType] = useState('전체');
  const [wantedPlayer, setWantedPlayer] = useState('');

  useEffect(() => {
    switch(currentType) {
      case '전체':
        if(wantedPlayer) {
          setPlayersToShow(groupPlayers.filter(el => el.name === parseInt(wantedPlayer) || el.displayName === parseInt(wantedPlayer)))
        } else{
          setPlayersToShow(groupPlayers)
        }
        setPlayersToShow(groupPlayers)
        break;
      default:
        setPlayersToShow(allUsersList)
        break;
    }
  }, [groupPlayers, currentType, wantedPlayer])

  const playerRankingCard = playersToShow.map((player,index) => (
    <div className={styles.ranking_card} key={index}>
      <div className={styles.left}>
        <div className={styles.left__top}>
          <div className={styles.profile_img}>
            {
            player.photoURL ?
            <img src={player.photoURL} alt="player profile" /> :
            <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="profile-img" />
            }
          </div>
          <div className={styles.names}>
            <span className={styles.name}>{player.name}</span>
          </div>
        </div>
        <div className={styles.left__bot}>
          <span className={styles.rating}>
            <span>{player.rating}</span>  
            <span>Rating</span>
          </span>
          <span className={styles.win}>
            <span>{player.game_win}</span>
            <span>승</span>
          </span>
          <span className={styles.lose}>
            <span>{player.game_lose}</span>
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

  function filterWantedPlayer(e) {
    setWantedPlayer(e.target.value)
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
      <input type="text" className="filter__rankingContainer" placeholder="text me..." onChange={filterWantedPlayer} />
    </>
  )

  return (
    <>
      {rankingContentFilter}
      <div className={styles.rankingContainer}>
        {playerRankingCard}
      </div>
    </>
  )
};

export default RankingContent;