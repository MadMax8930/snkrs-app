"use client";
import axios from '../../../axios.config';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import styles from './auth.module.css';

const AuthPage = () => {
   const router = useRouter();
   const searchParams = useSearchParams()

   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [variant, setVariant] = useState('login');

   const [cookies, setCookie] = useCookies(['token']);

   //    useEffect(() => {
   //     console.log('Value of 'token:', cookies.token);
   //     // Modifying the 'token' value
   //     setCookie('token', 'new-Value', { path: '/' });
   //   }, [cookies, setCookie]);

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
            setCookie('token', token, { path: '/' });
            router.push('/account');
            toast.success("Logged in successfully!");
         } else { throw new Error("Invalid email or password. Please try again."); }
      } catch (err) {
         toast.error("An unexpected error occurred.");
         console.log(err);
      }
   }, [email, password, router]);

   const register = useCallback(async () => {
      try {
         await axios.post('/register', { username, email, password });
         toast.success("User created successfully!")
         login();
      } catch (err) {
         toast.error("An unexpected error occurred.")
         console.log(err);
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