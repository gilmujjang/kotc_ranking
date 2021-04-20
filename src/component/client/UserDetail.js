import React, { useEffect, useRef, useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserChart from './UserChart';

const UserDetail = ({ allUsersByTime, setIsDetailOn, userKey }) => {
    const [chartMode, setChartMode] = useState('점수')
    const [period, setPeriod] = useState('week')

    const canvasRef = useRef()
    // const mmrRanking = 
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

    function degToRad(degree) {
        return degree * (Math.PI / 180)
    }

    function winningRate() {
        return allUsersByTime[userKey].game_win / allUsersByTime[userKey].game_all
    }

    function losingRate() {
        const value = allUsersByTime[userKey].game_win / allUsersByTime[userKey].game_all
        if(value === 1) {return 0}
        else if(value === 0) {return 1}
        else {return value}
    }

    function drawCircle(ctx) {
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.strokeStyle = '#2d2d2d'
        ctx.arc(140, 90, 70, 0, Math.PI * 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(360, 90, 70, 0, Math.PI * 2)
        ctx.stroke()
    }

    function drawWin(ctx) {
        ctx.beginPath()
        ctx.lineWidth = 6
        ctx.strokeStyle = '#2EC4B6'
        ctx.arc(140, 90, 76, degToRad(1), degToRad(360 * winningRate() - 0.5))
        ctx.stroke()
    }

    function drawLose(ctx) {
        ctx.beginPath()
        ctx.lineWidth = 6
        ctx.strokeStyle = '#e74c3c'
        ctx.arc(140, 90, 76, degToRad(359), degToRad(360 * losingRate() + 0.5), true)
        ctx.stroke()
    }

    function sortRanking(arr) {
        return arr.concat().sort(function(a, b) {return b.rating - a.rating})
    }

    function rankingRate() {
        const sortedArr = sortRanking(allUsersByTime)

        const target = sortedArr.filter(el => el.name === allUsersByTime[userKey].name)
        const ranking = sortedArr.indexOf(target[0]) + 1
        
        // 본인 순위 / 전체 인원
        return ( ranking / allUsersByTime.length )
    }

    function drawRanking(ctx) {
        // 360 * 상위 퍼센티지 만큼
        ctx.beginPath()
        ctx.lineWidth = 6
        ctx.strokeStyle = '#e74c3c'
        ctx.arc(360, 90, 76, degToRad(359), degToRad(360.5 - 360 * rankingRate()), true)
        ctx.stroke()
    }

    function drawRankingBase(ctx) {
        // 나머지 공간 채우기
        ctx.beginPath()
        ctx.lineWidth = 6
        ctx.strokeStyle = '#2EC4B6'
        ctx.arc(360, 90, 76, degToRad(1), degToRad(359.5 - 360 * rankingRate()))
        ctx.stroke()
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

    // 글자는 보류

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        drawCircle(ctx)
        drawWin(ctx)
        drawLose(ctx)

        drawRanking(ctx)
        drawRankingBase(ctx)
    }, [])

    return (
        <div className="detailContainer">
            <div className="top">
                <div className="top--left">
                    {info}
                </div>
                <div className="top--right">
                    <canvas width="500" height="180" ref={canvasRef} className="canvas"></canvas>
                </div>
            </div>
            <div className="bottom">
                <div className="bottom--left">
                    {periodFilter}
                    {chartFilter}
                    <UserChart chartMode={chartMode} period={period}/>
                </div>
                <div className="bottom--right">
                    {/* 최근 경기 */}
                </div>
            </div>
            <FontAwesomeIcon icon={faTimes} className="close" onClick={closeDetail}/>
        </div>
    );
}

export default UserDetail;