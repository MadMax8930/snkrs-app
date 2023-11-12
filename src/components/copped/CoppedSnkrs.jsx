import React from 'react';
import useUserCopped from '@/hooks/useUserCopped';
import styles from './copped.module.css';

const CoppedSnkrs = ({ sneakersCopped, isLoadingCopped }) => {
 
  return (
    <div className={styles.container}>
      <div>
         {sneakersCopped.map(sneaker => (
            <p>{sneaker.name} {sneaker.model}</p>
         ))}
      </div>
    </div>
  )
}

export default CoppedSnkrs