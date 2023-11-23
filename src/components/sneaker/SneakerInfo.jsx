import React from 'react';
import styles from './sneaker.module.css';

const SneakerInfo = ({ sneaker }) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
         <p>{sneaker.name}</p>
         <p>{sneaker.brand}</p>
         <p>{sneaker.model}</p>
         <p>{sneaker.dateRelease}</p>
         <p>{JSON.stringify(sneaker.copping)}</p>
      </div>
      <div className={styles.info}>
         <img src={sneaker.img} alt="Sneaker Picture" />
         <p>{sneaker.coppers}</p>
         <p>{sneaker.retailPrice}</p>
         <p>{sneaker.resellIndex}</p>
         <p>{sneaker.resellPrice}</p>
      </div>
    </div>
  )
}

export default SneakerInfo