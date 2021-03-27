import React, { useEffect, useState } from 'react';
import Post from '../component/client/Post';
import RankingContent from '../component/client/RankingContent';
import UserInfo from '../component/client/UserInfo';
import '../css/client.css';
import '../css/client_mugil.css';

const ClientMain = ({userObj, allUsers, allGame}) => {
  const [contentMode, setContentMode] = useState("재학생랭킹");

  const listOnClicked = e => {
    e.preventDefault();
    setContentMode(e.target.id)
  }
  
  return (
    <div className="App">
      <div className="client-container">
        <div id="nav">
              <ul>
                <li><a id="재학생랭킹" onClick={listOnClicked}>재학생 랭킹</a></li>
                <li><a id="전체랭킹" onClick={listOnClicked}>전체 랭킹</a></li>
                <li><a id="학번별랭킹" onClick={listOnClicked}>학번별 랭킹</a></li>
                <li><a id="선수상세정보" onClick={listOnClicked}>선수 상세정보</a></li>
                <li><a id="게시글" onClick={listOnClicked}>게시글</a></li>
              </ul>
              {userObj &&
                  <div className="signedUser">
                  <img className="signedUser--img" src={userObj.photoURL} alt=""></img>
                  <div className="signedUser--txt">
                      <p className="signedUser__name">{userObj.displayName}</p>
                      <p className="signedUser__email">{userObj.email}</p>
                  </div>
                  </div>
              }
              <footer>
                  <p className="footer--top">&copy; 2021, Built by</p>
                  <p className="footer--bot">gilmujjang & Hyeon-Gwang</p>
              </footer>
          </div>
        <div className="ClientMain">
          {["재학생랭킹","전체랭킹","학번별랭킹"].includes(contentMode) && <RankingContent allGame={allGame} allUsers={allUsers} contentMode={contentMode}/>}
          {contentMode==="선수상세정보" && <UserInfo allUsers={allUsers}/>}
          {contentMode==="게시글" && <Post/>}
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
