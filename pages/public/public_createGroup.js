import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { dbService } from '../../src/fbase'
import styles from "../../src/public/css/public_createGroup.module.css"
import Top from "../../src/index/component/Top"
import Footer from "../../src/index/component/Footer"
import UserObjContext from '../../src/contextAPI/UserObjContext'
import { v4 as uuidv4 } from 'uuid'

const public_createGroup = () => {
  const router = useRouter()
  const [userObj, setUserObj] = useContext(UserObjContext)
  const [groupInfo, setGroupInfo] = useState({
    group_name: '',
    group_introduce: ''
  })

  const { group_name, group_introduce } = groupInfo

  function getInputChange(e) {
    const { name, value } = e.target
    setGroupInfo({
      ...groupInfo,
      [name]: value
    })
  }

  function getToday() {
    const today = new Date()
    const year = today.getFullYear()
    let month = today.getMonth() + 1
    let date = today.getDate()

    month = month >= 10 ? month : `0${month}`
    date = date >= 10 ? date : `0${date}`

    return Number(`${year}${month}${date}`)
  }

  function createGroup() {
    if(group_name.length === 0) {
      alert('그룹 이름을 입력 해주세요.')
    } else if(group_introduce.length === 0) {
      alert('그룹 소개를 입력 해주세요.')
    } else {
      dbService.collection(group_name).get().then((querySnapshot) => {
        if(querySnapshot.docs.length > 0) {
          // 해당 그룹명의 콜렉션이 이미 존재
          alert('해당 그룹명이 이미 존재합니다. ㅜㅜ')
        } else {
          // 해당 그룹명의 콜렉션이 없음.
          const id = uuidv4()
          try {
            dbService.collection(group_name).doc('group information').set(groupInfo)
            .then(() => {
              dbService.collection(group_name).doc('group information').set({
                created_date: getToday(),
                number_of_member: 1,
                id: id
              }, { merge: true})
            })
            .then(() => {
              dbService.collection(group_name).doc('group operators').collection('운영자 목록').doc(userObj.uid).set({
                operator_name: userObj.name,
                operator_displayName:userObj.displayName,
                operator_uid: userObj.uid
              })
            })
            .then(() => {
              dbService.collection(group_name).doc('group members').collection('멤버 목록').doc(userObj.uid).set({
                name: userObj.name,
                displayName: userObj.displayName,
                uid: userObj.uid,
                photoURL: userObj.photoURL,
                joined_date: userObj.joinedDate,
                rating: 1500,
                game_all, game_win, game_lose: 0,
                status: '이제 막 시작...!',
                introduce: userObj.introduce
              })
            })
            .then(() => {
              const docRef = dbService.collection('whole_users').doc(userObj.uid).collection('가입한 그룹').doc(group_name)
              docRef.set({
                group_name: group_name,
                group_introduce: group_introduce,
                isOperator: true,
                joined_date: getToday(),
                created_date: getToday(),
                number_of_member: 1
              }, { merge: true })
            })
            .then(() => {
              dbService.collection('whole_groups').doc(group_name).set({
                group_name: group_name,
                group_introduce: group_introduce,
                id: id
              })
            })
            .then(() => {
              alert('그룹 생성을 완료하였습니다!!')
              router.push('/')
            })
          } catch(error) {
            alert('그룹을 생성하는 데에 실패하였습니다. : ', error)
          }
        }
      })
    }
  }

  return (
    <>
      <Top />
      <div className={styles.createGroup}>
        <div className={classNames({["container"]: true, [styles.container__public_createGroup]: true})}>
          <h1 className={styles.title}>그룹 생성하기</h1>
          <div className={styles.createGroup__form}>
            <div className={styles.createGroup__name}>
              <span>그룹 이름 :&nbsp;</span><input type="text" name="group_name" className="input__text" onChange={getInputChange} value={group_name} />
            </div>
            <div className={styles.createGroup__introduce}>
              <span>그룹 소개 :&nbsp;</span><input type="text" name="group_introduce" className="input__text" onChange={getInputChange} value={group_introduce} />
            </div>
          </div>
          <div className={classNames({["button__index"]: true, [styles.button__public_createGroup]: true})} onClick={createGroup} >생성하기</div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default public_createGroup