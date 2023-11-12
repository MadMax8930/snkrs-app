"use client";
import React, { useState } from 'react';
import useToggle from '@/hooks/useToggle';
import styles from './toggler.module.css';

const Toggler = ({ switcher, sneakerId }) => {
   const { mutate, isLoading: isLoadingUpdate } = useToggle(sneakerId);
   const [cop, setCop] = useState(switcher);
   const handleSwitcher = () => {
      if (!isLoadingUpdate) {
         const newLocalCop = !cop;
         setCop(newLocalCop);
         mutate(newLocalCop);
      }
   };
  return (
    <div className={styles.toggler} onClick={handleSwitcher}
         style={
            cop 
            ? 
            { borderColor: "#53c28b" } 
            : 
            { borderColor: "#c72c2c" }}>
      <div className={styles.choice}>{cop ? "+COP" : ""}</div>
      <div className={styles.choice}>{!cop ? "DROP" : ""}</div>
      <div className={styles.copBall} 
           style={
            cop 
            ? 
            { right: "2px", backgroundColor: "#53c28b" } 
            : 
            { left: "2px", backgroundColor: "#c72c2c" }}>
      </div>
    </div>
  )
}

export default Toggler