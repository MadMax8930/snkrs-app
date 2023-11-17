import Image from 'next/image';
import Link from 'next/link';
import styles from './notfound.module.css';
import '@/app/globals.css';

const NotFound = () => {
  return (
    <div className="layer">
      <div className={styles.container}>
         <h1 className={styles.title}>404 - Not Found</h1>
         <p className={styles.description}>Sorry, the page you are looking for might be in another castle.</p>
         <Image className={styles.image} src="/404.png" width={100} height={100} alt="404 Not Found" />
         <Link href="/" className={styles.link}>Go back to the Home page</Link>
      </div>
    </div>
  )
}

export default NotFound