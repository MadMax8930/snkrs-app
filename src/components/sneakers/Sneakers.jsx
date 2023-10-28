"use client";
import Link from 'next/link';
import { sneakerDrops } from '../../../sneakers';
import { getCircleColor } from './circleColor';
import { Toggler } from '@/components';
import styles from './sneakers.module.css';

const Sneakers = () => {    
   if (!sneakerDrops || sneakerDrops.length === 0) { return <p>No sneakers found.</p> }
  return (
      <div className={styles.container}>
         <div className={styles.list}>
            {sneakerDrops.map((sneaker) => (
               <div className={styles.listItem} key={sneaker.id}>

                  <Link href={`/${sneaker.id}`}>
                     <div className={styles.listDesc}>
                        <span>{sneaker.brand} - {sneaker.model}</span>
                        <span className={styles.move}>{sneaker.dateRelease}</span>
                     </div>
                     <div className={styles.listHeader}>{sneaker.name}</div>
                     <div className={styles.listImage} style={{ backgroundImage: `url(${sneaker.img})`}} />
                  </Link>     

                  <div className={styles.listResell}>
                     <Link href={`/${sneaker.id}`} className={styles.resell}>    
                        <div className={styles.circle} style={{ backgroundColor: getCircleColor(sneaker.resellIndex) }} />
                        <span>{sneaker.resellIndex} resell</span>
                        <span>({sneaker.retailPrice === 'N/A' ? `${sneaker.retailPrice}` : `${sneaker.retailPrice}€`})</span>
                        <i>{sneaker.resellPrice}</i>
                     </Link>
                     <div className={styles.move} >
                         <Toggler cop={sneaker.copping}/>
                     </div>  
                  </div>

               </div>
            ))}
         </div>
     </div>
  );
};

export default Sneakers