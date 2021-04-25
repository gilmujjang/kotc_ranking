import React, { useEffect, useRef } from 'react'

const UserDetailPercentage = ({ allUsersByTime, userKey }) => {
    const canvasRef = useRef()

    // 각도 => 라디안 변환
    function degToRad(degree) {
        return degree * (Math.PI / 180)
    }

    // 기본 원 그리기
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

    // 승률 계산
    function winningRate() {
        return allUsersByTime[userKey].game_win / allUsersByTime[userKey].game_all
    }

    // 패 비율 계산
    function losingRate() {
        const value = allUsersByTime[userKey].game_win / allUsersByTime[userKey].game_all
        if(value === 1) {return 0}
        else if(value === 0) {return 1}
        else {return value}
    }

    // 승 부분 그리기
    function drawWin(ctx) {
        ctx.beginPath()
        ctx.lineWidth = 6
        ctx.strokeStyle = '#2EC4B6'
        ctx.arc(140, 90, 76, degToRad(1), degToRad(360 * winningRate() - 0.5))
        ctx.stroke()
    }

    // 패 부분 그리기
    function drawLose(ctx) {
        ctx.beginPath()
        ctx.lineWidth = 6
        ctx.strokeStyle = '#e74c3c'
        ctx.arc(140, 90, 76, degToRad(359), degToRad(360 * losingRate() + 0.5), true)
        ctx.stroke()
    }

    // 레이팅 정렬 하기
    function sortRanking(arr) {
        return arr.concat().sort(function(a, b) {return b.rating - a.rating})
    }

    // 레이팅으로 user 랭킹 상위퍼센티지 구하기
    function rankingRate() {
        const sortedArr = sortRanking(allUsersByTime)

        const target = sortedArr.filter(el => el.name === allUsersByTime[userKey].name)
        const ranking = sortedArr.indexOf(target[0]) + 1
        
        // 본인 순위 / 전체 인원
        return ( ranking / allUsersByTime.length )
    }

    // 상위 퍼센티지만큼 원 그리기 => 360 * 상위 퍼센티지 만큼
    function drawRanking(ctx) {
        ctx.beginPath()
        ctx.lineWidth = 6
        ctx.strokeStyle = '#e74c3c'
        ctx.arc(360, 90, 76, degToRad(359), degToRad(360.5 - 360 * rankingRate()), true)
        ctx.stroke()
    }

    // 나머지 공간 그리기
    function drawRankingBase(ctx) {
        ctx.beginPath()
        ctx.lineWidth = 6
        ctx.strokeStyle = '#2EC4B6'
        ctx.arc(360, 90, 76, degToRad(1), degToRad(359.5 - 360 * rankingRate()))
        ctx.stroke()
    }


    // 글자 보류
    // 글자 보류
    // 글자 보류
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        drawCircle(ctx)
        drawWin(ctx)
        drawLose(ctx)

        drawRanking(ctx)
        drawRankingBase(ctx)
    }, [])

    return <canvas width="500" height="180" ref={canvasRef} className="canvas"></canvas>
}

export default UserDetailPercentage