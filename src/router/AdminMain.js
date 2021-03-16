import React from 'react';
import Header from '../component/admin/Header';
import CreateUser from '../component/admin/CreateUser'
import RegiMatch from '../component/admin/RegiMatch'
import UserFix from '../component/admin/UserFix'

import '../css/admin.css';

const AdminMain = () => {
  return (
    <div className="App">
      <Header />
      <div className="Content">
        <CreateUser/>
        <RegiMatch/>
        <UserFix/>
      </div>
    </div>
  );
};

export default AdminMain;
