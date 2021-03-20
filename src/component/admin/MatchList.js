import { React, useEffect, useState } from 'react';
import '../../css/admin.css';
import { Toast, ToastHeader } from 'reactstrap';
import { dbService, storageService } from '../../fbase';

const MatchList = () => {
  const [allGame, setAllGame] = useState([]);

  useEffect(() => {
    setAllGame([]);
    dbService.collection("game").orderBy("write_time","desc").limit(20).onSnapshot(snapshot => {
      snapshot.docs.map(doc => {
        const gameObject = {
          winners:doc.data().winners,
          losers:doc.data().losers,
          ratingChange:doc.data().ratingChange,
          date:doc.data().date,
          time:doc.data().write_time,
          id:doc.data().date+''+doc.data().write_time
        }
        setAllGame(allGame => [...allGame, gameObject]);
      })
    })
  }, [])

  const deleteClick = async(e) => {
    let player = [];
    await dbService.collection("game").doc(e.target.id).get().then((doc) => {
      const win = doc.data().winners
      const lose = doc.data().losers
      player = win.concat(lose)
      player.map(user => {
        dbService.collection("user").doc(user).collection("game_record").doc(e.target.id).delete()
      })
    })
    await dbService.collection("game").doc(e.target.id).delete()
    alert(e.target.id+' 를 삭제했습니다')
    setAllGame([]);
  }

  const RecentGame = allGame.map(game => (
    <div className="displayFlex">
      <Toast>
        <ToastHeader>
          {game.winners.map(i => (
          <span className="targetUser">{i}</span>
          ))}
          vs 
          {game.losers.map(i => (
          <span className="targetUser">{i}</span>
          ))}
        </ToastHeader>
        <div className="needMargin flexWrap spaceBetween">
          레이팅변화 : {game.ratingChange}
        </div>
        <div className="needMargin flexWrap spaceBetween">
          등록시각 : {game.time}
        </div>
      </Toast>
      <i class="far fa-trash-alt deleteIcon" id={game.date+'-'+game.time} onClick={deleteClick}></i>
    </div>
  ))
 
  return (
    <div className="Box">
      <div className="spaceBetween gameListHeader">
        <span>승리팀</span>
        <span>패배팀</span>
      </div>
      <div>{RecentGame}</div>
    </div>
  );
};

export default MatchList;
