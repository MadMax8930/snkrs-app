import React from 'react';
import styles from './copped.module.css';

const CoppedSnkrs = ({ sneakersCopped, isLoadingCopped }) => {
  return (
    <div className={styles.container}>
      <div>
         {sneakersCopped.map(sneaker => (
            <p key={sneaker._id}>{sneaker.name} {sneaker.model}</p>
         ))}
      </div>
    </div>
  )
}

export default CoppedSnkrs