"use client";
import React, { useState } from 'react';
import { faDollar, faEnvelope, faHome, faArrowRightFromBracket, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DarkMode, NavItem } from '@/components';
import styles from './navbar.module.css';

const Navbar = () => {
   const [hamburgerOpen, setHamburgerOpen] = useState(false);
   const toggleHamburgerMenu = () => { setHamburgerOpen(!hamburgerOpen) };
   const closeHamburgerMenu = () => { setHamburgerOpen(false) };
   
  return ( 
    <header className={styles.header}>
      <div className={styles.container}>
         <div className={styles.logoContainer}>
            <h1 className={styles.logo}>Max{" "}<span>Sneakers</span></h1>
            <DarkMode />
         </div>
         <button className={`${styles.menuToggle} ${hamburgerOpen ? `${styles.open}` : ""}`} role="button" onClick={toggleHamburgerMenu}>
            <div className={styles.hamburger}></div>
         </button> 
         <nav className={`${styles.nav} ${hamburgerOpen ? `${styles.navOpen}` : `${styles.navClosed}`}`}>
            <ul>    
               <li><NavItem redirect="account" icon={faHome} text="My Account" onRedirect={closeHamburgerMenu} /></li> 
               <li><NavItem redirect="discuss" icon={faPenToSquare} text="Sneakerheads" onRedirect={closeHamburgerMenu} /></li>
               <li><NavItem redirect="profit" icon={faDollar} text="Profitable Kicks" onRedirect={closeHamburgerMenu} /></li>
               <li><NavItem redirect="contact" icon={faEnvelope} text="Contact Admin" onRedirect={closeHamburgerMenu} /></li>
               <li><NavItem redirect="/" icon={faArrowRightFromBracket} text="Session Logout" onRedirect={closeHamburgerMenu} /></li>
            </ul>
         </nav>
      </div>
    </header>
  )
}

export default Navbar