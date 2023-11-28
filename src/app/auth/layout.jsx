"use client";
import styles from './auth.module.css';
import { useCookies } from 'react-cookie';

function Layout({ children }) {
   const [cookies] = useCookies(['token']);
   console.log('Token Cookie auth:', cookies.token);
  return (
    <div className={styles.wallpaper}>
      <div className={styles.hideHome}>
         {children}
      </div>
    </div>
  )
}

export default Layout