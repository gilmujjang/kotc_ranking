import classNames from 'classnames'
import Link from 'next/link'
import styles from '../css/Main.module.css'

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={classNames({["container"]: true, [styles.container__index__main]: true})}>
        <div className={styles.main__section}>
          <div className={styles.greeting}>
            <h1>'가즈아'는 온라인 모임 공간을 찾던 테니스 동호인들을 위한 새로운 정답이 될&nbsp;것입니다.</h1>
            <h2>'가즈아'와 함께 실력을 쌓아가고 새로운 만남을 이어나가세요.</h2>
          </div>
          <div className={classNames({["button__index"]: true, [styles.button__index__main]: true})}><Link href="/public/public_main"><a>Get Started</a></Link></div>
        </div>
        <div className={styles.main__section}>
          <div className={styles.introduce}>
            <div className={styles.introduce__board}>
              <h1 className={styles.introduce__title}>게시판</h1>
              <p className={styles.introduce__expression}>그룹원들에게 중요한 사항을 전달하세요.</p>
              {/* 버튼 추가 혹은 버튼 없이 */}
            </div>
            <div className={styles.introduce__chat}>
              <h1 className={styles.introduce__title}>대화</h1>
              <p className={styles.introduce__expression}>그룹원들과 실시간 대화를 나누세요.</p>
              {/* 버튼 추가 혹은 버튼 없이 */}
            </div>
            <div className={styles.introduce__memory}>
              <h1 className={styles.introduce__title}>추억</h1>
              <p className={styles.introduce__expression}>그룹의 추억을 공유하고 남기세요.</p>
              {/* 버튼 추가 혹은 버튼 없이 */}
            </div>
            <div className={styles.introduce__ranking}>
              <h1 className={styles.introduce__title}>랭킹</h1>
              <p className={styles.introduce__expression}>게임 결과를 기록하고 실시간 랭킹을 확인하세요.</p>
              {/* 버튼 추가 혹은 버튼 없이 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main