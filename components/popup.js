import CountUp from 'react-countup';
import styles from '../styles/components/popup.module.css';

export default function Popup({ title, content, label, onClick }) {
  return (
    <div className={styles.popupBackground} onClick={onClick}>
      <div className={styles.popupBox}>
        <div className={styles.popupTitle}>{title}</div>
        <div className={styles.popupText}>
          {/* <CountUp start={9256} end={506} duration={7} /> */}
          {content}
        </div>
        <div className={styles.popupBtn} onClick={onClick}>{label}</div>
      </div>
    </div>
  )
}