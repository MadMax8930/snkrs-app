import Link from 'next/link';
import Image from 'next/image';
import styles from './comment.module.css';

const NoComs = () => {
  return (
    <div className={`${styles.ncContainer} layer`}>
      <Link href="/" className={styles.ncLink}>
         <h1 className={styles.ncTitle}>No comments found</h1>
         <p className={styles.ncDescription}>Be the first one to share your thoughts.</p>
         <Image className={styles.ncImage} src="/pink.gif" width={100} height={100} alt="No Comment" />
      </Link>
    </div>
  )
}

export default NoComs