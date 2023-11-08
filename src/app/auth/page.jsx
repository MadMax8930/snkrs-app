"use client";
import axios from '../../../axios.config';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components';
import { toast } from 'react-hot-toast';
import styles from './auth.module.css';

const AuthPage = () => {
   const router = useRouter();
   const searchParams = useSearchParams()

   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [variant, setVariant] = useState('login');

   useEffect(() => {
      const urlParam = searchParams.get('variant');
      if (urlParam === 'register' || urlParam === 'login') {
         setVariant(String(urlParam));
      } else {
         setVariant('login');
         router.push(`/auth`)
      }
   }, [searchParams]);
   
   const toggleVariant = useCallback(() => { 
      const newVariant = variant === 'register' ? 'login' : 'register';
      setVariant(newVariant);
      router.push(`/auth?variant=${newVariant}`);
   }, [variant, router]);

   const login = useCallback(async () => {
      try {
         const response = await axios.post('/login', { email, password });
         const { token } = response.data;

         if (response.status === 200 && token) {
            localStorage.setItem('token', token);
            router.push(`/account`);
            toast.success("Logged in successfully!");
         } else if (response.status === 401) {
            toast.error("Invalid email or password. Please try again.");
         } else {
            toast.error("An error occurred. Please try again later.");
         }

      } catch (err) {
         console.log(err);
         toast.error("An error occurred. Please try again later.");
      }
   }, [email, password, router]);

   const register = useCallback(async () => {
      try {
         await axios.post('/register', { username, email, password });
         toast.success("User created successfully!")
         login();
      } catch (err) {
         console.log(err);
         toast.error("An error occurred. Please try again later.")
      }
   }, [username, email, password, login]);
   
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

export default AuthPage