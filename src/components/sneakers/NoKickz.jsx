import Image from 'next/image';
import styles from './sneakers.module.css';

const NoKickz = () => {
  return (
    <div className={styles.nkContainer}>
      <p className={styles.nkDescription}>😟 No sneakers found.</p>
      <Image className={styles.nkImage} src="/sad-face.png" width={100} height={100} alt="No Sneakers Found" />
    </div>
  )
}

export default NoKickz