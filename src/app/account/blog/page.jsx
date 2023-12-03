"use client";
import React, { useContext, useEffect } from 'react';
import useUserBlogs from '@/hooks/useUserBlogs';
import { BlogSection } from '@/components';
import { UserContext } from '@/context/UserContext';
import { withAuth } from '@/guards/withAuth';

const BlogPage = () => {
   const { user } = useContext(UserContext);
   const { data: fetchedBlogs, isLoading: loadBlogs, mutate: mutateBlogs } = useUserBlogs();

   useEffect(() => {
      console.log("blogs", fetchedBlogs)
   }, [fetchedBlogs]);

  return (
    <div className='pt-16 layer-full'>
      <BlogSection 
         blogs={fetchedBlogs}
         isLoading={loadBlogs} 
         mutate={mutateBlogs}
         authenticatedUser={user}
      />
    </div>
  )
}

export default withAuth(BlogPage)