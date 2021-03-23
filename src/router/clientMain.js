import React, { useRef } from 'react';
import Nav from '../component/client/Nav';
import UserRanking from '../component/client/UserRanking';
import '../css/client.css';

const ClientMain = () => {
  
  return (
    <div className="App">
      <div className="client-container">
        <Nav/>
        <div id="main">
          <UserRanking />
        </div>
        <div id="aside1">
          {/* 최근 경기 */}
          <h2>aside1</h2>
        </div>
        <div id="aside2">
          <h2>aside2</h2>
        </div>
      </div>
    </div>
  );
};

export default ClientMain;
