import React from 'react';
import Link from 'next/link';
import { getCircleColor } from '../sneakers/circleColor';
import { Toggler } from '@/components';
import styles from './copped.module.css';

const CoppedCard = ({ sneaker }) => {
  const handleUpdatedSneaker = () => {}
  return (
     <div className={styles.listItem} key={sneaker._id}>
         <Link href={`/${sneaker._id}`}>
            <div className={styles.listDesc}>
               <span>{sneaker.brand} - {sneaker.model}</span>
               <span className={styles.move}>{sneaker.dateRelease}</span>
            </div>
            <div className={styles.listHeader}>{sneaker.name}</div>
            <div className={styles.listImage} style={{ backgroundImage: `url(${sneaker.img})`}} />
         </Link>     

         <div className={styles.listResell}>
            <Link href={`/${sneaker._id}`} className={styles.resell}>    
               <div className={styles.circle} style={{ backgroundColor: getCircleColor(sneaker.resellIndex) }} />
               <span>{sneaker.resellIndex} resell</span>
               <span>({sneaker.retailPrice === 'N/A' ? `${sneaker.retailPrice}` : `${sneaker.retailPrice}€`})</span>
               <i>{sneaker.resellPrice}</i>
            </Link>
            <div className={styles.move}>
               <Toggler 
                  cop={sneaker.copping} 
                  sneakerId={sneaker._id}
                  sneakerHasBeenUpdated={handleUpdatedSneaker}
               />
            </div>  
         </div>
     </div>
  )
}

export default CoppedCard