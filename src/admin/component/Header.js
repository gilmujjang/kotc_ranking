import React from 'react';
import { authService } from "../../fbase";
import { useHistory } from "react-router-dom";
import styles from '../css/Admin.module.css'
import classNames from 'classnames';



const Header = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/")
  };
  return (
    <div className={styles.header}>
      <span className={styles.headerText}>KOTC 랭킹시스템 관리자 페이지</span>
      <i className={classNames({["fas fa-sign-out-alt fa-2x logout"]: true,[styles.needMargin]: true})}  onClick={onLogOutClick}></i>
    </div>
  );
};

export default Header;
