import classNames from 'classnames'
import styles from '../css/PublicMyTeam.module.css'

const MyTeam = () => {
//   const teamCard = 

  return (
    <>
      <div className={styles.myTeam}>
        <div className={classNames({["container"]: true, [styles.container__myTeam]: true})}>
          test
        </div>
      </div>
    </>
  )
}

export default MyTeam