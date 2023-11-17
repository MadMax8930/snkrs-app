"use client";
import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { withAuth } from '@/guards/withAuth';
 /* :sneakerId with comment and coppers (auth)' + notif esp + comments logic/page with replies */
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