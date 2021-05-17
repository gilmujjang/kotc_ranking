import Link from 'next/link'
import classNames from 'classnames'
import Footer from '../../src/index/component/Footer'
import Top from '../../src/index/component/Top'
import MyTeam from '../../src/public/component/PublicMyTeam'
import styles from '../../src/public/css/public_main.module.css'

const public_main = () => {

  return (
    <>
      <Top />
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
      <MyTeam />
      <div className={styles.newTeam}>
        <div className={classNames({["container"]: true, [styles.container__public_newTeam]: true})}>
          <div className="button__index"><Link href="/public/public_createGroup"><a>그룹 생성하기</a></Link></div>
          <div className="button__index">그룹 가입하기</div>
          {/* <div className="button__index"><Link href="/public/public_joinGroup"><a>그룹 가입하기</a></Link></div> */}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default public_main