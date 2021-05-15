import { memo, useContext, useState } from 'react'
import classNames from 'classnames'
import { dbService } from '../../fbase'
import styles from '../css/PublicMyTeam.module.css'
import UserObjContext from '../../contextAPI/UserObjContext'

const MyTeam = () => {
  const [userObj, setUserObj] = useContext(UserObjContext)
  const [myTeamList, setMyTeamList] = useState([])
  dbService.collection('whole_users').doc(userObj.uid).collection('가입한 그룹').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    })
  })
//   const teamCard = 
//   console.log();

  return (
    <>
      <div className={styles.myTeam}>
        <div className={classNames({["container"]: true, [styles.container__myTeam]: true})}>
          test
        </div>
      </div>
    </>
  )
}

export default memo(MyTeam)