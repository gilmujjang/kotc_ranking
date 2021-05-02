import Link from 'next/link'
import { Icon } from 'semantic-ui-react'
import styles from '../css/Main.module.css'

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.greeting}>
        <h1>넥스트의 세계에 오신걸 환영합니다.</h1>
        <h2>넥스트 ^^^^ 빡치네</h2>
        <h3>자~ 드가자~ <Icon fitted name="paper plane" /></h3>
      </div>
      <button type="button"><Link href="/public/public_main"><a>환장의 나라로~</a></Link></button>
    </div>
  )
}

export default Main