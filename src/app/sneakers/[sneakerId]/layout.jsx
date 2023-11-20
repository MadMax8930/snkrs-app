"use client";
import { Navbar, Footer } from '@/components';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';

function Layout({ children }) {
  return (
    <div className='h-screen overflow-auto'>
      <div className='min-h-[92.3svh]'>
         <Navbar />
         <div className='pt-[4.5rem]'>
            {children}
         </div>
      </div>
      <Footer />
    </div>
  )
}

export default withTokenCleanup(Layout)