import { React, useEffect, useState } from 'react';
import { Toast, ToastHeader } from 'reactstrap';
import { dbService } from '../../fbase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import styles from '../css/Admin.module.css'
import classNames from 'classnames';

const MatchList = ({allGame}) => {

  const deleteClick = async(e) => {
    let winTeam = []
    let loseTeam = []
    let changedRating = 0
    allGame.map(game => {
      if(game.id == e.target.id){
        winTeam=winTeam.concat(game.winners)
        loseTeam=loseTeam.concat(game.losers)
        changedRating =game.ratingChange
      }
    })

    await winTeam.map(winner => {
      dbService.collection("user").doc(winner).collection("game_record").doc(e.target.id).delete()
      dbService.collection("user").doc(winner).update({
        rating:firebase.firestore.FieldValue.increment(-changedRating),
        game_all:firebase.firestore.FieldValue.increment(-1),
        game_win:firebase.firestore.FieldValue.increment(-1)
      })
    })

    await loseTeam.map(loser => {
      dbService.collection("user").doc(loser).collection("game_record").doc(e.target.id).delete()
      dbService.collection("user").doc(loser).update({
        rating:firebase.firestore.FieldValue.increment(changedRating),
        game_all:firebase.firestore.FieldValue.increment(-1),
        game_lose:firebase.firestore.FieldValue.increment(-1)
      })
    })
    await dbService.collection("game").doc(e.target.id).delete()
    alert(e.target.id+' 를 삭제했습니다')
  }

  const RecentGame = allGame.map(game => (
    <div className={styles.displayFlex}>
      <Toast>
        <ToastHeader>
          {game.winners.map(i => (
          <span className={styles.targetUser}>{i}</span>
          ))}
          vs 
          {game.losers.map(i => (
          <span className={styles.targetUser}>{i}</span>
          ))}
        </ToastHeader>
        <div className={classNames({["needMargin"]: true,["flexWrap"]: true,["spaceBetween"]: true})}>
          <div>레이팅변화 : {game.ratingChange}</div>
          <div>승률예측 : {game.percentage}%</div>
        </div>
        <div className={classNames({["needMargin"]: true,["flexWrap"]: true,["spaceBetween"]: true})}>
          등록시각 : {game.time}
        </div>
      </Toast>
      <i className={classNames({["far fa-trash-alt"]: true,["deleteIcon"]: true})} id={game.date+'-'+game.time} onClick={deleteClick}></i>
    </div>
  ))
 
  return (
    <div className={styles.LongBox}>
      <div className={styles.gameListHeader}>
        <span>승리팀</span>
        <span>패배팀</span>
      </div>
      <div>{RecentGame}</div>
    </div>
  );
};

export default MatchList;
