import React from 'react';
import Header from '../component/admin/Header';
import RegiMatch from '../component/admin/regiMatch'
import '../css/admin.css';

const AdminMain = () => {
  return (
    <div className="App">
      <Header />
      <div className="Content">
        <RegiMatch/>
      </div>
    </div>
  );
};

export default AdminMain;
