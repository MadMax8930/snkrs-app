import React from 'react';
import { Loader, BlogCard, NoItems } from '@/components';
import styles from './blog.module.css';

const BlogSection = ({ blogs, isLoading, authenticatedUser }) => {
   if (isLoading) { return <Loader extra={'pt-64'} />; }
   if (!blogs || blogs.length === 0) { return <NoItems variation={'nb'} linkHref="/" title="No conversations found" description="Leave your thoughts on sneakers, get some feedback." imageSrc="/pink.gif" imageAlt="No Blog" />; }

  return (
    <div className={styles.blogsContainer}>
      {blogs.map((blog) => (
         <BlogCard key={blog._id}
            blog={blog}
            authenticatedUser={authenticatedUser}
         />
      ))}
    </div>
  )
}

export default BlogSection