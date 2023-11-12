"use client";
import Link from 'next/link';
import React from 'react';
import { getCircleColor } from './circleColor';
import { Loader, Toggler } from '@/components';
import styles from './sneakers.module.css';

const Sneakers = ({ sneakerDropsFiltered, sneakerDrops, isLoadingFiltered, isLoadingPublic }) => {
   // Use filtered if available, otherwise use public
   const sneakersToRender = sneakerDropsFiltered || sneakerDrops;
   if (!sneakersToRender || sneakersToRender.length === 0) { return <p className="text-center">😟 No sneakers found.</p> }
   if (isLoadingFiltered || isLoadingPublic) { return <Loader /> }
   
  return (
      <div className={styles.container}>
         <div className={styles.list}>
            {sneakersToRender.map((sneaker) => (
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
                         <Toggler switcher={sneaker.copping} sneakerId={sneaker._id} />
                     </div>  
                  </div>

               </div>
            ))}
         </div>
     </div>
  );
};

export default Sneakers