"use client";
import { withTokenCleanup } from '@/guards/withTokenCleanUp';
import styles from './auth.module.css';

function Layout({ children }) {
  return (
    <div className={styles.wallpaper}>
      <div className={styles.hideHome}>
         {children}
      </div>
    </div>
  )
}

export default withTokenCleanup(Layout)