import { useEffect, useState } from 'react'
import { dbService } from '../../src/fbase'
import { useRouter } from 'next/router'
import styles from '../../src/public/css/team_main.module.css'
import Nav from "../../src/public/component/Nav"
import Ranking from "../../src/public/component/Ranking"
import MemberList from "../../src/public/component/MemberList"
import Community from "../../src/public/component/Community"
import RecentGame from "../../src/public/component/RecentGame"
// import Ad from "../../src/public/component/Ad"

const group_main = () => {
  const router = useRouter()
  const { group } = router.query
  const [content, setContent] = useState('community')
  const [groupMembers, setGroupMembers] = useState([]);
  const [allGame, setAllGame] = useState([]);

  useEffect(() => {
    const docRef = dbService.collection(group).doc('group members').collection('멤버 목록')
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const singleMemberObject = {
          name: doc.data().name,
          displayName: doc.data().displayName,
          uid: doc.data().uid,
          photoURL: doc.data().photoURL,
          joined_date: doc.data().joined_date,
          rating: doc.data().rating,
          game_all: doc.data().game_all,
          game_win: doc.data().game_win,
          game_lose: doc.data().game_lose,
          status: doc.data().status
        }
        setGroupMembers(groupMembers => [...groupMembers, singleMemberObject])
      })
    })
  }, [])

  useEffect(() => {
    // 경기 기록
  }, [])

  return (
    <div className={styles.publicContainer}>
      <Nav setContent={setContent} />
      <div className={styles.teamContainer}>
        {content === 'ranking' && <Ranking groupMembers={groupMembers} />}
        {content === 'member list' && <MemberList groupMembers={groupMembers} />}
        {content === 'community' && <Community />}
      </div>
      <div className={styles.aside}>
        <div className={styles.aside1}>
          {/* <RecentGame allGame={allGame} /> */}
        </div>
        {content !== 'community' &&
        <div className={styles.aside2}>
          <h2>aside2</h2>
        </div>
        }
      </div>
    </div>
  )
}

export default group_main