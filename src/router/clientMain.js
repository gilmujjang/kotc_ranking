import React, { useEffect, useState } from 'react';
import { dbService } from '../fbase'
import Post from '../component/client/Post';
import RankingContent from '../component/client/RankingContent';
import UserInfo from '../component/client/UserInfo';
import '../css/client.css';

const ClientMain = ({userObj}) => {
  const [allUsers, setAllUsers] = useState([]);
  const [allGame, setAllGame] = useState([]);
  const [contentMode, setContentMode] = useState("재학생랭킹");

  useEffect(() => {
    dbService.collection("user").orderBy("rating","desc").get().then(snapshot => {
      snapshot.docs.map(doc => {
        const userObject = {
          name:doc.data().name,
          rating:doc.data().rating,
          game_all:doc.data().game_all,
          game_win:doc.data().game_win,
          game_lose:doc.data().game_lose,
          studentid:doc.data().studentid,
          department:doc.data().department,
          status: doc.data().status,
          time:doc.data().time,
          attachmentUrl:doc.data().attachmentUrl
        }
        setAllUsers(allUsers => [...allUsers, userObject]);
      })
    })
  }, [])

  useEffect(() => {
    dbService.collection("game").orderBy("write_time","desc").limit(10).get().then(snapshot => {
      snapshot.docs.map(doc => {
        const gameObject = {
          winners:doc.data().winners,
          losers:doc.data().losers,
          ratingChange:doc.data().ratingChange,
          percentage:doc.data().percentage,
          date:doc.data().date,
          time:doc.data().write_time,
          id:doc.data().date+'-'+doc.data().write_time
        }
        setAllGame(allGame => [...allGame, gameObject]);
      })
    })
  }, [])

  const listOnClicked = e => {
    setContentMode(e.target.id)
  }
  
  return (
    <div className="App">
      <div className="client-container">
        <div class="nav">
          <ul>
            <li id="재학생랭킹" onClick={listOnClicked}>재학생 랭킹</li>
            <li id="전체랭킹" onClick={listOnClicked}>전체 랭킹</li>
            <li id="학번별랭킹" onClick={listOnClicked}>학번별 랭킹</li>
            <li id="선수상세정보" onClick={listOnClicked}>선수 상세정보</li>
            <li id="게시글" onClick={listOnClicked}>게시글</li>
          </ul>
          {/* 로그인 유저 정보, 로그인 개설 시 전환 */}
          {/* {
          userObj &&
            <div className="signedUser">
              <img className="signedUser--img" src={userObj.photoURL} alt=""></img>
              <div className="signedUser--txt">
                <p className="signedUser__name">{userObj.displayName}</p>
                <p className="signedUser__email">{userObj.email}</p>
              </div>
            </div>
          } */}
          <footer>
              <p className="footer--top">&copy; 2021, Built by</p>
              <p className="footer--bot">gilmujjang & Hyeon-Gwang</p>
          </footer>
        </div>
        <div className="ClientMain">
          {["재학생랭킹","전체랭킹","학번별랭킹"].includes(contentMode) && <RankingContent allGame={allGame} allUsers={allUsers} contentMode={contentMode} setContentMode={setContentMode}/>}
          {contentMode==="선수상세정보" && <UserInfo allUsers={allUsers}/>}
          {contentMode==="게시글" && <Post allUsers={allUsers}/>}
        </div>
        <div className="aside1">
          {/* 최근 경기 */}
          <h2>aside1</h2>
        </div>
        <div className="aside2">
          <h2>aside2</h2>
        </div>
      </div>
    </div>
  );
};

export default ClientMain;
