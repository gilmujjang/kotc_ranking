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
// 상위 퍼센티지 그래프에서는 반대로 걸어줘야함. ex) 상위 0.01 => 그 반대인 0.99 곱해야 함
// drawGreenCircle(ctx, x, y, r, degToRad(269), degToRad(270 - (360 * (1 - 0.01)) + 0.5), true)
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


const MemberDetailRankingRate = ({ groupPlayers, playerDetailTarget }) => {
  const canvasRef = useRef()  

  // 레이팅 정렬 하기
  function sortRanking(arr) {
    return arr.concat().sort(function(a, b) {return b.rating - a.rating})
  }

    // 레이팅으로 user 랭킹 상위퍼센티지 구하기
  function getRankingRate() {
    const sortedArr = sortRanking(groupPlayers)
    
    const target = sortedArr.filter(el => el.name === playerDetailTarget.name)
    const ranking = sortedArr.indexOf(target[0]) + 1
    // 본인 순위 / 전체 인원
    return ( ranking / groupPlayers.length )
  }

  // 화면 출력용 랭킹 수치 보정
  const newRankingRate = () => {
    return Math.round(getRankingRate() * 100)
  }

  useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      // 상위 퍼센티지
      drawBase(ctx, 70, 70, 20, 0, Math.PI * 2, false)
      if(getRankingRate() === 0) {
          drawGreenCircle(ctx, 70, 70, 46, degToRad(270), degToRad(-90), true)
      } else if(getRankingRate() === 1) {
          drawRedCircle(ctx, 70, 70, 46, degToRad(270), degToRad(-90), false)
      } else {
          drawGreenCircle(ctx, 70, 70, 46, degToRad(270), degToRad(270 - (360 * (1 - getRankingRate()))), true)
          drawRedCircle(ctx, 70, 70, 46, degToRad(270), degToRad(270 - (360 * (1 - getRankingRate()))), false)
      }
  }, [])

  return (
    <>
      <canvas width="140" height="140" ref={canvasRef} className="canvas"></canvas>
      <span className={styles.hover}>Hover me!</span>
      <div className={styles.gameRecord}>
        <span className={styles.record__left}>상위</span>
        <span className={styles.record__right}>{newRankingRate()} %</span>
      </div>
    </>
  )
}

export default React.memo(MemberDetailRankingRate)