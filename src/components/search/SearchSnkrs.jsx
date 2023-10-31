"use client";
import React, { useState } from 'react'
import styles from './search.module.css';

const SearchSnkrs = () => {
   const [query, setQuery] = useState('');
   const clear = () => { setQuery(''); }
  return (
    <div className={styles.container}>
     <div className={styles.wrapper}>
      
         <div  className={styles.filterContainer}>
            <div className={styles.filter1}>Resell</div>
            <div className={styles.filter2}>Brand</div>
            <div className={styles.filter3}>Date</div>
         </div>

         <div className={styles.searchContainer}>
            <input type="text" placeholder="Search model" 
                  value={query} onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
               <button type="button" onClick={clear}>X</button>
            )}
         </div>

      </div>
    </div>
  )
}

export default SearchSnkrs