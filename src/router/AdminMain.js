import React from 'react';
import Header from '../component/admin/Header';
import CreateUser from '../component/admin/CreateUser'
import RegiMatch from '../component/admin/RegiMatch'
import UserFix from '../component/admin/UserFix'
import MatchFix from '../component/admin/MatchFix'
import '../css/admin.css';

const AdminMain = () => {
  return (
    <div className="App">
      <Header />
      <div className="Content">
        <CreateUser/>
        <RegiMatch/>
        <UserFix/>
        <MatchFix/>
      </div>
    </div>
  );
};

export default AdminMain;
