import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './btn.module.css';

const Button = ({ icon, action, disabled, hover, text }) => {
  return (
    <button
      onClick={action} 
      className={`${styles.btn} ${hover}`}
      disabled={disabled && `${styles.disabled}`} 
      title={text}>
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}

export default Button