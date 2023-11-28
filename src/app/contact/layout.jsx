import { Navbar, Footer } from '@/components';
import '@/app/globals.css';

function Layout({ children }) {
  return (
    <div className="layer">
      <Navbar />
      {children}
      {/* <div className='fixed bottom-0 w-full'>
         <Footer/>
      </div> */}
    </div>
  )
}

export default Layout