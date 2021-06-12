import { useEffect, useState, useContext } from 'react'
import { authService, dbService } from '../src/fbase'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import UserObjContext from '../src/contextAPI/UserObjContext'
import Head from 'next/head'
import Footer from '../src/index/component/Footer'
import Top from '../src/index/component/Top'
import Main from '../src/index/component/Main'

const Home = () => {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useContext(UserObjContext)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        const docRef = dbService.collection('whole_users').doc(user.uid)
        docRef.get().then((doc) => {
          if(doc.exists) {
            setUserObj({
              ...userObj,
              name: doc.data().name,
              displayName: doc.data().displayName,
              uid: doc.data().uid,
              photoURL: doc.data().photoURL,
              joinedDate: doc.data().joined_date,
              introduce: doc.data().introduce
            })
          }
        })
      }
      setInit(true)
    })
  }, [])

  return (
    <>
    <Head>
      <title>Play. &</title>
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