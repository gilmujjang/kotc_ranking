import React, { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserChart from './UserChart';
import UserDetailGame from './UserDetailGame';
import UserDetailPercentage from './UserDetailPercentage';

const UserDetail = ({ allUsersByTime, setIsDetailOn, userKey, allGame }) => {
    const [chartMode, setChartMode] = useState('rating')
    const [period, setPeriod] = useState('week')
    const userName = allUsersByTime[userKey].name
    // 해당유저의 경기기록만 가져오기
    const userMatch = allGame.filter(el => 
        el.winners.includes(userName) || el.losers.includes(userName)).sort(function(a, b) {
            return b.date - a.date
        }
    )

    const info = (
        <>
            <div className="detail--profile">
                <img src={allUsersByTime[userKey].attachmentUrl} alt="detail profile" />
            </div>
            <div>
                <span className="detail__name">{allUsersByTime[userKey].name}</span>
                <span className="detail__department">{allUsersByTime[userKey].department}과</span>
                <span className="detail__status">{allUsersByTime[userKey].studentid}학번 / {allUsersByTime[userKey].status}</span>
            </div>
        </>
    )

    function closeDetail(e) {
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
        <div className="button button--userDetail" onClick={periodHandler} data-period="day">일</div>
        <div className="button button--userDetail" onClick={periodHandler} data-period="week">주</div>
        <div className="button button--userDetail" onClick={periodHandler} data-period="month">월</div>
        </>
    )

    const chartFilter = (
        <div className="dropdown dropdown--userDetail">
          <div className="dropdown--selected">
            <span className="selected">{chartMode === 'rating' ? '점수' : '순위'}</span>
            <FontAwesomeIcon icon={faCaretDown}/>
          </div>
          <ul className="dropdown--list">
            <li className="dropdown--list__item" onClick={chartModeHandler} data-mode="rating">점수</li>
            <li className="dropdown--list__item" onClick={chartModeHandler} data-mode="ranking">순위</li>
          </ul>
        </div>
    )

    return (
        <div className="detailContainer">
            <div className="top">
                <div className="top--left">
                    {info}
                </div>
                <div className="top--right">
                    <UserDetailPercentage allUsersByTime={allUsersByTime} userKey={userKey} />    
                </div>
            </div>
            <div className="bottom">
                <div className="bottom--left">
                    {periodFilter}
                    {chartFilter}
                    <UserChart chartMode={chartMode} period={period} userName={userName} userMatch={userMatch} />
                </div>
                <div className="bottom--right">
                    {/* 최근 경기 */}
                    {/* <UserDetailGame /> */}
                </div>
            </div>
            <FontAwesomeIcon icon={faTimes} className="close" onClick={closeDetail}/>
        </div>
    );
}

export default UserDetail;