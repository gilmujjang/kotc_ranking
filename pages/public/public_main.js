import Link from 'next/link'
import styles from '../../src/public/css/public_main.module.css'

const public_main = () => {
  return (
    <>
      <div className={styles.header}>
        <div className="button">로그아웃</div>
        <div className="button"><Link href="/"><a>홈으로</a></Link></div>
      </div>
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
        </div>
      </div>
      <div className={styles.sample}>
        <div className={styles.create_team}>팀 생성하기</div>
        <div className={styles.join_team}>팀 가입하기</div>
      </div>
    </>
  )
}

export default public_main