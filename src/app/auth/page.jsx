"use client";
import axios from '@/hooks/fetcher';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import styles from './auth.module.css';

const Auth = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [variant, setVariant] = useState('login');

   const toggleVariant = useCallback(() => {
      setVariant((curr) => curr === 'login' ? 'register' : 'login')
   }, []);

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

    </div>
  )
}

export default Auth