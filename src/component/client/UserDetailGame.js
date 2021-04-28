import React, { useMemo } from 'react'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function getRecentGamesStructure(arr) {
  return (
    arr.map((el, index) => 
      <div className="game" key={index}>
        <div className="top">{el.date.slice(0, 4)}년 {el.date.slice(4, 6)}월 {el.date.slice(6)}일</div>
        <div className="bot">
          {el.winners.length === 2 ?
            <>
            <div className="winner">
              <span>Winner! ^^</span>
              <div className="winnerInfo">
                <div className="winnerNames">
                  <span className="winner__name">{el.winners[0]}</span>
                  <span className="winner__name">{el.winners[1]}</span>
                </div>
                <div className="winnerRatings">
                  <span className="winner__rating>">{el.ratingChange}<FontAwesomeIcon className="icon--win" icon={faCaretUp} /></span>
                  <span className="winner__rating>">{el.ratingChange}<FontAwesomeIcon className="icon--win" icon={faCaretUp} /></span>
                </div>
              </div>
            </div>
            <div className="loser">
              <span>loser! ㅠㅠ</span>
              <div className="loserInfo">
                <div className="loserNames">
                  <span className="loser__name">{el.losers[0]}</span>
                  <span className="loser__name">{el.losers[1]}</span>
                </div>
                <div className="loserRatings">
                  <span className="loser__rating>">{el.ratingChange}<FontAwesomeIcon className="icon--lose" icon={faCaretDown} /></span>
                  <span className="loser__rating>">{el.ratingChange}<FontAwesomeIcon className="icon--lose" icon={faCaretDown} /></span>
                </div>
              </div>
            </div>
            </>
          :
            <>
            <div className="winner">
              <span>Winner! ^^</span>
              <div className="winnerInfo">
                <div className="winnerNames">
                  <span className="winner__name">{el.winners[0]}</span>
                </div>
                <div className="winnerRatings">
                  <span className="winner__rating>">{el.ratingChange}<FontAwesomeIcon className="icon--win" icon={faCaretUp} /></span>
                </div>
              </div>
            </div>
            <div className="loser">
                <span>loser! ㅠㅠ</span>
                <div className="loserInfo">
                  <div className="loserNames">
                    <span className="loser__name">{el.losers[0]}</span>
                  </div>
                  <div className="loserRatings">
                    <span className="loser__rating>">{el.ratingChange}<FontAwesomeIcon className="icon--lose" icon={faCaretDown} /></span>
                  </div>
                </div>
            </div>
            </>
          }
        </div>
      </div>
    )
  )
}

function noGamesStructure() {
  return (
    <div className="noGame">
      <span>경기 기록이 없습니다.</span>
    </div>
  )
}

const UserDetailGame = ( {userMatch} ) => {
  const recentGames = useMemo(() => getRecentGamesStructure(userMatch), [userMatch])

  const noGames = useMemo(() => noGamesStructure(), [])

  return (
    <>
      {
      userMatch.length > 0 ?
        <div className="games">
          {recentGames}
        </div>
      :
        noGames
      }
    </>
  )
}

export default UserDetailGame