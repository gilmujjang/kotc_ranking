import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import UserObjContext, { UserObjProvider } from '../src/contextAPI/UserObjContext'
import { useContext } from 'react'
// 글로벌 스타일을 여기에 임폴트

function MyApp({ Component, pageProps }) {
  const [userObj, setUserObj] = useContext(UserObjContext)
  return (
    <div id="main">
      <UserObjProvider value={userObj, setUserObj}>
        <Component {...pageProps} />
      </UserObjProvider>
    </div>
  )
}

export default MyApp