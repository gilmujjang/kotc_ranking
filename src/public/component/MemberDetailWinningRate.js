import React, { useEffect, useRef } from 'react'
import styles from '../css/MemberDetailModal.module.css'

// 각도 => 라디안 변환
function degToRad(degree) {
  return degree * (Math.PI / 180)
}

// 기본 원 그리기
function drawBase(ctx, x, y, r, S_degree, E_degree, direction) {
  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.strokeStyle = '#ecf0f1'
  ctx.arc(x, y, r, S_degree, E_degree, direction)
  ctx.stroke()
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




const MemberDetailWinningRate = ({ playerDetailTarget }) => {
  const canvasRef = useRef()
  
  // 승률 계산
  function getWinningRate() { 
      return playerDetailTarget.game_win / playerDetailTarget.game_all
  }  

  useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')  
      drawBase(ctx, 70, 70, 20, 0, Math.PI * 2, false)
      
      // 승/패 그리기
      if(getWinningRate() === 0) {        // 승이 0인 경우
          drawRedCircle(ctx, 70, 70, 46, degToRad(270), degToRad(-90), false)
      } else if(getWinningRate() === 1) { // 패가 0인 경우
          drawGreenCircle(ctx, 70, 70, 46, degToRad(270), degToRad(-90), true)
      } else {                          // 그 외 일반상황
          drawGreenCircle(ctx, 70, 70, 46, degToRad(270), degToRad(270 - 360 * getWinningRate()), true)
          drawRedCircle(ctx, 70, 70, 46, degToRad(270), degToRad(270 - 360 * getWinningRate()), false)
      }
  }, [])
  
  return (
    <>
      <canvas width="140" height="140" ref={canvasRef} className="canvas"></canvas>
      <span className={styles.hover}>Hover me!</span>
      <div className={styles.gameRecord}>
        <span className={styles.record__left}>{playerDetailTarget.game_win} 승</span>
        <span className={styles.record__right}>{playerDetailTarget.game_lose} 패</span>
      </div>
    </>
  )
}

export default React.memo(MemberDetailWinningRate)