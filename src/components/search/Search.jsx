"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { Loader } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './search.module.css';

const Search = ({ sneakers, isLoadingSearched }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const clearSearching = () => { 
    setSearchTerm(''); 
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleSearching = (prompt) => {
    const filteredSnkrsArr = sneakers.filter((sneaker) => {
       return (
         sneaker.name.toLowerCase().includes(prompt.toLowerCase()) ||
         sneaker.model.toLowerCase().includes(prompt.toLowerCase())
       );
    });
    
    setSearchTerm(prompt); // Update the search term immediately

    if (prompt === '') {
      setSearchResults([]);
      setIsSearching(false);
    } else {
      setSearchResults(filteredSnkrsArr);
      setIsSearching(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
         <input type="text" placeholder="Search sneaker" 
                value={searchTerm} 
                onChange={(e) => { 
                   setSearchTerm(e.target.value);
                   handleSearching(e.target.value);
                }}
         />
         {searchTerm ? (
           <button type="button" onClick={clearSearching}>
              <FontAwesomeIcon icon={faTimes} size="md" />
           </button>) : (
           <button type="button">
              <FontAwesomeIcon icon={faSearch} size="xs" />
           </button>
         )}
      </div>
      {isLoadingSearched 
         ? (<div className='pt-6 md:pt-12 text-base xl:text-md'>
               <Loader />
            </div>)
         : isSearching && searchResults.length > 0
         ? (<ul className={styles.results}>
              {searchResults.slice(0, 3).map((sneaker) => (
                 <li key={sneaker._id}>
                    <Link href={`/sneakers/${sneaker._id}`}>
                       <div className={styles.searchTermItem}>
                          <img src={sneaker.img} alt={`${sneaker.name} - ${sneaker.model}`} className={styles.searchTermImage} />    
                          <div className={styles.searchTermText}>
                              <span>{sneaker.name}</span>
                              <span>{sneaker.model}</span>
                          </div>
                       </div>
                    </Link>
                 </li>
              ))}
            </ul>)
         : isSearching && searchResults.length === 0
         ? (<p className='text-center text-gray pt-4 mb-2
               text-xs md:pt-5 md:text-lg lg:pt-7 lg:mb-2'>
              🙄 No sneakers found.
           </p>) 
         : null 
      }
      
    </div>
  )
}

export default Search