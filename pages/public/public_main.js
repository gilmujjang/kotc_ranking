import Link from 'next/link'
import Footer from '../../src/index/component/Footer'
import Header from '../../src/index/component/Header'
import styles from '../../src/public/css/public_main.module.css'

const public_main = () => {

  return (
    <>
      <Header />
      <div className={styles.myTeams}>
        <h3>가입한 팀</h3>
        <div className={styles.myTeam}>
          <Link href="/public/team_main">
            <a>
              <h1>KOTC! ^^</h1>
              <h2>얄랄라뽕따이~</h2>
              <p>ㅎㅎ 안녕하세용~</p>
              <p>ㅎㅎ 안녕하세용~</p>
            </a>
          </Link>
          <Link href="/public/admin_main">
            <a>
              <h2>어드민</h2>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.sample}>
        <div className={styles.create_team}><Link href="/public/public_createGroup"><a>팀 생성하기</a></Link></div>
        <div className={styles.join_team}>팀 가입하기</div>
      </div>
      <Footer />
    </>
  )
}

export default public_main