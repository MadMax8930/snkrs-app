import Link from 'next/link';
import Image from 'next/image';
import styles from './footer.module.css';

const FooterItem = ({ url, src, alt }) => {
  return (
    <>
      <Link href={url} target='_blank'>
         <Image src={src} alt={alt} width={15} height={15} className={styles.icon} />
      </Link>
    </>
  )
}

export default FooterItem