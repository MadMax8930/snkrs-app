import { FooterItem } from '@/components';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.copyright}>&copy;2023 Max Sneakers. All rights reserved.</div>
      <div className={styles.social}>
         <FooterItem src="/1.png" alt="Facebook" url={"https://www.facebook.com/therealrusskhof"} />
         <FooterItem src="/2.png" alt="Twitter" url={"https://twitter.com/Russkhof"} />
         <FooterItem src="/3.png" alt="Youtube" url={"https://www.youtube.com/@I2usskhofTV"} />
      </div>
    </div>
  )
}

export default Footer