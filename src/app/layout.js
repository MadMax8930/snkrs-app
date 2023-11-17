import { Inter } from 'next/font/google';
import { Navbar, Footer } from '@/components';
import { UserProvider } from '@/context/UserContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast'
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Max Sneakers Application',
  description: 'next popular sneaker releases with cop guides and price estimations resell',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <UserProvider>
            <Toaster />
            <ThemeProvider>
               <div className="main">      
                  <Navbar /> 
                  {children}
                  <Footer />
               </div>
            </ThemeProvider>
         </UserProvider>
      </body>
    </html>
  )
}
