"use client";
import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { withAuth } from '@/guards/withAuth';
 /* auth/middleware + profile sneakerId + reply css + blog page + remove logs + deploy + cert + notif esp + ssr loader + scrap script */
const BlogPage = () => {
   const { user } = useContext(UserContext);

   console.log("user-blog", {user}, user._id);

  return (
    <div className='pt-20'>
      Blog Page
    </div>
  )
}

export default withAuth(BlogPage)