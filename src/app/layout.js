import { Inter } from 'next/font/google';
import { Navbar, Footer } from '@/components';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sneaker Application',
  description: 'next popular sneaker releases with cop guides and price estimations resell',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <ThemeProvider>
            {/* <AuthSessionProvider> */}
               <Navbar />
               <div className="container">      
                  {children}
                  <Footer />
               </div>
            {/* </AuthSessionProvider> */}
         </ThemeProvider>
      </body>
    </html>
  )
}
