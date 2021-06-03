import { useEffect, useState } from 'react';
import MemberDetailModal from './MemberDetailModal';
import styles from '../css/MemberList.module.css'

const MemberList = ({ groupName, groupPlayers }) => {
  const groupPlayerList = groupPlayers.concat().sort(function(a, b) {a.name - b.name})
  const [mapList, setMapList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [playerDetailTarget, setPlayerDetailTarget] = useState({}) // 상세 정보 보여 줄 타겟 정보

  function showDetail(e) {
    const searchedTarget = searchPlayerFromGroupPlayers(e.target)

    setPlayerDetailTarget(searchedTarget)
    setIsModalOpen(true)
  }

  function searchPlayerFromGroupPlayers(target) {
    const searchedTarget = groupPlayers.find(player => player.name === target.dataset.name)
    return searchedTarget
  }

  const noMembers = (
    <div className={styles.no_members}>생성된 플레이어가 한 명도 없습니다.</div>
  )

  const memberListCard = mapList.map((player,index) => (
    <div className={styles.member_card} key={index}>
      <div className={styles.top}>
        {
        player.photoURL ? 
        <img src={player.photoURL} alt="player profile" /> :
        <img src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/68/d768b6caa2c0d23507bc12087bf171a8.jpeg" alt="default profile img" />       
        }
      </div>
      <div className={styles.mid}>
        <span className={styles.name}>{player.name}</span>
        <span className={styles.status}>{player.status}</span>
      </div>
      <div className={styles.bot}>
        <div className="button__index" onClick={showDetail} data-name={player.name}>Look Detail</div>
      </div>
    </div>
  ))

  function traceInput(e) {
    setFilterName(e.target.value)
  }

  useEffect(() => {
    if(filterName) {
      setMapList(groupPlayerList.filter(el => el.name.includes(filterName)))
    } else {
      setMapList(groupPlayerList)
    }
  }, [filterName])

  return (
    <>
      <input type="text" className="filter__memberList" placeholder="text name..." onChange={traceInput} />
      <div className={styles.allMembers}>
        {
          mapList.length === 0 ?
          noMembers :
          <div className={styles.memberList}>
            {memberListCard}
          </div>
        }
        <MemberDetailModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} groupName={groupName} playerDetailTarget={playerDetailTarget} setPlayerDetailTarget={setPlayerDetailTarget} groupPlayers={groupPlayers} />
      </div>
    </>
  )
};

export default MemberList