"use client";
import axios from '../../../axios.config';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';
import styles from './auth.module.css';

const AuthPage = () => {
   const router = useRouter();
   const searchParams = useSearchParams()
   const { user, setUser } = useContext(UserContext);

   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [variant, setVariant] = useState('login');

   const [cookies, setCookie] = useCookies(['token']);

   useEffect(() => {
      const urlParam = searchParams.get('variant');
      if (urlParam === 'register' || urlParam === 'login') {
         setVariant(String(urlParam));
      } else {
         setVariant('login');
      }
   }, [searchParams, router]);
   
   const toggleVariant = useCallback(() => { 
      const newVariant = variant === 'register' ? 'login' : 'register';
      setVariant(newVariant);
      router.push(`/auth?variant=${newVariant}`);
   }, [variant, router]);

   const login = useCallback(async () => {
      try {
         const response = await axios.post('/api/login', { email, password });
         const { token } = response.data;
         if (response.status === 200 && token) {
            setCookie('token', token, { path: '/' });
            if (cookies.token) {
               const profileResponse = await axios.get('/api/profile');
               const userData = profileResponse.data;
               setUser(userData);
            }
            router.push('/account');
            toast.success("Logged in successfully!");
         } else { throw new Error("Invalid email or password. Please try again."); }
      } catch (err) {
         toast.error("An unexpected error occurred.");
         console.log(err);
      }
   }, [email, password, setCookie, router]);

   const register = useCallback(async () => {
      try {
         await axios.post('/api/register', { username, email, password });
         router.push('/auth?variant=login');
         toast.success("User created successfully!");
      } catch (err) {
         toast.error("An unexpected error occurred.");
         console.log(err);
      }
   }, [username, email, password, router]);

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

export default withTokenCleanup(AuthPage)