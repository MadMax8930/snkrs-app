"use client";
import React, { useState } from 'react';
import { faDollar, faEnvelope, faHome, faPen, faArrowRightFromBracket, faCircleInfo, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { NavItem } from './NavItem';
import styles from './navbar.module.css'

const Navbar = () => {

   const [hamburgerOpen, setHamburgerOpen] = useState(false);
   const toggleHamburgerMenu = () => { setHamburgerOpen(!hamburgerOpen) };
   const closeHamburgerMenu = () => { setHamburgerOpen(false) };
   
  return ( 
    <header className={styles.header}>
      <div className={styles.container}>
         <h1 className={styles.logo}>Sneakers<span>App</span></h1>
         <button className={`${styles.menuToggle} ${hamburgerOpen ? "open" : ""}`} role="button" onClick={toggleHamburgerMenu}>
            <div className={styles.hamburger}></div>
         </button> 
         <nav className={`${styles.nav} ${hamburgerOpen ? `${styles.navOpen}` : `${styles.navClosed}`}`}>
               {/* Unauthenticated */}
               <ul>    
                  <li><NavItem redirect="account" icon={faHome} text="My Account" onRedirect={closeHamburgerMenu} /></li> 
                  <li><NavItem redirect="discuss" icon={faPen} text="Sneakerheads" onRedirect={closeHamburgerMenu} /></li>
                  <li><NavItem redirect="profit" icon={faDollar} text="Cop or Drop" onRedirect={closeHamburgerMenu} /></li>
                  <li><NavItem redirect="contact" icon={faEnvelope} text="Contact Admin" onRedirect={closeHamburgerMenu} /></li>
               </ul>
               {/* Authenticated */}
               {/* <ul>
                  <li><a href="/account"><FontAwesomeIcon icon={faHome} className={styles.navIcon} />My account</a></li>  
                  <li><a href="/discuss"><FontAwesomeIcon icon={faPenToSquare} className={styles.navIcon} />Discussions</a></li>
                  <li><a href="/profit"><FontAwesomeIcon icon={faDollar} className={styles.navIcon} />Profitable Kicks</a></li>
                  <li><a href="/"><FontAwesomeIcon icon={faArrowRightFromBracket} className={styles.navIcon} />Session Logout</a></li>     
               </ul>  */}
         </nav>
      </div>
    </header>
  )
}

export default Navbar