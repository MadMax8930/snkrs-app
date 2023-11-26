"use client";
import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { withAuth } from '@/guards/withAuth';

const BlogPage = () => {
   const { user } = useContext(UserContext);

   console.log("user-blog", {user}, user._id);

  return (
    <div className='pt-20 text-center'>
      Blog Page (to be done)
    </div>
  )
}

export default withAuth(BlogPage)