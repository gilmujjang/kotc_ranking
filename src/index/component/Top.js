import { useContext, useEffect, useState } from 'react'
import { authService, firebaseInstance } from '../../fbase'
import Link from 'next/link'
import classNames from 'classnames'
import { Icon, Button, Header, Image, Modal } from 'semantic-ui-react'
import styles from '../css/Top.module.css'
import UserObjContext from '../../contextAPI/UserObjContext'

const Top = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userObj, setUserObj] = useContext(UserObjContext)

  const onGoogleSignIn = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);

    setIsSignedIn(true)
  };
  
  const onGoogleSignOut = () => {
    authService.signOut().then(() => {
      // sign-out successful.
      setUserObj({})
      setIsSignedIn(false)
      console.log(userObj)
    }).catch((error) => {
      // An error happended.
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
    <Modal onClose={() => setIsModalOpen(false)} open={isModalOpen} size="small">
      <Modal.Header>안녕하세요, {userObj.name}님?</Modal.Header>
      <Modal.Description>
        <Header>개인 정보 설정</Header>
        <p>빠라 빠빠빠~</p>
      </Modal.Description>
      <Modal.Actions>
        <Button>꺼져</Button>
        <Button>드루와~</Button>
      </Modal.Actions>
    </Modal>
    </>
  )
}

export default Top