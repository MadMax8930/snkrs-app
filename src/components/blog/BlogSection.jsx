import React from 'react';
import { Loader, NoBlogs, BlogCard } from '@/components';
import styles from './blog.module.css';

const BlogSection = ({ blogs, isLoading, mutate, authenticatedUser }) => {

   if (isLoading) { return <Loader extra={'pt-64'} />; }
   if (!blogs || blogs.length === 0) { return <NoBlogs />; }

  return (
    <div className={styles.blogsContainer}>
      {blogs.map((blog) => (
         <BlogCard key={blog._id}
            blog={blog}
            mutate={mutate}
            authenticatedUser={authenticatedUser}

         />
      ))}
    </div>
  )
}

export default BlogSection