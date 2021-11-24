import React, { useEffect, useRef, useState } from 'react';
import { dbService } from '../../fbase';
import { Button, Icon, Modal } from 'semantic-ui-react';
import classNames from 'classnames';
import styles from '../css/MemberDetailModal.module.css'
import MemberDetailChart from './MemberDetailChart';
import PlayerDetailGame from './MemberDetailGame';
import MemberDetailWinningRate from './MemberDetailWinningRate';
import MemberDetailRankingRate from './MemberDetailRankingRate';

const MemberDetailModal = ({ isModalOpen, setIsModalOpen, groupName, playerDetailTarget, setPlayerDetailTarget, groupPlayers }) => {
  const [playersGame, setPlayersGame] = useState([])
  const [chartMode, setChartMode] = useState('rating')
  const [period, setPeriod] = useState(30)
  const modalRef = useRef()
  
  function periodFilterHandler(e) {
    setPeriod(e.target.dataset.period)
  }

  function chartFilterHandler(e) {
    setChartMode(e.target.dataset.mode)
  }

  function modalCloseAndInitialize() {
    setPlayerDetailTarget({})
    setIsModalOpen(false)
  }

  const info = (
    <>
      <div className={styles.detail__profile}>
      {
        playerDetailTarget.photoURL ? 
        <img src={playerDetailTarget.photoURL} alt="player profile" /> :
        <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />       
        }
      </div>
      <div>
        <span className={styles.detail__name}>{playerDetailTarget.name}</span>
        <span className={styles.detail__status}>{playerDetailTarget.status}</span>
      </div>
    </>
  )

  const periodFilter = (
    <>
      <div className={classNames({["button"]: true, [styles.button__memberDetail]: true})} onClick={periodFilterHandler} data-period="30">30일</div>
      <div className={classNames({["button"]: true, [styles.button__memberDetail]: true})} onClick={periodFilterHandler} data-period="60">60일</div>
      <div className={classNames({["button"]: true, [styles.button__memberDetail]: true})} onClick={periodFilterHandler} data-period="90">90일</div>
    </>
  )

  const chartFilter = (
    <div className="dropdown dropdown__userDetail">
      <div className="dropdown__selected">
        <span className="selected">{chartMode === 'rating' ? '점수' : '순위'}</span>
        <Icon fitted name="caret down" />
      </div>
      <ul className="dropdown__list">
        <li className="dropdown__list__item" onClick={chartFilterHandler} data-mode="rating">점수</li>
        <li className="dropdown__list__item" onClick={chartFilterHandler} data-mode="ranking">순위</li>
      </ul>
    </div>
  )

  async function getPlayersGame() {
    const querySnapshot = await dbService.collection(groupName).doc('group_data').collection('players').doc(playerDetailTarget.name).collection('game_record').orderBy("date", "desc").get()
    
    if(querySnapshot.docs.length === 0) {
      setPlayersGame([])
    } else {
      querySnapshot.forEach((doc) => {
        const singlePlayersGameObj = {
          date: doc.data().date,
          loserRatingAfter: doc.data().loserRatingAfter,
          losers: doc.data().losers,
          ratingChange: doc.data().ratingChange,
          winnerRatingAfter: doc.data().winnerRatingAfter,
          winners: doc.data().winners
        }
        setPlayersGame(playersGame => [...playersGame, singlePlayersGameObj])
      })
    }
  }
  
  useEffect(() => {
    getPlayersGame()    
  }, [playerDetailTarget])

  return (
    <Modal onClose={() => setIsModalOpen(false)} open={isModalOpen} size='large'>
      <Modal.Header>상세 정보</Modal.Header>
      <Modal.Content>
        <Modal.Description ref={modalRef}>
          <div className={styles.modal__player_detail}>
            <div className={styles.top}>
              <div className={styles.top__left}>
                {info}
              </div>
              <div className={classNames({[styles.top__circleRate]: true, [styles.winning_rate]: true})}>
                <MemberDetailWinningRate playerDetailTarget={playerDetailTarget} />
              </div>
              <div className={classNames({[styles.top__circleRate]: true, [styles.ranking_rate]: true})}>
                <MemberDetailRankingRate playerDetailTarget={playerDetailTarget} groupPlayers={groupPlayers} />
              </div>
            </div>
            <div className={styles.mid}>
              {periodFilter}
              {chartFilter}
            </div>
            <div className={styles.bot}>
              <div className={styles.bot__left}>
                <MemberDetailChart chartMode={chartMode} period={period} playerDetailTarget={playerDetailTarget} playersGame={playersGame} />
              </div>
              <div className={styles.bot__right}>
                <PlayerDetailGame playersGame={playersGame} />
              </div>
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="확인"
          labelPosition='right'
          icon='checkmark'
          onClick={modalCloseAndInitialize}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default MemberDetailModal