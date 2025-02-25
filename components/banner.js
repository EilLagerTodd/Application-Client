import Image from 'next/image';
import styles from '../styles/components/banner.module.scss';

export function BannerPopup({ title, content, img=null, label, onClose }) {
  return (
    <div className={styles.popupBackground}>
      <div className={styles.popupBox}>
        <div className={styles.closeBtn} onClick={onClose}>
          <Image src="/close.png" width={30} height={30} alt="close banner"/>
        </div>
        <div className={styles.popupTitle}>{title}</div>
        { img && <img src={img} height="50" object-fit="contain" alt="banner image" /> }
        <div className={styles.popupText}>{content}</div>
        <div className={styles.popupBtn}>
          <a target='_blank' href='https://swjungle.net/' rel='noreferrer'>{label}</a>
        </div>
      </div>
    </div>
  )
}

export function Banner({ title, content, img=null, label, onClose }) {
  return (
    <div className={styles.bannerBox}>
      <div className={styles.closeBannerBtn} onClick={onClose}>
        <Image src="/close.png" width={18} height={18} alt="close banner"/>
      </div>
      <div className={styles.bannerCol}>
        <div className={styles.bannerTitle}>{title}</div>
        <div className={styles.bannerText}>{content}</div>
      </div>
      { 
        img 
        && <a className={styles.imgBox} target='_blank' href='https://swjungle.net/' rel='noreferrer'>
            <img src={img} height="50" object-fit="contain" alt="banner image" /> 
          </a>
      }
    </div>
  )
}