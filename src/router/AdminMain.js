import { React, useEffect, useState } from 'react';
import { dbService, storageService } from '../fbase';
import Header from '../component/admin/Header';
import CreateUser from '../component/admin/CreateUser'
import RegiMatch from '../component/admin/RegiMatch'
import UserList from '../component/admin/UserList'
import MatchList from '../component/admin/MatchList'
import '../css/admin.css';

const AdminMain = () => {

  return (
    <div className="AdminMain">
      <Header />
      <div className="Content">
        <CreateUser/>
        <RegiMatch/>
        <UserList/>
        <MatchList/>
      </div>
    </div>
  );
};

export default AdminMain;
