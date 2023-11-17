import React from 'react';
import { Navbar, Footer } from '@/components';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout