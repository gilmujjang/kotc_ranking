import { React } from 'react';
import { Toast, ToastHeader } from 'reactstrap';
import styles from '../css/Admin.module.css'
import classNames from 'classnames';

const UserList = ({allUsers}) => {

  const RecentUser = allUsers.map(user => (
    <Toast>
      <ToastHeader>
        <div className={styles.spaceBetween}>
          <div>{user.name}__</div>
          <div>{user.status}</div>
        </div>
      </ToastHeader>
      <div className={classNames({["needMargin"]: true, ["spaceBetween"]: true})}>
        <div>학번 : {user.studentid}</div>
        <div>학과 : {user.department}</div>
      </div>
      <div className={classNames({["needMargin"]: true, ["spaceBetween"]: true})}>
        <div>Rating : {user.rating}</div>
        <div>전적 : {user.game_win}승 {user.game_lose}패</div>
      </div>
    </Toast>
  ))

  return (
    <div className={styles.LongBox}>
      {RecentUser}
    </div>
  );
};

export default UserList;
