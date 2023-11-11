import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './navbar.module.css';

const NavItem = ({ redirect, icon, text, onRedirect }) => {
  return (
    <>
      <Link href={`${redirect}`} className={styles.navLink} onClick={onRedirect}>
         <FontAwesomeIcon icon={icon} className={styles.navIcon} />{text}
      </Link>
    </>
  )
}

export default NavItem