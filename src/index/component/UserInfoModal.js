import { useState, useContext, useRef, useEffect } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import UserObjContext from '../../contextAPI/UserObjContext'
import { dbService, storageService } from '../../fbase'
import styles from '../css/UserInfoModal.module.css'

const UserInfoModal = ({ isModalOpen, setIsModalOpen }) => {
  const imageUploader = useRef()
  const [userObj, setUserObj] = useContext(UserObjContext)
  const [changedInfo, setChangedInfo] = useState({
    name: '',
    displayName: '',
    birthday: '',
    introduce: ''
  })
  const { name, displayName, birthday, introduce } = changedInfo
  
  function changePhotoURL(e) {
    const imageRef = e.target.files[0]
    const storageRef = storageService.ref().child(`user profile img/${imageRef.name}`)
    const docRef = dbService.collection('whole_users').doc(userObj.uid)
    
    if(imageRef) {
      storageRef.put(imageRef).then(() => {
        storageRef.getDownloadURL().then((url) => {
          docRef.set({
            photoURL: url
          }, { merge: true })
          .then(() => {alert('이미지를 변경하였습니다.')})
          .catch((error) => {alert('이미지 변경에 실패하였습니다. : ', error)})
        })
        .catch((error) => {alert('storage에서 이미지 url을 가져오는데 실패하였습니다. : '), error})
      })
      .catch((error) => {alert('storage에 이미지를 업로드 하는데 실패하였습니다. : '), error})
    }
  }

  function getInputChange(e) {
    const { name, value } = e.target
    if(name === 'birthday') {
      setChangedInfo({
        ...changedInfo,
        [name]: Number(value)
      })
    } else {
      setChangedInfo({
        ...changedInfo,
        [name]: value
      })
    }
  }

  function saveUserInfo() {
    const docRef = dbService.collection('whole_users').doc(userObj.uid)
    docRef.set(changedInfo, { merge: true })
    .then(() => {alert('수정이 완료되었습니다.')})
    .catch((error) => {alert('수정에 실패하였습니다 : ', error)})
    .then(() => {setIsModalOpen(false)})
  }

  return (
    <Modal onClose={() => setIsModalOpen(false)} open={isModalOpen} size="small">
      <Modal.Header>안녕하세요, {userObj.name}님?</Modal.Header>
      <Modal.Description className={styles.modal_description}>
        <div className={styles.left}>
          <Image className={styles.left__img} size='medium' src={userObj.photoURL} wrapped />
          <input style={{display: 'none'}} type="file" ref={imageUploader} onChange={changePhotoURL} />
          <div className="button__index" onClick={() => {imageUploader.current.click()}}>사진 업로드</div>
        </div>
        <div className={styles.right}>
          <Header className={styles.right__top}>개인 정보 설정</Header>
          <div className={styles.right__bot}>
            <div className={styles.item}><span className={styles.label}>이&nbsp;&nbsp;&nbsp;&nbsp;름 : </span><input name="name" value={name} className="input__underline" placeholder="가나다" onChange={getInputChange} /></div>
            <div className={styles.item}><span className={styles.label}>별&nbsp;&nbsp;&nbsp;&nbsp;명 : </span><input name="displayName" value={displayName} className="input__underline" placeholder="다나가" onChange={getInputChange} /></div>
            <div className={styles.item}><span className={styles.label}>생년월일 : </span><input name="birthday" value={birthday} className="input__underline" placeholder="ex) 19950714" onChange={getInputChange} /></div>
            <div className={styles.item}><span className={styles.label}>자기소개 : </span><input name="introduce" value={introduce} className="input__underline" placeholder="안녕하세요?" onChange={getInputChange} /></div>
          </div>
        </div>
      </Modal.Description>
      <Modal.Actions>
        <Button color='black' onClick={() => setIsModalOpen(false)}>
          닫기
        </Button>
        <Button
          content="저장"
          labelPosition='right'
          icon='checkmark'
          onClick={saveUserInfo}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default UserInfoModal