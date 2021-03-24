import React, { useEffect, useRef, useState } from 'react';

const RankingContent = ({allUsers, allGame, contentMode}) => {

  const [loadState, setLoadState] = useState({ end: 9 })
  const studentRanking = allUsers.filter(user => user.status === "재학");
  const studentidRanking = allUsers.filter(user => user.studentid == 16);
  const [showRanking, setShowRanking] = useState([]);
  
  useEffect(() => {
    if(contentMode === "재학생랭킹"){
      setShowRanking(studentRanking.slice(0, loadState.end))
      console.log(studentRanking);
    } else if(contentMode === "전체랭킹"){
      setShowRanking(allUsers)
    } else if(contentMode === "학번별랭킹"){
      setShowRanking(studentidRanking)
    }
  }, [contentMode, allUsers, loadState])

  // infinite 스크롤
  const onScrollTarget = useRef();
  const onScrollAction = (e) => {
    const rankingContainer = e.target;
    if(
        rankingContainer.scrollTop + rankingContainer.clientHeight
        >= rankingContainer.scrollHeight
      ) {
        switch(studentRanking.length - loadState.end) {
          case 0:
            break;
          case 1:
            setLoadState(prevLoadState => ({...prevLoadState, end: prevLoadState.end + 1}))
            break;
          case 2:
            setLoadState(prevLoadState => ({...prevLoadState, end: prevLoadState.end + 2}))
            break;
          case 3:
            setLoadState(prevLoadState => ({...prevLoadState, end: prevLoadState.end + 3}))
            break;
          case 4:
            setLoadState(prevLoadState => ({...prevLoadState, end: prevLoadState.end + 4}))
            break;
          default :
            setLoadState(prevLoadState => ({...prevLoadState, end: prevLoadState.end + 5}))
            break;
        }
      }
    };

  const userRankingList = showRanking.map((user,index) => (
    <div className="ranking" key={index}>
      <p className="item--left grade">{index + 1}</p>
      <div className="item--img">
        {
        user.attachmentUrl ?
        <img src={user.attachmentUrl} alt="profile-img"/> :
        <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="profile-img"/>
        }
      </div>
      <div className="item--right">
        <span className="rating">{user.rating}</span>
        <div>
          <span className="studentName">{user.name}</span>
          <span className="studentId">{user.studentid}</span>
          <span className="department">{user.department}</span>
        </div>
      </div>
    </div>
  ))

  return (
    <div className="rankingContainer" ref={onScrollTarget} onScroll={onScrollAction}>
      {userRankingList}
    </div>
  )
};

export default RankingContent;