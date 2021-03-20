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
      <ToastHeader>{game.winners.map(i => (
        <span className="targetUser">{i}</span>
      ))}
       vs 
       {game.losers.map(i => (
        <span className="targetUser">{i}</span>
      ))}</ToastHeader>
      <div className="needMargin flexWrap spaceBetween">
        레이팅변화 : {game.ratingChange}
      </div>
      <div className="needMargin flexWrap spaceBetween">
        등록시각 : {game.time}
      </div>

    </Toast>
  ))
 
  return (
    <div className="Box">
      <div className="spaceBetween">
        <span>승리팀</span>
        <span>패배팀</span>
      </div>
      <div>{RecentGame}</div>
    </div>
  );
};

export default MatchFix;
