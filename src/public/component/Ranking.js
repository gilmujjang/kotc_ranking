import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react'
import classNames from 'classnames'
import styles from '../css/Ranking.module.css'

const RankingContent = ({ groupPlayers }) => {
  const [playersToShow, setPlayersToShow] = useState([]);
  const [currentType, setCurrentType] = useState('전체');
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    switch(currentType) {
      case '전체':
        if(filterName) {
          setPlayersToShow(groupPlayers.filter(el => el.name.includes(filterName)))
        } else {
          setPlayersToShow(groupPlayers)
        }
        break;
      default:
        setPlayersToShow(groupPlayers)
        break;
    }
  }, [groupPlayers, currentType, filterName])

  const noRankings = (
    <div className={styles.no_rankings}>생성된 플레이어가 한 명도 없습니다.</div>
  )

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

  function traceInput(e) {
    setFilterName(e.target.value)
  }

  function filterMembersToShow(e) {
    setCurrentType(e.target.dataset.type)
  }

  const rankingFilter = (
    <div className={styles.ranking_filter_container}>
      <div className="dropdown dropdown__rankingContainer">
        <div className="dropdown__selected">
          <span className="selected">{currentType}</span>
          <Icon size="large" name="caret down"/>
        </div>
        <ul className="dropdown__list">
          <li className="dropdown__list__item" data-type="전체" onClick={filterMembersToShow}>전체</li>
        </ul>
      </div>
      <input type="text" className="filter__rankingContainer" placeholder="text me..." onChange={traceInput} />
    </div>
  )

  return (
    <>
      {rankingFilter}
      {
        playersToShow.length === 0 ?
        noRankings :
        <div className={styles.rankingContainer}>
          {playerRankingCard}
        </div>
      }
    </>
  )
};

export default RankingContent;