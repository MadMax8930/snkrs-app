"use client";
import React, { useState, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { faHome, faArrowRightFromBracket, faUserShield, faHomeUser, faPeopleGroup, faEnvelope, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { DarkMode, NavItem } from '@/components';
import styles from './navbar.module.css';

const Navbar = () => {
   const [hamburgerOpen, setHamburgerOpen] = useState(false);
   const toggleHamburgerMenu = () => { setHamburgerOpen(!hamburgerOpen) };
   const closeHamburgerMenu = () => { setHamburgerOpen(false) };

   const { user, clearUser } = useContext(UserContext);
   const logoutAndCloseHamburgerMenu = () => { clearUser(() => { setHamburgerOpen(false) }) };
  
  return ( 
    <header className={styles.header}>
      <div className={styles.container}>
         <div className={styles.logoContainer}>
            <h1 className={styles.logo}>Max Sneakers</h1>
            <DarkMode />
         </div>
         <button className={`${styles.menuToggle} ${hamburgerOpen ? `${styles.open}` : ""}`} role="button" onClick={toggleHamburgerMenu}>
            <div className={styles.hamburger}></div>
         </button> 
         <nav className={`${styles.nav} ${hamburgerOpen ? `${styles.navOpen}` : `${styles.navClosed}`}`}>
            {user._id ?
               <ul>
                  <li><NavItem redirect="/" icon={faUserCog} text="Cop Sneakers" onRedirect={closeHamburgerMenu} /></li>    
                  <li><NavItem redirect="/account" icon={faUserShield} text="User Account" onRedirect={closeHamburgerMenu} /></li> 
                  <li><NavItem redirect="/account/blog" icon={faPeopleGroup} text="Our Community" onRedirect={closeHamburgerMenu} /></li>
                  <li><NavItem redirect="/" icon={faArrowRightFromBracket} text="Session Logout" onRedirect={logoutAndCloseHamburgerMenu} /></li>
               </ul> :
               <ul>
                  <li><NavItem redirect="/auth?variant=register" icon={faHome} text="Register" onRedirect={closeHamburgerMenu} /></li>
                  <li><NavItem redirect="/auth?variant=login" icon={faHomeUser} text="Login User" onRedirect={closeHamburgerMenu} /></li> 
                  <li><NavItem redirect="/contact" icon={faEnvelope} text="Contact Us" onRedirect={closeHamburgerMenu} /></li> 
                  <li><NavItem redirect="/" icon={faArrowRightFromBracket} text="Back Home" onRedirect={closeHamburgerMenu} /></li>
               </ul>
            }
         </nav>
      </div>
    </header>
  )
}

export default Navbar