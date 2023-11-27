"use client";
import { Navbar, Footer } from '@/components';
import { withUserFetch } from '@/guards/withUserFetch';

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

export default withUserFetch(Layout)