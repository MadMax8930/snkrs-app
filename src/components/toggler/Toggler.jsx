import React from 'react';
import useToggle from '@/hooks/useToggle';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import styles from './toggler.module.css';

const Toggler = ({ cop, sneakerId, sneakerHasBeenUpdated, confirmation }) => {
   const router = useRouter();
   const { toggle } = useToggle();

   const handleSwitcher = async () => {
      try {
        if (confirmation) {
          const confirmed = window.confirm("Drop the sneaker? - all notifications set for it will be erased.");
          if (!confirmed) { return; }
        }
        await toggle(sneakerId);
        await sneakerHasBeenUpdated(sneakerId);
        toast.success('Sneaker updated successfully');
      } catch (error) {
        console.error(`An error occurred updating the sneaker ${sneakerId}:`, error);
        toast.error('You need to have an account');
        router.push('/auth?variant=register');
        return;
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