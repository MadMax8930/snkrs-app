import React, { useEffect } from 'react';
import { Loader, CoppedCard, NoSnkrs } from '@/components';
import styles from './copped.module.css';

const CoppedSnkrs = ({ sneakers, isLoading, mutate }) => {
   if (isLoading) { return <Loader />; }
   if (!sneakers || sneakers.length === 0) { return <NoSnkrs />; }

   useEffect(() => {
      if (sneakers.length === 0 && typeof mutate === 'function') {
        mutate();
      }
    }, [sneakers, mutate]);
   
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