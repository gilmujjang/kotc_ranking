import { useEffect, useState } from 'react'
import { dbService } from '../../src/fbase'
import styles from '../../src/public/css/team_main.module.css'
import Nav from "../../src/public/component/Nav"
import Ranking from "../../src/public/component/Ranking"
import MemberList from "../../src/public/component/MemberList"
import Community from "../../src/public/component/Community"
import RecentGame from "../../src/public/component/RecentGame"
// import Ad from "../../src/public/component/Ad"

const team_main = () => {
  const [content, setContent] = useState('ranking')
  const [allUsers, setAllUsers] = useState([]);
  const [allGame, setAllGame] = useState([]);
  
  useEffect(() => {
    dbService.collection("user").orderBy("rating","desc").get().then(snapshot => {
      snapshot.docs.map(doc => {
        const userObject = {
          name:doc.data().name,
          rating:doc.data().rating,
          start_rating: doc.data().start_rating,
          game_all:doc.data().game_all,
          game_win:doc.data().game_win,
          game_lose:doc.data().game_lose,
          studentid:doc.data().studentid,
          department:doc.data().department,
          status: doc.data().status,
          time:doc.data().time,
          attachmentUrl:doc.data().attachmentUrl
        }
        setAllUsers(allUsers => [...allUsers, userObject]);
      })
    })
  }, [])

  useEffect(() => {
    dbService.collection("games").orderBy("write_time","desc").limit(10).get().then(snapshot => {
      snapshot.docs.map(doc => {
        const gameObject = {
          winners: doc.data().winners,
          losers: doc.data().losers,
          ratingChange: doc.data().ratingChange,
          percentage: doc.data().percentage,
          date: doc.data().date,
          time: doc.data().write_time,
          id: doc.data().date+'-'+doc.data().write_time,
          winnerRatingAfter: doc.data().winnerRatingAfter,
          loserRatingAfter: doc.data().loserRatingAfter
        }
        setAllGame(allGame => [...allGame, gameObject]);
      })
    })
  }, [])

  return (
      <div className={styles.publicContainer}>
        <Nav setContent={setContent} />
        <div className={styles.teamContainer}>
          {content === 'ranking' && <Ranking allUsers={allUsers} />}
          {content === 'member list' && <MemberList allUsers={allUsers} />}
          {content === 'community' && <Community />}
        </div>
        <div className={styles.aside}>
          <div className={styles.aside1}>
            <RecentGame allGame={allGame} />
          </div>
          <div className={styles.aside2}>
            <h2>aside2</h2>
          </div>
        </div>
      </div>
  )
}

export default team_main