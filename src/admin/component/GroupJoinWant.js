import { React } from 'react';
import styles from '../css/Admin.module.css'
import classNames from 'classnames';

const GroupJoinWant = () => {
  const [joinlist, setJoinlist] = useState([]);
  dbService.collection("kotc").doc("group_data").collection("join").get().then(snapshot => {
    snapshot.docs.map(doc => {
      const userObject = {
        name:doc.data().name,
        time:doc.data().time,
        attachmentUrl:doc.data().attachmentUrl,
        userid: doc.data().userid,
      }
      setJoinlist(joinlist => [...joinlist, userObject]);
    })
  })

  const joinAccept =(e) => {
    // joinlist에서 해당유저 삭제하고 db join에서 삭제하고 member에 삽입
  }

  const joinDeny = (e) => {
    // joinlist에서 해당유저 삭제
  }

  const JoinWantUsers = joinlist.map(user => (
    <div className={styles.toast}>
      <div  className={styles.toastheader}>
        <div className={styles.spaceBetween}>
          <div className={styles.needMargin}>{user.name}</div>
        </div>
      </div>
      <div className={styles.userinfomodule}>
        <div className={styles.userinfo}>시각 : {user.time}</div>
      </div>
    </div>
  ))

  return (
    <div className={styles.LongBox}>
      {JoinWantUsers}
    </div>
  );
};

export default GroupJoinWant;
