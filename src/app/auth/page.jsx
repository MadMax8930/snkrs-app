"use client";
import axios from '@/hooks/fetcher';
import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components';
import { toast } from 'react-hot-toast';
import styles from './auth.module.css';

const Auth = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [variant, setVariant] = useState('login');
   const toggleVariant = useCallback(() => { setVariant((curr) => curr === 'login' ? 'register' : 'login') }, []);

   const login = useCallback(async () => {
      try {
         await axios.post('/login', { email, password });
         toast.success("Logged in successfully!")
      } catch (err) {
         console.log(err);
         toast.error("Sorry! Login has failed.");
      }
   }, [email, password]);

   const register = useCallback(async () => {
      try {
         await axios.post('/register', { username, email, password });
         toast.success("User created successfully!")
      } catch (err) {
         console.log(err);
         toast.error("Sorry! Registration has failed.");
      }
   }, [username, email, password]);
   
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
         <div className={styles.titleMain}><h2>{variant === 'login' ? 'Login' : 'Register'}</h2></div>
         <div className={styles.inputColumns}>
            {variant === 'register' && (
               <Input value={username} onChange={(e) => setUsername(e.target.value)} id="name" label="Username" /> )}
               <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" label="Email" />
               <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" label="Password" minLength={8}/>
         </div>
         <button className={styles.btnMain} onClick={variant === 'login' ? login : register}>
            {variant === 'login' ? 'Login' : 'Register'}
         </button>
         <p className={styles.variantBlock}>
            {variant === 'login' ? 'First time in here?' : 'Already have an account?'}
            <span onClick={toggleVariant} className={styles.variantBtn}>
               {variant === 'login' ? 'Create an account' : 'Login'}
            </span>
         </p>
      </div>
    </div>
  )
}

export default Auth