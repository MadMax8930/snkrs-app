import '@/app/globals.css';

function Layout({ children }) {
  return (
    <div className="layer">
      {children}
    </div>
  )
}

export default Layout