import React from 'react';
import styles from './loading.module.css';

const LoaderGif = () => {
  return (
    <div className={styles.gifContainer}>
      <img className={styles.gifLoader} src="/graphic.gif" alt="Sneaker Gif" />
    </div>
  )
}

export default LoaderGif