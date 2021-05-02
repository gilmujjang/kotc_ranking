import { useEffect, useState } from 'react'
import { authService } from '../src/fbase'
import Head from 'next/head'
import Footer from '../src/index/component/Footer'
import Header from '../src/index/component/Header'
import Main from '../src/index/component/Main'

const Home = () => {
  const user = authService.currentUser
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState({displayName: null})

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoUrl: user.photoURL
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
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default Home