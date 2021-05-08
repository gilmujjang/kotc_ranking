import classNames from 'classnames'
import styles from "../../src/public/css/public_createGroup.module.css"
import Footer from "../../src/index/component/Footer"
import Header from "../../src/index/component/Header"

const public_createGroup = () => {
  return (
    <>
      <Header />
      <div className={styles.createGroup}>
        <div className={classNames({["container"]: true, [styles.container__public_createGroup]: true})}>
          <h1 className={styles.title}>그룹 생성하기</h1>
          <div className={styles.createGroup__form}>
            <div className={styles.createGroup__name}>
                <span>그룹 이름 :&nbsp;</span><input type="text" name="group_name" className="input__text" />
            </div>
            <div className={styles.createGroup__introduce}>
                <span>그룹 소개 :&nbsp;</span><input type="text" name="group_introduce" className="input__text" />
            </div>
          </div>
          <div className={classNames({["button__index"]: true, [styles.button__public_createGroup]: true})}>생성하기</div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default public_createGroup