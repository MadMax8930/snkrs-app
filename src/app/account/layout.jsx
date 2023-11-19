"use client";
import { Navbar, Footer } from '@/components';
import { withAuth } from '@/guards/withAuth';

function Layout({ children }) {
  return (
    <>
      <Navbar />
         <div className='pt-20'>
            {children}
         </div>
      <Footer />
    </>
  )
}

export default withAuth(Layout)