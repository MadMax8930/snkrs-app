"use client";
import React, { useState } from 'react';
import styles from './search.module.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const clear = () => { setQuery(''); }
  return (
    <div className={styles.container}>
         <input type="text" placeholder="Search sneaker" 
               value={query} onChange={(e) => setQuery(e.target.value)}
         />
         {query && (
            <button type="button" onClick={clear}>X</button>
         )}
    </div>
  )
}

export default Search