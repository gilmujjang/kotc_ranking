import { memo } from "react";
import styles from "../css/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      &copy; 2021, Built by gilmujjang & Hyeon-Gwang with Next.js
    </div>
  );
};

export default memo(Footer);
