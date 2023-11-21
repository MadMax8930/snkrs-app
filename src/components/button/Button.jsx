import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './btn.module.css';

const Button = ({ icon, action, disabled, hover, backgroundColor, text }) => {
  return (
    <button
      onClick={action} 
      className={`${styles.btn} ${hover}`}
      disabled={disabled && `${styles.disabled}`}
      style={action ? { backgroundColor } : { backgroundColor: '#525257'}}
      title={text}>
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}

export default Button