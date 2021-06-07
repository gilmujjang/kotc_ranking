import { useEffect, useState } from 'react'
import { dbService } from '../../src/fbase'
import { useRouter } from 'next/router'
import styles from '../../src/public/css/group_main.module.css'
import Nav from "../../src/public/component/Nav"
import Ranking from "../../src/public/component/Ranking"
import MemberList from "../../src/public/component/MemberList"
import Community from "../../src/public/component/Community"
import RecentGame from "../../src/public/component/RecentGame"
import Ad from "../../src/public/component/Ad"

const group_main = () => {
  const router = useRouter()
  const { group } = router.query
  
  const groupName = group
  const [content, setContent] = useState('community')
  const [groupPlayers, setGroupPlayers] = useState([]);
  const [wholeGames, setWholeGames] = useState([]);

  async function getGroupPlayers() {
    const querySnapshot = await dbService.collection(group).doc('group_data').collection('players').get()
    querySnapshot.forEach(doc => {
      const singlePlayerObject = {
        name: doc.data().name,
        photoURL: doc.data().photoURL,
        joined_date: doc.data().joined_date,
        rating: doc.data().rating,
        game_all: doc.data().game_all,
        game_win: doc.data().game_win,
        game_lose: doc.data().game_lose,
        status: doc.data().status,
        start_rating: doc.data().start_rating,
        introduce: doc.data().introduce
      }
      setGroupPlayers(groupPlayers => [...groupPlayers, singlePlayerObject])
    })
  }

  async function getWholeGames() {
    const querySnapshot = await dbService.collection(group).doc('group_data').collection('games').orderBy("write_time","desc").get()
    querySnapshot.forEach(doc => {
      const singleGameObject = {
        winners: doc.data().winners,
        losers: doc.data().losers,
        ratingChange: doc.data().ratingChange,
        percentage: doc.data().percentage,
        date: doc.data().date,
        time: doc.data().write_time,
        id: `${doc.data().date}-${doc.data().write_time}`,
        winnerRatingAfter: doc.data().winnerRatingAfter,
        loserRatingAfter: doc.data().loserRatingAfter
      }
      setWholeGames(wholeGames => [...wholeGames, singleGameObject]);
    })
  }

  useEffect(() => {
    if(router.query.group) {
      getGroupPlayers()
      getWholeGames()
    }
  }, [router])

  return (
    <div className={styles.publicContainer}>
      <Nav setContent={setContent} />
      <div className={styles.teamContainer}>
        {content === 'ranking' && <Ranking groupPlayers={groupPlayers} />}
        {content === 'member list' && <MemberList groupName={groupName} groupPlayers={groupPlayers} />}
        {content === 'community' && <Community groupName={groupName}/>}
      </div>
      {content !== 'community' &&
      <div className={styles.aside}>
        <div className={styles.aside1}>
          <RecentGame wholeGames={wholeGames} />
        </div>
        <div className={styles.aside2}>
          <Ad />
        </div>
      </div>
      }
    </div>
  )
}

export default group_main