import { useContext } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import UserObjContext from '../../contextAPI/UserObjContext'
import styles from '../css/UserInfoModal.module.css'

const UserInfoModal = ({ isModalOpen, setIsModalOpen }) => {
  const [userObj, setUserObj] = useContext(UserObjContext)
  const src = '/public/img/sample.jpg'

  return (
    <Modal onClose={() => setIsModalOpen(false)} open={isModalOpen} size="small">
      <Modal.Header>안녕하세요, {userObj.name}님?</Modal.Header>
      <Modal.Description className={styles.modal_description}>
        {/* 이미지 로드가 안됨 */}
        {/* <Image size='medium' src={src} wrapped /> */}
        <Header className={styles.top}>개인 정보 설정</Header>
        <div className={styles.bot}>
          <div className={styles.item}><span className={styles.label}>이&nbsp;&nbsp;름 : </span><input className="input__underline" placeholder="김페더러" /></div>
          <div className={styles.item}><span className={styles.label}>별&nbsp;&nbsp;명 : </span><input className="input__underline" placeholder="귀요미" /></div>
          <div className={styles.item}><span className={styles.label}>생년월일 : </span><input className="input__underline" placeholder="19850410" /></div>
          <div className={styles.item}><span className={styles.label}>자기소개 : </span><input className="input__underline" placeholder="테니스를 좋아하는 ~" /></div>
        </div>
      </Modal.Description>
      <Modal.Actions>
        <Button color='black' onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Yep, save this."
          labelPosition='right'
          icon='checkmark'
          onClick={() => setIsModalOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default UserInfoModal