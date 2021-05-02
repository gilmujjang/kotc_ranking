import React, { useEffect, useState } from 'react';
import { dbService } from '../../fbase';
import { Icon } from 'semantic-ui-react'
import classNames from 'classnames';
import styles from '../css/MemberDetail.module.css'
import MemberDetailChart from './MemberDetailChart';
import MemberDetailGame from './MemberDetailGame';
import MemberDetailWinningRate from './MemberDetailWinningRate';
import MemberDetailRankingRate from './MemberDetailRankingRate';

const MemberDetail = ({ allUsersByTime, setIsDetailOn, userDetailTarget }) => {
    const [chartMode, setChartMode] = useState('rating')
    const [period, setPeriod] = useState('30')
    const [userMatch, setUserMatch] = useState([])
    // const userName = userDetailTarget.name

    userMatch.sort(function(a, b) {
        return b.date - a.date
    })
    
    // 해당유저의 경기기록만 가져오기
    // const userMatch = allGame.filter(el => 
    //     el.winners.includes(userName) || el.losers.includes(userName)).sort(function(a, b) {
    //         return b.date - a.date
    //     }
    // )

    const info = (
        <>
            <div className={styles.detail__profile}>
                <img src={userDetailTarget.attachmentUrl} alt="member detail profile" />
            </div>
            <div>
                <span className={styles.detail__name}>{userDetailTarget.name}</span>
                <span className={styles.detail__department}>{userDetailTarget.department}과</span>
                <span className={styles.detail__status}>{userDetailTarget.studentid}학번 / {userDetailTarget.status}</span>
            </div>
        </>
    )

    function closeDetail() {
        setIsDetailOn(false)
    }

    function periodHandler(e) {
        setPeriod(e.target.dataset.period)
    }

    function chartModeHandler(e) {
        setChartMode(e.target.dataset.mode)
    }

    const periodFilter = (
        <>
        <div className={classNames({["button"]: true, [styles.button__memberDetail]: true})} onClick={periodHandler} data-period="10">10일</div>
        <div className={classNames({["button"]: true, [styles.button__memberDetail]: true})} onClick={periodHandler} data-period="30">30일</div>
        <div className={classNames({["button"]: true, [styles.button__memberDetail]: true})} onClick={periodHandler} data-period="60">60일</div>
        </>
    )

    const chartFilter = (
        <div className="dropdown dropdown__userDetail">
          <div className="dropdown__selected">
            <span className="selected">{chartMode === 'rating' ? '점수' : '순위'}</span>
            <Icon fitted name="caret down" />
          </div>
          <ul className="dropdown__list">
            <li className="dropdown__list__item" onClick={chartModeHandler} data-mode="rating">점수</li>
            <li className="dropdown__list__item" onClick={chartModeHandler} data-mode="ranking">순위</li>
          </ul>
        </div>
    )

    useEffect(() => {
        dbService.collection('user').doc(userDetailTarget.name).collection('game_record').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const userMatchObj = {
                    date: doc.data().date,
                    loserRatingAfter: doc.data().loserRatingAfter,
                    losers: doc.data().losers,
                    ratingChange: doc.data().ratingChange,
                    winnerRatingAfter: doc.data().winnerRatingAfter,
                    winners: doc.data().winners
                }
                setUserMatch(userMatch => [...userMatch, userMatchObj])
            })
        })
    }, [userDetailTarget])

    return (
        <div className={styles.detailContainer}>
            <div className={styles.top}>
                <div className={styles.top__left}>
                    {info}
                </div>
                <div className={classNames({[styles.top__circleRate]: true, [styles.winningRate]: true})}>
                    <MemberDetailWinningRate userDetailTarget={userDetailTarget} />    
                </div>
                <div className={classNames({[styles.top__circleRate]: true, [styles.rankingRate]: true})}>
                    <MemberDetailRankingRate allUsersByTime={allUsersByTime} userDetailTarget={userDetailTarget} />
                </div>
            </div>
            <div className={styles.bot}>
                <div className={styles.bot__left}>
                    {periodFilter}
                    {chartFilter}
                    <MemberDetailChart chartMode={chartMode} period={period} allUsersByTime={allUsersByTime} userDetailTarget={userDetailTarget} userMatch={userMatch} />
                </div>
                <div className={styles.bot__right}>
                    <MemberDetailGame userMatch={userMatch} />
                </div>
            </div>
            <Icon fitted size="big" name="close" className={styles.close} onClick={closeDetail} />
        </div>
    );
}

export default MemberDetail;