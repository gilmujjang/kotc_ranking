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
      <MyTeam />
      <div className={styles.newTeam}>
        <div className={classNames({["container"]: true, [styles.container__public_newTeam]: true})}>
          <div className="button__index"><Link href="/public/public_createGroup"><a>그룹 생성하기</a></Link></div>
          <div className="button__index"><Link href="/public/public_joinGroup"><a>그룹 가입하기</a></Link></div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default public_main