import React from 'react';
import { isAuthenticated } from '../auth/token';

const Account = () => {
   const token = isAuthenticated();

   if (token) { return <p>Authenticated user</p> }

  return (
    <div>Account page (not authenticated)</div>
  )
}

export default Account