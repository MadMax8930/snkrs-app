"use client";
import React, { useState } from 'react';
import { Navbar } from '@/components';
import emailjs from '@emailjs/browser';
import nextConfig from '../../../next.config';
import styles from './contact.module.css';

const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } = nextConfig.publicRuntimeConfig;

const ContactPage = () => {
   const [form, setForm] = useState({ name: '', email: '', message: '' })
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);

      emailjs.send(
         EMAILJS_SERVICE_ID, 
         EMAILJS_TEMPLATE_ID,
         {
            from_name: form.name,
            to_name: 'Max',
            from_email: form.email,
            to_email: 'madmax8930@gmail.com',
            message: form.message,
         }, 
         EMAILJS_PUBLIC_KEY
      ).then(() => {
            setLoading(false);
            alert('Thank you. I will get back to you as soon as possible.');
            setForm({ name: '', email: '', message: '' });
         }, (error) => { 
            setLoading(false); 
            console.log(error)
            alert('Something went wrong.');
      });
   }

  return (
   <section>
      <Navbar />
      <div className={styles.container}>
         <h1 className={styles.header}>Get in touch.</h1>
         <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.inColumn}>
               <span className={styles.textContainer}>Your Name</span>
               <input type="text" className={styles.inputContainer} 
                     name="name" placeholder="What's your name?"
                     value={form.name} onChange={handleChange} />
            </label>
            <label className={styles.inColumn}>
               <span className={styles.textContainer}>Your Email</span>
               <input type="email" className={styles.inputContainer} 
                     name="email" placeholder="What's your email?"
                     value={form.email} onChange={handleChange} />
            </label>
            <label className={styles.inColumn}>
               <span className={styles.textContainer}>Your Message</span>
               <textarea rows="7" className={styles.inputContainer} 
                     name="message" placeholder="What do you want to say?"
                     value={form.message} onChange={handleChange} />
            </label>
            <button className={styles.btn} type="submit">
               {loading 
                  ? <>Sending...<div className={styles.gif} /></> 
                  : <>Send &nbsp; 📨</>
               }
            </button>
         </form>
      </div>
    </section>
  )
}

export default ContactPage