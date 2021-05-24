import { React, useEffect, useState } from 'react';
import { dbService } from '../../fbase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import styles from '../css/Admin.module.css'
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react'

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
      dbService.collection("kotc").doc("group_data").collection("players").doc(winner).collection("game_record").doc(e.target.id).delete()
      dbService.collection("kotc").doc("group_data").collection("players").doc(winner).update({
        rating:firebase.firestore.FieldValue.increment(-changedRating),
        game_all:firebase.firestore.FieldValue.increment(-1),
        game_win:firebase.firestore.FieldValue.increment(-1)
      })
    })

    await loseTeam.map(loser => {
      dbService.collection("kotc").doc("group_data").collection("players").doc(loser).collection("game_record").doc(e.target.id).delete()
      dbService.collection("kotc").doc("group_data").collection("players").doc(loser).update({
        rating:firebase.firestore.FieldValue.increment(changedRating),
        game_all:firebase.firestore.FieldValue.increment(-1),
        game_lose:firebase.firestore.FieldValue.increment(-1)
      })
    })
    await dbService.collection("kotc").doc("group_data").collection("game").doc(e.target.id).delete()
    alert(e.target.id+' 를 삭제했습니다')
  }

  const RecentGame = allGame.map(game => (
    <div className={styles.displayFlex}>
      <div className={styles.toast}>
        <div className={styles.toastheader}>
          <div>
            {game.winners.map(i => (
            <span className={styles.targetUser}>{i}</span>
            ))}
            vs 
            {game.losers.map(i => (
            <span className={styles.targetUser}>{i}</span>
            ))}
          </div>
          <div>
            <Icon name="trash alternate outline" className={styles.deleteIcon} id={game.date+'-'+game.time} onClick={deleteClick}></Icon>
          </div>
        </div>
        <div className={styles.userinfomodule}>
          <div className={styles.userinfo}>레이팅변화 : {game.ratingChange}</div>
          <div className={styles.userinfo}>승률예측 : {game.percentage}%</div>
        </div>
        <div className={styles.userinfo}>
          등록시각 : {game.time}
        </div>
      </div>
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
