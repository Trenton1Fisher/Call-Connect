import { Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import Navbar from '../components/shared/navbar'
import Footer from '../components/shared/footer'

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export default function RootLayout() {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      routerPush={to => navigate(to)}
      routerReplace={to => navigate(to, { replace: true })}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
      <main>
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </ClerkProvider>
  )
}
