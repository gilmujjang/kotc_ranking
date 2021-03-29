import React from 'react';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RecentGame = ({ allGame }) => {

    const recentGames =  allGame.slice(0, 4).map((el, index) => (
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
        ))

    return (
        <div className="games">
            {recentGames}
        </div>
    );
}

export default RecentGame