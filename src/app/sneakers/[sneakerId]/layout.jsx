"use client";
import { Navbar, Footer } from '@/components';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className='pt-20 h-screen'>
         {children}
         <Footer/>
      </div>
    </>
  )
}

export default withTokenCleanup(Layout)