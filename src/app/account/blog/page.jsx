"use client";
import React from 'react'
import { withAuth } from '../withAuth';
import styles from './blog.module.css';

const BlogPage = () => {
  return (
    <div className={styles.container}>
      Blog Page
    </div>
  )
}

export default withAuth(BlogPage)