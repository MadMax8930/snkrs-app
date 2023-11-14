import React from 'react';
import { Loader, CoppedCard } from '@/components';
import styles from './copped.module.css';

const CoppedSnkrs = ({ sneakers, isLoading }) => {
   if (isLoading) { return <Loader />; }
  return (
     <div className={styles.container}>
         <div className={styles.list}>
            {sneakers.map((sneaker) => (
               <CoppedCard copItem={sneaker} key={sneaker._id} />
            ))}
         </div>
     </div>
  );
};

export default CoppedSnkrs