import { memo, useContext, useEffect, useState } from 'react'
import { authService, dbService, firebaseInstance } from '../../fbase'
import Link from 'next/link'
import classNames from 'classnames'
import { Icon } from 'semantic-ui-react'
import styles from '../css/Top.module.css'
import UserObjContext from '../../contextAPI/UserObjContext'
import UserInfoModal from './UserInfoModal'

const Top = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userObj, setUserObj] = useContext(UserObjContext)
  
  function getJoinedDate() {
    const today = new Date()
    const year = today.getFullYear()
    let month = today.getMonth() + 1
    let date = today.getDate()

    month = month >= 10 ? month : `0${month}`
    date = date >= 10 ? date : `0${date}`

    return Number(`${year}${month}${date}`)
  }

  const onGoogleSignIn = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider).then((result) => {
      const docRef = dbService.collection('whole_users').doc(result.user.uid)

      docRef.get().then((doc) => {
        if(!doc.exists) {
          // whole_users에 해당 uid의 문서가 없을 경우
          docRef.set({
            name: result.user.displayName,
            displayName: result.user.displayName,
            uid: result.user.uid,
            photoURL: result.user.photoURL,
            joined_date: getJoinedDate()
          })
          .catch((error) => {alert("whole_users에 문서를 추가하는데에 실패하였습니다. : ", error)})
        }
      })
    }).then(() => {
      setIsSignedIn(true)
    })
  };
  
  const onGoogleSignOut = () => {
    authService.signOut().then(() => {
      // sign-out successful.
      setUserObj({})
      setIsSignedIn(false)
    }).catch((error) => {
      console.log(error.code)
      console.log(error.message)
    })
  }


  useEffect(() => {
    if(Object.keys(userObj).length === 0) {setIsSignedIn(false)}
    else if(Object.keys(userObj).length !== 0) {setIsSignedIn(true)}
  }, [userObj])

  return (
    <>
    <div className={styles.header}>
      <div className={classNames({["container"]: true, [styles.container__index__header]: true})}>
        <h1 className={styles.logo}><Link href="/"><a>가즈아</a></Link></h1>
        {
        isSignedIn ?
        <ul>
          <li><img src={userObj.photoURL} alt="user profile" /></li>
          <li className={styles.name}>{userObj.displayName} 님,</li>
          <li><Icon name="setting" size="large" className={styles.icon__setting} onClick={() => {setIsModalOpen(true)}} /></li>
          <li className="button__index" onClick={onGoogleSignOut}>Sign out</li>
        </ul>
        :
        <ul>
          <li className="button__index" onClick={onGoogleSignIn}>Sign in with Google</li>
        </ul>
        }
      </div>
    </div>
    <UserInfoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default memo(Top)