import { useEffect, useState, useContext } from 'react'
import { authService } from '../src/fbase'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import UserObjContext from '../src/contextAPI/UserObjContext'
import Head from 'next/head'
import Footer from '../src/index/component/Footer'
import Top from '../src/index/component/Top'
import Main from '../src/index/component/Main'

const Home = () => {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useContext(UserObjContext)

  // function getJoinedDate() {
  //   const today = new Date()

  //   const year = today.getFullYear()
  //   const month = today.getMonth() + 1
  //   const date = today.getDate()

  //   return `${year}${month}${date}`
  // }

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // 최초 로그인일 때만 생성하고 이미 가입 된 유저라면 fb에서 가져오도록 변경 해야 함.
      if(user) {
        setUserObj({
          ...userObj,
          name: user.displayName,
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          // joinedDate: getJoinedDate()
        })
      }
      //  else {
      //   authService.signInAnonymously()
      //   .catch((error) => {
      //     console.log(error.code)
      //     console.log(error.message)
      //   })
      // }
      setInit(true)
    })
  }, [])

  return (
    <>
    <Head>
      <title>index.js</title>
      <meta name="description" content="BBABBA의 홈입니다."></meta>
    </Head>
    {
    init ?
    <>
      <Top />
      <Main />
      <Footer />
    </>
    :
    <Segment className="loading">
      <Dimmer active>
        <Loader size="huge">Loading</Loader>
      </Dimmer>

      <Image src='/images/wireframe/short-paragraph.png' />
    </Segment>
    }
    </>
  )
}

export default Home