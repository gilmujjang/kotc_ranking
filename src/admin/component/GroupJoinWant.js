import { React, useState, useEffect } from 'react';
import styles from '../css/Admin.module.css'
import { Icon } from 'semantic-ui-react'
import { dbService } from '../../fbase';

const GroupJoinWant = ({group}) => {
  const [awaitorlist, setawaitorlist] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dbService.collection(group).doc("group_data").collection("awaitors").get().then(snapshot => {
      snapshot.docs.map(doc => {
        const userObject = {
          displayName:doc.data().displayName,
          name:doc.data().name,
          photoURL:doc.data().attachmentUrl,
          uid: doc.data().uid,
          introduce: doc.data().introduce,
        }
        console.log(userObject)
        setawaitorlist(awaitorlist => [...awaitorlist, userObject]);
      })
    })
  },[refresh])
  

  const joinAccept =(e, user) => {
    // joinlist에서 해당유저 삭제하고 db join에서 삭제하고 member에 삽입
    console.log("가입 승인");
    console.log(user.user.photoURL);
    console.log(user.user.name);
    console.log(user.user.introduce);
    console.log(user.user.displayName);
    console.log(user.user.uid);
    let now = new Date();   
    let year = now.getFullYear(); // 년도
    let month = now.getMonth() + 1;  // 월
    if(month<10){
      month = 0+''+month
    }
    let date = now.getDate();  // 날짜
    if(date<10){
      date = 0+''+date
    }
    let hours = now.getHours(); // 시
    if(hours<10){
      hours = 0+''+hours
    }
    let minutes = now.getMinutes();  // 분
    if(minutes<10){
      minutes = 0+''+minutes
    }
    let seconds = now.getSeconds();  // 초
    if(seconds<10){
      seconds = 0+''+seconds
    }
    const time = (year + '' + month + '' + date + '' + hours + '' + minutes + '' + seconds)
    const userinfo = {
      displayName: user.user.displayName,
      name: user.user.name,
      photoURL: user.user.photoURL,
      introduce: user.user.introduce,
      joindate: time,
      uid: user.user.uid
    }
    dbService.collection(group).doc("group_data").collection("members").doc(user.user.uid).set(userinfo);
    dbService.collection(group).doc("group_data").collection("awaitors").doc(user.user.uid).delete();
    setRefresh(!refresh)
  }

  const joinDeny = (e, user) => {
    // joinlist에서 해당유저 삭제
    console.log("가입 거절");
    console.log(user.user.uid)
    dbService.collection(group).doc("group_data").collection("awaitors").doc(user.user.uid).delete();
    setRefresh(!refresh)
  }

  const AwaitorUsers = awaitorlist.map(user => (
    <div className={styles.toast}>
      <div  className={styles.toastheader}>
        <div className={styles.spaceBetween}>
          <div className={styles.needMargin}>{user.name}</div>
        </div>
      </div>
      <div className={styles.awaitorlist}>
        <Icon name="check icon large" onClick={(e) => {joinAccept(e,{user})}}/>
        <Icon name="window close outline icon large" onClick={(e) => {joinDeny(e,{user})}}/>
      </div>
    </div>
  ))

  return (
    <div className={styles.ShortBox}>
      {AwaitorUsers}
    </div>
  );
};

export default GroupJoinWant;
