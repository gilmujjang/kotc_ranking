import React, { useEffect, useState } from 'react';
import classNames from 'classnames'
import { Icon } from 'semantic-ui-react'
import styles from '../css/Ranking.module.css'


const RankingContent = ({ allUsers }) => {
  const allUsersList = allUsers.filter(user => user.status === "재학" || user.status === "졸업")
  // const studentRanking = allUsers.filter(user => user.status === "재학");
  const [loadState, setLoadState] = useState({ end: 9 });
  const [showRanking, setShowRanking] = useState([]);
  const [currentType, setCurrentType] = useState('전체');
  const [typeContent, setTypeContent] = useState('');

  useEffect(() => {
    switch(currentType) {
      case '전체':
        setShowRanking(allUsersList)
        break;
      case '학번':
        if(typeContent) {
          setShowRanking(allUsersList.filter(el => el.studentid === parseInt(typeContent)))
        } else{
          setShowRanking(allUsersList)
        }
        break;
      default:
        setShowRanking(allUsersList)
        break;
    }
  }, [allUsers, loadState, currentType, typeContent])

  // // infinite 스크롤
  // function onScrollAction(e) {
  //   const rankingContainer = e.target;
  //   if(
  //       rankingContainer.scrollTop + rankingContainer.clientHeight
  //       >= rankingContainer.scrollHeight
  //     ) {
  //       switch(studentRanking.length - loadState.end) {
  //         case 0:
  //           break;
  //         case 1:
  //           setLoadState(prevLoadState => ({...prevLoadState, end: prevLoadState.end + 1}))
  //           break;
  //         case 2:
  //           setLoadState(prevLoadState => ({...prevLoadState, end: prevLoadState.end + 2}))
  //           break;
  //         case 3:
  //           setLoadState(prevLoadState => ({...prevLoadState, end: prevLoadState.end + 3}))
  //           break;
  //         case 4:
  //           setLoadState(prevLoadState => ({...prevLoadState, end: prevLoadState.end + 4}))
  //           break;
  //         default :
  //           setLoadState(prevLoadState => ({...prevLoadState, end: prevLoadState.end + 5}))
  //           break;
  //       }
  //     }
  //   };

  const userRankingList = showRanking.map((user,index) => (
    <div className={styles.ranking} key={index}>
      <p className={classNames({[styles.left]: true, [styles.grade]: true})}>
        {index + 1}
      </p>
      <div className={styles.middle}>
        {
        user.attachmentUrl ?
        <img src={user.attachmentUrl} alt="ranking profile"/> :
        <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="profile-img"/>
        }
      </div>
      <div className={styles.right}>
        <span className={styles.rating}>{user.rating}</span>
        <div>
          <span className={styles.studentName}>{user.name}</span>
          <span className={styles.studentId}>{user.studentid}</span>
          <span className={styles.department}>{user.department}</span>
        </div>
      </div>
    </div>
  ))


  function traceInput(e) {
    setTypeContent(e.target.value)
  }

  function filterList(e) {
    setCurrentType(e.target.id)
  }

  const rankingContentFilter = (
    <>
      <div className="dropdown dropdown__rankingContainer">
        <div className="dropdown__selected">
          <span className="selected">{currentType}</span>
          <Icon size="large" name="caret down"/>
        </div>
        <ul className="dropdown__list">
          <li id="전체" className="dropdown__list__item" onClick={filterList}>전체</li>
          <li id="학번" className="dropdown__list__item" onClick={filterList}>학번</li>
        </ul>
      </div>
      <input type="text" className="filter__rankingContainer" placeholder="text me..." onChange={traceInput} />
    </>
  )

  return (
    <>
      {rankingContentFilter}
      <div className={styles.rankingContainer}>
      {/* <div className={styles.rankingContainer} onScroll={onScrollAction}> 인피니트 스크롤 적용시 */}
        {userRankingList}
      </div>
    </>
  )
};

export default RankingContent;