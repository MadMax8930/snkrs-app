"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Notification, Toggler } from '@/components';
import styles from './copped.module.css';

const CoppedCard = ({ copItem, mutate }) => {
  const [sneaker, setSneaker] = useState(copItem);
 
  useEffect(() => {
     setSneaker(copItem);
  }, [copItem]);

  const handleRemoveSneaker = (sneakerId) => {
     setSneaker(item => item?._id === sneakerId && null);
     mutate();
  };

  if (!sneaker) { return null }

  return (
     <div className={styles.listItem} key={sneaker._id}>
         <Link href={`/sneakers/${sneaker._id}`}>
            <div className={styles.listDesc}>
               <span>{sneaker.brand} - {sneaker.model}</span>
               <span className={styles.move}>{sneaker.dateRelease}</span>
            </div>
            <div className={styles.listHeader}>{sneaker.name}</div>
            <div className={styles.listImage} style={{ backgroundImage: `url(${sneaker.img})`}} />
         </Link>     

         <div className={styles.notifAndToggler}>
            <Notification sneakerId={sneaker._id} />
            <div className={styles.move}>
               <Toggler 
                  cop={sneaker.copping} 
                  sneakerId={sneaker._id}
                  sneakerHasBeenUpdated={handleRemoveSneaker}
                  confirmation={true}
               />
            </div>  
         </div>
     </div>
  )
}

export default CoppedCard