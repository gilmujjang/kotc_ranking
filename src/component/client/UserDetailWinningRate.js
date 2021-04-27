import React, { useEffect, useRef } from 'react'

const UserDetailWinningRate = ({ userDetailTarget }) => {
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

    // 승률 계산
    function winningRate() {
        return userDetailTarget.game_win / userDetailTarget.game_all
    }

    // 승 부분 그리기
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

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        // 승/패
        drawBase(ctx, 90, 90, 40, 0, Math.PI * 2, false)
        drawGreenCircle(ctx, 90, 90, 66, degToRad(270), degToRad(270 - 360 * winningRate()), true)
        drawRedCircle(ctx, 90, 90, 66, degToRad(270), degToRad(270 - 360 * winningRate()), false)
    }, [])

    return (
        <>
            <canvas width="180" height="180" ref={canvasRef} className="canvas"></canvas>
            <span className="hover">Hover me!</span>
            <div className="gameRecord">
                <span className="record--left">{userDetailTarget.game_win} 승</span>
                <span className="record--right">{userDetailTarget.game_lose} 패</span>
            </div>
        </>
    )
}

export default UserDetailWinningRate