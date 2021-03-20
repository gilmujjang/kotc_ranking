import { React, useEffect, useState } from 'react';
import '../../css/admin.css';
import { Toast, ToastHeader } from 'reactstrap';
import { dbService, storageService } from '../../fbase';

const MatchFix = () => {
  const [allGame, setAllGame] = useState([]);
  useEffect(() => {
    dbService.collection("game").orderBy("write_time","desc").limit(20).onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        const gameObject = {
          winners:doc.data().winners,
          losers:doc.data().losers,
          ratingChange:doc.data().ratingChange,
          date:doc.data().date,
          time:doc.data().write_time
        }
        setAllGame(allGame => [...allGame, gameObject]);
      })
    })
  }, [])

  const RecentGame = allGame.map(game => (
    <Toast>
      <ToastHeader>{game.winners} vs {game.losers}</ToastHeader>
      <div className="needMargin flexWrap userInfo">

      </div>
      <div className="needMargin flexWrap userInfo">

      </div>

    </Toast>
  ))
 
  return (
    <div className="Box">
      {RecentGame}
    </div>
  );
};

export default MatchFix;
