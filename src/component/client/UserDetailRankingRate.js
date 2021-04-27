import React, { useEffect, useRef } from 'react'

const UserDetailRankingRate = ({ allUsersByTime, userDetailTarget }) => {
    const canvasRef = useRef()

    // 각도 => 라디안 변환
    function degToRad(degree) {
        return degree * (Math.PI / 180)
    }

    // 기본 원 그리기
    function drawBase(ctx, x, y, r, S_degree, E_degree, direction) {
        ctx.beginPath()
        ctx.lineWidth = 4
        ctx.strokeStyle = '#7f8c8d'
        ctx.arc(x, y, r, S_degree, E_degree, direction)
        ctx.stroke()
    }

    // 승 부분 그리기
    // 상위 퍼센티지에서는 반대로 걸어줘야함
    // ex) 상위 0.01 => drawGreenCircle(ctx, x, y, r, degToRad(269), degToRad(270 - (360 * (1 - 0.01)) + 0.5), true)
    function drawGreenCircle(ctx, x, y, r, S_degree, E_degree, direction) {
        ctx.beginPath()
        ctx.lineWidth = 40
        ctx.strokeStyle = '#2EC4B6'
        ctx.arc(x, y, r, S_degree, E_degree, direction)
        ctx.stroke()
    }

    // 패 부분 그리기
    function drawRedCircle(ctx, x, y, r, S_degree, E_degree, direction) {
        ctx.beginPath()
        ctx.lineWidth = 40
        ctx.strokeStyle = '#e74c3c'
        ctx.arc(x, y, r, S_degree, E_degree, direction)
        ctx.stroke()
    }

    // 레이팅 정렬 하기
    function sortRanking(arr) {
        return arr.concat().sort(function(a, b) {return b.rating - a.rating})
    }

    // 레이팅으로 user 랭킹 상위퍼센티지 구하기
    function rankingRate() {
        const sortedArr = sortRanking(allUsersByTime)

        const target = sortedArr.filter(el => el.name === userDetailTarget.name)
        const ranking = sortedArr.indexOf(target[0]) + 1
        
        // 본인 순위 / 전체 인원
        return ( ranking / allUsersByTime.length )
    }

    // 랭킹 수치 보정
    const newRankingRate = () => {
        return (rankingRate() * 100).toFixed(2)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        // 상위 퍼센티지
        drawBase(ctx, 90, 90, 40, 0, Math.PI * 2, false)
        drawGreenCircle(ctx, 90, 90, 66, degToRad(270), degToRad(270 - (360 * (1 - rankingRate()))), true)
        drawRedCircle(ctx, 90, 90, 66, degToRad(270), degToRad(270 - (360 * (1 - rankingRate()))), false)
    }, [])

    return (
        <>
            <canvas width="180" height="180" ref={canvasRef} className="canvas"></canvas>
            <span className="hover">Hover me!</span>
            <div className="gameRecord">
                <span className="record--left">상위</span>
                <span className="record--right">{newRankingRate()} %</span>
            </div>
        </>
    )
}

export default UserDetailRankingRate