import { React, useEffect, useState } from 'react';
import { dbService } from '../../src/fbase'
import styles from '../../src/admin/css/Admin.module.css'
import Header from '../../src/admin/component/Header';
import CreateUser from '../../src/admin/component/CreateUser'
import RegiMatch from '../../src/admin/component/RegiMatch'
import UserList from '../../src/admin/component/UserList'
import MatchList from '../../src/admin/component/MatchList'
// import GroupJoinWant from '../../src/admin/compnent/GroupJoinWant'

const admin_main = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allGame, setAllGame] = useState([]);

  useEffect(() => {
    dbService.collection("kotc").doc("group_data").collection("players").orderBy("rating","desc").get().then(snapshot => {
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
    dbService.collection("kotc").doc("group_data").collection("game").orderBy("write_time","desc").limit(10).get().then(snapshot => {
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
    <div className={styles.AdminMain}>
      <Header />
      <div className={styles.Content}>
        <CreateUser allUsers={allUsers}/>
        <RegiMatch allUsers={allUsers}/>
        <UserList allUsers={allUsers}/>
        <MatchList allGame={allGame}/>
        {/* <GroupJoinWant/> */}
      </div>
    </div>
  );
};

export default admin_main;