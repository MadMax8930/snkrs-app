"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { sneakerDrops } from '../../../sneakers';
import { getBackgroundColor } from './circleColor';
import styles from './sneakers.module.css';

const FetchSnkrs = () => {
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

   useEffect(() => {
     // Add a mousemove event listener to track mouse position
     const handleMouseMove = (e) => { setMousePosition({ x: e.clientX, y: e.clientY }) };

     document.addEventListener('mousemove', handleMouseMove);

     // Clean up the event listener
     return () => { document.removeEventListener('mousemove', handleMouseMove) };
   }, []);

   if (!sneakerDrops || sneakerDrops.length === 0) { return <p>No sneakers found.</p> }

  return (
      <div className={styles.container}>
         <div className={styles.list}>
            {sneakerDrops.map((sneaker) => (
               <Link href={`/${sneaker.id}`} className={styles.listItem} key={sneaker.id}>

                  <div className={styles.listTopDesc}>
                     <div className={styles.descInfo}>
                        <p>{sneaker.brand}</p>
                        <p>{sneaker.model}</p>
                     </div>
                     <div className={styles.descDate}>{sneaker.date}</div>
                  </div>

                  <div className={styles.listMainHeader}>{sneaker.name}</div>

                  <div className={styles.listResellContainer}>      
                     <div className={styles.resell}>
                        <div className={styles.resellIndex}>
                           <div className={styles.resellCircle}
                                style={{ backgroundColor: getBackgroundColor(sneaker.resellIndex) }}
                           />
                           <span>{sneaker.resellIndex} resell</span>
                           <span>({sneaker.retailPrice === 'N/A' ? `${sneaker.retailPrice}` : `${sneaker.retailPrice}€`})</span>
                        </div>
                        <i>{sneaker.resellPrice}</i>
                     </div>
                     <div className={styles.toggler}>
                        {sneaker.copping}
                     </div>
                  </div>

                  <div className={styles.cursor}>
                     <div className={styles.cursorImage} 
                          style={{ backgroundImage: `url(${sneaker.img})`,
                                 // Set CSS var based on mouse position
                                 '--moveX': `${mousePosition.x}px`,
                                 '--moveY': `${mousePosition.y}px`, }}>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
     </div>
  );
};

export default FetchSnkrs


// export async function getServerSideProps() {
//    const filePath = path.join(process.cwd(), 'sneakers.json');
//    try {
//      const jsonContent = await fs.readFile(filePath, 'utf-8');
//      const sneakers = JSON.parse(jsonContent);
//      console.log(sneakers);
//      return {
//        props: { sneakers },
//      };
//    } catch (error) {
//      console.error('Error reading sneakers data:', error);
//      return {
//        props: { sneakers: [] },
//      };
//    }
   
// }
 