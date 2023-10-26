"use client";
import { SessionProvider } from 'next-auth/react';

const AuthSessionProvider = ({ children }) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthSessionProvider