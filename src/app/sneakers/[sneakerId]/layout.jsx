"use client";
import { Footer } from '@/components';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';

function Layout({ children }) {
  return (
    <div className='h-screen overflow-auto'>
      <div className='min-h-[92.3svh]'>
         {children}
      </div>
      <Footer />
    </div>
  )
}

export default withTokenCleanup(Layout)