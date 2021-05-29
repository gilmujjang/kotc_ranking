import { memo, useState, useEffect, useContext } from 'react'
import { dbService } from '../../fbase'
import { Icon } from 'semantic-ui-react'
import classNames from 'classnames'
import styles from '../css/PublicMyTeam.module.css'
import UserObjContext from '../../contextAPI/UserObjContext'
import Link from 'next/link'

const MyTeam = () => {
  const [userObj, setUserObj] = useContext(UserObjContext)
  const [myTeamList, setMyTeamList] = useState([])
  const src = 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg'

  const myTeamCard = myTeamList.map((el, index) => 
    <div className={styles.team_card} key={index}>
      <div className={styles.team_image}>
        <img src={src} alt="team profile" />
        {el.isOperator === true ? <Link href={`/admin/${el.group_name}`}><a><Icon fitted className={styles.setting} name='setting' size='large' /></a></Link> : <></>}
      </div>
      <Link href={`/public/${el.group_name}`}><a><h1 className={styles.team_name}>{el.group_name}</h1></a></Link>
      <h2 className={styles.team_introduce}>{el.group_introduce}</h2>
      <ul className={styles.team_info}>
        <li className={styles.created_date}>
          <span className={styles.info_name}>그룹 생성일</span>
          <span className={styles.info_content}>{el.created_date}</span>
        </li>
        <li className={styles.joined_date}>
          <span className={styles.info_name}>그룹 가입일</span>
          <span className={styles.info_content}>{el.joined_date}</span>
        </li>
        <li className={styles.member_number}>
          <span className={styles.info_name}>그룹 멤버 수</span>
          <span className={styles.info_content}>{el.number_of_member}</span>
        </li>
      </ul>
    </div>
  )

  useEffect(() => {
    dbService.collection('whole_users').doc(userObj.uid).collection('joined_group').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setMyTeamList(myTeamList => [...myTeamList, {
          group_name: doc.data().group_name,
          group_introduce: doc.data().group_introduce,
          isOperator: doc.data().isOperator,
          joined_date: doc.data().joined_date,
          created_date: doc.data().created_date,
          number_of_member: doc.data().number_of_member
         }]
        )
      })
    })
  }, [userObj])

  return (
    <>
      <div className={styles.myTeam}>
        <div className={classNames({["container"]: true, [styles.container__myTeam]: true})}>
          <h1>가입한 그룹</h1>
          <div className={styles.teams}>
            {myTeamCard}
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(MyTeam)