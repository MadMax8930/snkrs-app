"use client";
import React, { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import styles from './darkmode.module.css';

const DarkMode = () => {
   const { toggle, mode } = useContext(ThemeContext);

  return (
    <div className={styles.container} onClick={toggle}>
      <div className={styles.iconMoon}>🌙</div>
      <div className={styles.iconSun}>🔆</div>
      <div className={styles.ball} style={mode === "light" ? { left: "2px" } : { right: "2px" }} />
    </div>
  )
}

export default DarkMode