import Image from 'next/image';
import { Button } from '@/components';
import styles from './contact.module.css';
     /* to style contact + ':sneakerId' + 'notif send + comments logic' */
const ContactPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lets Keep in Touch</h1>
      <div className={styles.content}>
         <div className={styles.imgContainer}>
            <Image src="/contact.png" alt="Contact" fill={true} className={styles.image} />
         </div>
         <form className={styles.formContainer}>
            <input type="text" placeholder="name" />
            <input type="text" placeholder="email" />
            <textarea cols="30" rows="10" placeholder="message"></textarea>
            <Button url="#" text="Send" />
         </form>
      </div>
    </div>
  )
}

export default ContactPage