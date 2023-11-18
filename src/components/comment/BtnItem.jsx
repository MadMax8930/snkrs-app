import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BtnItem = ({ icon, action, disabled, className, text }) => {
  return (
    <button 
      onClick={action} 
      disabled={disabled} 
      className={className} 
      title={text}>
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}

export default BtnItem