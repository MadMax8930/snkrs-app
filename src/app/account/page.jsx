import React from 'react';

const Account = () => {

   // Retrieve token 
   const isAuthenticated = () => { return localStorage.getItem('token'); }
   if (isAuthenticated) { return <p className='pt-20'>Authenticated user</p> }

  return (
    <div className='pt-20'>Account page (not authenticated)</div>
  )
}

export default Account