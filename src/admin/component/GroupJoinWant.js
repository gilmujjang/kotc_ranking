import { React, useState, useEffect } from "react";
import styles from "../css/Admin.module.css";
import { Icon } from "semantic-ui-react";
import { dbService } from "../../fbase";
import "firebase/firestore";
import firebase from "firebase/app";

const GroupJoinWant = ({ group }) => {
  const [awaitorlist, setawaitorlist] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dbService
      .collection(group)
      .doc("group_data")
      .collection("awaitors")
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          const userObject = {
            displayName: doc.data().displayName,
            name: doc.data().name,
            photoURL: doc.data().photoURL,
            uid: doc.data().uid,
            introduce: doc.data().introduce,
          };
          setawaitorlist((awaitorlist) => [...awaitorlist, userObject]);
        });
      });
  }, [refresh]);

  const joinAccept = (e, user) => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = 0 + "" + month;
    }
    let date = now.getDate();
    if (date < 10) {
      date = 0 + "" + date;
    }
    let hours = now.getHours();
    if (hours < 10) {
      hours = 0 + "" + hours;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = 0 + "" + minutes;
    }
    let seconds = now.getSeconds();
    if (seconds < 10) {
      seconds = 0 + "" + seconds;
    }
    const time =
      year + "" + month + "" + date + "" + hours + "" + minutes + "" + seconds;
    const join_date = Number(year + "" + month + "" + date);
    const userinfo = {
      displayName: user.user.displayName,
      name: user.user.name,
      photoURL: user.user.photoURL,
      introduce: user.user.introduce,
      joindate: time,
      uid: user.user.uid,
    };

    dbService
      .collection(group)
      .doc("group_information")
      .get()
      .then((info) => {
        const groupinfo = {
          created_date: info.data().created_date,
          group_introduce: info.data().group_introduce,
          group_name: info.data().group_name,
          isAdmin: Boolean(false),
          joined_date: join_date,
          number_of_member: info.data().number_of_member + 1,
        };
        dbService
          .collection("whole_users")
          .doc(user.user.uid)
          .collection("joined_group")
          .doc(group)
          .set(groupinfo);
        dbService
          .collection(group)
          .doc("group_information")
          .set(
            { number_of_member: groupinfo.number_of_member },
            { merge: true }
          );
      });

    dbService
      .collection(group)
      .doc("group_data")
      .collection("members")
      .doc(user.user.uid)
      .set(userinfo);
    dbService
      .collection(group)
      .doc("group_data")
      .collection("awaitors")
      .doc(user.user.uid)
      .delete();
    setRefresh(!refresh);
  };

  const joinDeny = (e, user) => {
    dbService
      .collection(group)
      .doc("group_data")
      .collection("awaitors")
      .doc(user.user.uid)
      .delete();
    setRefresh(!refresh);
  };

  const AwaitorUsers = awaitorlist.map((user) => (
    <div className={styles.toast}>
      <div className={styles.toastheader}>
        <div className={styles.spaceBetween}>
          <div className={styles.needMargin}>{user.name}</div>
        </div>
      </div>
      <div className={styles.awaitorlist}>
        <Icon
          name="check icon large"
          onClick={(e) => {
            joinAccept(e, { user });
          }}
        />
        <Icon
          name="window close outline icon large"
          onClick={(e) => {
            joinDeny(e, { user });
          }}
        />
      </div>
    </div>
  ));

  return (
    <div className={styles.ShortBox}>
      <div className={styles.toastheader}>{group}에 들어온 가입신청</div>
      {AwaitorUsers}
    </div>
  );
};

export default GroupJoinWant;
