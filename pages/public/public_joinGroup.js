import { useContext, useEffect, useState } from "react"
import UserObjContext from "../../src/contextAPI/UserObjContext"
import { dbService } from "../../src/fbase"
import classNames from 'classnames'
import Footer from "../../src/index/component/Footer"
import Top from "../../src/index/component/Top"
import styles from '../../src/public/css/public_joinGroup.module.css'

const public_joinGroup = () => {
  const [userObj, setUserObj] = useContext(UserObjContext)
  const [wholeGroups, setWholeGroups] = useState([])
  const [groupFilter, setGroupFilter] = useState('')
  const [mapGroupList, setMapGroupList] = useState([])

  console.log('전체 : ', wholeGroups);
  console.log('필터 : ', mapGroupList);
  const groupSmallCard = mapGroupList.map((el, index) => 
    <div className={styles.card} key={index}>
      <h1 className={styles.group_name}>{el.group_name}</h1>
      <h2 className={styles.group_introduce}>{el.group_introduce}</h2>
      <div>가입 신청</div>
    </div>
  )

  function traceInputChange(e) {
    setGroupFilter(e.target.value)
  }

  useEffect(() => {
    dbService.collection('whole_groups').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setWholeGroups(wholeGroups => [...wholeGroups, {
          group_name: doc.data().group_name,
          group_introduce: doc.data().group_introduce,
          id: doc.data().id
        }])
      })
    })
  }, [])

  useEffect(() => {
    if(groupFilter) {
      setMapGroupList(wholeGroups.filter(el => el.group_name === groupFilter))
    } else {
      setMapGroupList([])
    }
  }, [groupFilter])

  return (
    <>
      <Top />
      <div className={styles.joinGroup}>
        <div className={classNames({["container"]: true, [styles.container__public_joinGroup]: true})}>
          <input type="text" onChange={traceInputChange} value={groupFilter} placeholder="원하는 그룹명을 입력하세요." />
          <div className={styles.groupSmallCardContainer}>
            {groupSmallCard}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default public_joinGroup