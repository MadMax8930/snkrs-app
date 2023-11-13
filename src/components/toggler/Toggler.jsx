"use client";
import React from 'react';
import useToggle from '@/hooks/useToggle';
import { toast } from 'react-hot-toast';
import styles from './toggler.module.css';

const Toggler = ({ cop, sneakerId, sneakerHasBeenUpdated }) => {
   const { toggle } = useToggle();

   const handleSwitcher = async () => {
      try {
        await toggle(sneakerId);
        await sneakerHasBeenUpdated(sneakerId);
        toast.success('Sneaker updated successfully');
      } catch (error) {
        console.error(`An error occurred updating the sneaker ${sneakerId}:`, error);
        toast.error('Error updating the sneaker');
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