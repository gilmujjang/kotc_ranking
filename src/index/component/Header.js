import classNames from 'classnames'
import styles from '../css/Header.module.css'

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={classNames({["container__index"]: true, [styles.container__index__header]: true})}>
        <h1 className={styles.logo}>가즈아</h1>
        <ul>
          <li className="button__index">Sign in</li>
          <li className="button__index">Sign up</li>
        </ul>
      </div>
    </div>
  )
}