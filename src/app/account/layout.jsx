"use client";
import { Navbar, Footer } from '@/components';
import { withAuth } from '@/guards/withAuth';

function Layout({ children }) {
  return (
    <>
      <section>
         <Navbar />
         {children}
      </section>
      <Footer />
    </>
  )
}

export default withAuth(Layout)