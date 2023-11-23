"use client";
import { Navbar, Footer } from '@/components';
import { withAuth } from '@/guards/withAuth';

function Layout({ children }) {
  return (
    <>
      <Navbar />
         <div className='pt-[4.5em]'>
            {children}
         </div>
      <Footer />
    </>
  )
}

export default withAuth(Layout)