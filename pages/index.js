import { useEffect, useState } from 'react'
import { authService } from '../src/fbase'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import Head from 'next/head'
import Footer from '../src/index/component/Footer'
import Header from '../src/index/component/Header'
import Main from '../src/index/component/Main'

const Home = () => {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState({})

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          ...userObj,
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL
        })
      } else {
        authService.signInAnonymously()
        .catch((error) => {
          console.log(error.code)
          console.log(error.message)
        })
      }
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
      <Header userObj={userObj} />
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