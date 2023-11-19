"use client";
import { Navbar, Footer } from '@/components';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';

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

export default withTokenCleanup(Layout)