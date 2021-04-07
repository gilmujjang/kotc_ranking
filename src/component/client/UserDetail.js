import React, { useEffect, useRef } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserDetail = ({ allUsersByTime, setIsDetailOn, userKey }) => {
    const canvasRef = useRef()

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

    // 글자는 보류

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        drawCircle(ctx)
        drawWin(ctx)
        drawLose(ctx)
    }, [])

    return (
        <div className="detailContainer">
            <div className="top clearfix">
                <div className="top--left float--left">
                    {info}
                </div>
                <div className="top--right float--right">
                    <canvas width="500" height="180" ref={canvasRef} className="canvas"></canvas>
                </div>
            </div>
            <div className="bottom">
                {/* 그래프 */}
            </div>
            <FontAwesomeIcon icon={faTimes} className="close" onClick={closeDetail}/>
        </div>
    );
}

export default UserDetail;