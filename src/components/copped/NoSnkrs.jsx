import Link from 'next/link';
import Image from 'next/image';
import styles from './copped.module.css';

const NoSnkrs = () => {
  return (
    <div className={`${styles.nsContainer} layer`}>
      <Link href="/" className={styles.nsLink}>
         <h1 className={styles.nsTitle}>No sneakers found</h1>
         <p className={styles.nsDescription}>You have not copped any sneakers yet.</p>
         <Image className={styles.nsImage} src="/snkrs.png" width={100} height={100} alt="No Copped Sneakers" />
      </Link>
    </div>
  )
}

export default NoSnkrs