import { ClipLoader } from 'react-spinners';
import styles from './loading.module.css';

const LoaderLayer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
         <ClipLoader color="red" size={40} />
         <p className={styles.text}>Loading...</p>
      </div>
   </div>
  )
}

export default LoaderLayer