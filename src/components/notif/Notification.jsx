import React from 'react';
import styles from './notification.module.css';

const Notification = () => {
  return (
    <div className={styles.notification}>
      Notification page:
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
    </div>
  )
}

export default Notification