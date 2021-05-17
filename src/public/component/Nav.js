import Link from 'next/link';
import styles from '../css/Nav.module.css'

const Nav = ({ setContent }) => {
  const changeContent = e => {
    e.preventDefault();
    setContent(e.target.dataset.content)
  }

  return (
    <div className={styles.nav}>
      <ul>
        <li data-content="ranking" onClick={changeContent}>멤버 랭킹</li>
        <li data-content="member list" onClick={changeContent}>멤버 리스트</li>
        <li data-content="community" onClick={changeContent}>커뮤니티</li>
      </ul>
      <span className={styles.back}><Link href="/public/public_main"><a>선택 화면으로</a></Link></span>
      <footer>
          <p className="footer--top">&copy; 2021, Built by</p>
          <p className="footer--bot">gilmujjang & Hyeon-Gwang</p>
      </footer>
    </div>
  )
}

export default Nav