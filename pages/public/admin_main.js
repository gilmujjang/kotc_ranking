import { React, useEffect, useState } from 'react';
import { dbService } from '../../src/fbase'
import styles from '../../src/admin/css/Admin.module.css'
import Header from '../../src/admin/component/Header';
import CreateUser from '../../src/admin/component/CreateUser'
import RegiMatch from '../../src/admin/component/RegiMatch'
import UserList from '../../src/admin/component/UserList'
import MatchList from '../../src/admin/component/MatchList'

const admin_main = ({allUsers, allGame, userObj}) => {

  return (
    <div className={styles.AdminMain}>
      <Header />
      <div className={styles.Content}>
        <CreateUser/>
        <RegiMatch allUsers={allUsers}/>
        <UserList allUsers={allUsers}/>
        <MatchList allGame={allGame}/>
      </div>
    </div>
  );
};

export default admin_main;