import React from 'react';
import styles from './sneaker.module.css';

const SneakerInfo = ({ sneaker }) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
         <p>{sneaker._id}</p>
         <p>{sneaker.brand}</p>
         <p>{sneaker.model}</p>
         <p>{JSON.stringify(sneaker.copping)}</p>
      </div>
      <div className={styles.info}>
         <p>{sneaker._id}</p>
         <p>{sneaker.brand}</p>
         <p>{sneaker.model}</p>
         <p>{JSON.stringify(sneaker.copping)}</p>
      </div>
    </div>
  )
}

export default SneakerInfo