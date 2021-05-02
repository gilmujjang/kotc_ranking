import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
// bootstrap 등 과 같은 글로벌 스타일을 위해서 여기에 임폴트 하세요.

function MyApp({ Component, pageProps}) {
  return (
    <div id="main">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp