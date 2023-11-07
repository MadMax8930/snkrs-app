"use client";
import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './input.module.css';

const Input = ({ id, onChange, value, label, name, type, minLength }) => {
   const [invisiblePwd, setInvisiblePwd] = useState(true);
   const [showTooltip, setShowTooltip] = useState(false);

   const handleShowPassword = useCallback(() => { setInvisiblePwd((curr) => !curr) }, []);
   const inputType = !invisiblePwd ? 'text' : type || 'text';

   return (
      <div className="relative">
         <input type={inputType} onChange={onChange} placeholder=" "
              value={value} name={name} id={id} minLength={minLength}
              onFocus={() => setShowTooltip(true)} onBlur={() => setShowTooltip(false)}
              className="block rounded-md px-6 pt-6 pb-1 w-full text-base text-white
              bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"/>

         {type === 'password' && (
            <div className={styles.iconAndTooltipContainer}>
               <button type="button" onClick={handleShowPassword} className={styles.icon}>
                  {invisiblePwd
                     ? <FontAwesomeIcon icon={faEye} size="md" /> 
                     : <FontAwesomeIcon icon={faEyeSlash} size="md" /> 
                  }
               </button>
               {showTooltip && minLength ? (
                  <div className={styles.tooltip}>{`We recommend at least ${minLength} characters`}</div>
               ) : null}
            </div>
         )}

         <label htmlFor={id} 
              className="absolute text-base text-zinc-400 duration-150 transform -translate-y-3
              scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 
              peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
            {label}
         </label>
      </div>
   )
}

export default Input