import { React } from 'react';
import { Toast, ToastHeader } from 'reactstrap';
import styles from '../css/Admin.module.css'
import classNames from 'classnames';

const UserList = ({allUsers}) => {

  const RecentUser = allUsers.map(user => (
    <div className={styles.toast}>
      <div  className={styles.toastheader}>
        <div className={styles.spaceBetween}>
          <div className={styles.needMargin}>{user.name}</div>
          _
          <div className={styles.needMargin}>{user.status}</div>
        </div>
      </div>
      <div className={classNames({["needMargin"]: true, ["spaceBetween"]: true})}>
        <div>학번 : {user.studentid}</div>
        <div>학과 : {user.department}</div>
      </div>
      <div className={classNames({["needMargin"]: true, ["spaceBetween"]: true})}>
        <div>Rating : {user.rating}</div>
        <div>전적 : {user.game_win}승 {user.game_lose}패</div>
      </div>
    </div>
  ))

  return (
    <div className={styles.LongBox}>
      {RecentUser}
    </div>
  );
};

export default UserList;
