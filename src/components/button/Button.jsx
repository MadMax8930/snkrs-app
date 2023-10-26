import Link from 'next/link';
import styles from './button.module.css';

const Button = ({ url, text }) => {
  return (
    <Link href={url}>
      <button className={styles.container}>
         {text}
      </button>
    </Link>
  )
}

export default Button