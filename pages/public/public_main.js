import Link from 'next/link'
import Footer from '../../src/index/component/Footer'
import Top from '../../src/index/component/Top'
import MyTeam from '../../src/public/component/PublicMyTeam'
import styles from '../../src/public/css/public_main.module.css'

const public_main = () => {

  return (
    <>
      <Top />
      <MyTeam />
      <div className={styles.sample}>
        <div className={styles.create_team}><Link href="/public/public_createGroup"><a>팀 생성하기</a></Link></div>
        <div className={styles.join_team}>팀 가입하기</div>
      </div>
      <Footer />
    </>
  )
}

export default public_main