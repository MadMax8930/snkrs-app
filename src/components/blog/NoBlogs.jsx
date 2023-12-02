import Link from 'next/link';
import Image from 'next/image';
import styles from './blog.module.css';

const NoBlogs = () => {
  return (
    <div className={`${styles.nbContainer} layer`}>
      <Link href="/" className={styles.nbLink}>
         <h1 className={styles.nbTitle}>No conversations found</h1>
         <p className={styles.nbDescription}>Leave your thoughts on sneakers, get some feedback.</p>
         <Image className={styles.nbImage} src="/pink.gif" width={100} height={100} alt="No Blog" />
      </Link>
    </div>
  )
}

export default NoBlogs