import React, { useEffect, useState } from 'react';
import '../../css/client.css';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RankingContent = ({allUsers, allGame, contentMode, setContentMode}) => {
  const studentRanking = allUsers.filter(user => user.status === "재학");
  const studentidRanking = allUsers.filter(user => user.studentid === 16);
  const [loadState, setLoadState] = useState({ end: 9 });
  const [showRanking, setShowRanking] = useState([]);
  const [currentType, setCurrentType] = useState('전체');
  const [typeContent, setTypeContent] = useState('');

  useEffect(() => {
    if(contentMode === "재학생랭킹"){
      setShowRanking(studentRanking.slice(0, loadState.end))
    } else if(contentMode === "전체랭킹"){
      // setShowRanking(allUsers)
      switch(currentType) {
        case '전체':
          setShowRanking(allUsers.slice(0, loadState.end))
          break;
        case '학번':
          setShowRanking(allUsers.filter(el => el.studentid === 16))
          break;
        default:
          break;
      }
    }
    
    
    // else if(contentMode === "학번별랭킹"){
    //   setShowRanking(studentidRanking)
    // }
  }, [contentMode, allUsers, loadState, currentType, typeContent])

  // infinite 스크롤
  function onScrollAction(e) {
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


  function onChangeAction(e) {
    setTypeContent(e.target.value)
  }

  function onClickAction(e) {
    const target = e.target.id;

    setCurrentType(target)
  }

  const rankingContentFilter = (
    <>
      <div className="dropdown">
        <div className="dropdown--selected">
          <span className="selected">{currentType}</span>
          <FontAwesomeIcon icon={faCaretDown}/>
        </div>
        <ul className="dropdown--list">
          <li id="전체" className="dropdown--list__item" onClick={onClickAction}>전체</li>
          <li id="학번" className="dropdown--list__item" onClick={onClickAction}>학번</li>
        </ul>
      </div>
      <input type="text" className="rankingContent-input" placeholder="text me..." onChange={onChangeAction} />
    </>
  )

  return (
    <>
      {contentMode === "전체랭킹" && rankingContentFilter}
      <div className="rankingContainer" onScroll={onScrollAction}>
        {userRankingList}
      </div>
    </>
  )
};

export default RankingContent;