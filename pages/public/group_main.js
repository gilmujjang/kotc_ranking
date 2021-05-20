import { useContext, useEffect, useState } from 'react'
import { dbService } from '../../src/fbase'
import styles from '../../src/public/css/team_main.module.css'
import Nav from "../../src/public/component/Nav"
import Ranking from "../../src/public/component/Ranking"
import MemberList from "../../src/public/component/MemberList"
import Community from "../../src/public/component/Community"
import RecentGame from "../../src/public/component/RecentGame"
import UserObjContext from '../../src/contextAPI/UserObjContext'
// import Ad from "../../src/public/component/Ad"

const group_main = () => {
  const [content, setContent] = useState('ranking')
  const [allUsers, setAllUsers] = useState([]);
  const [allGame, setAllGame] = useState([]);
  const [userObj, setUserObj] = useContext(UserObjContext)
  
  useEffect(() => {
    dbService.collection
  })
  return (
    <p>hello</p>
  )
}

export default group_main