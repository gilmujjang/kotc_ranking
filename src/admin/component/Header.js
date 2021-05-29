import React from 'react';
import Link from 'next/link'
import { authService } from "../../fbase";
import { useHistory } from "react-router-dom";
import styles from '../css/Admin.module.css'
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react'



const Header = ({group}) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
  };
  return (
    <div className={styles.header}>
      <span className={styles.headerText}>{group} 랭킹시스템 관리자 페이지</span>
      <Link href="/publick/team_main">
        <Icon name="sign-out icon large" className={styles.logout} onClick={onLogOutClick}></Icon>
      </Link>
    </div>
  );
};

export default Header;
