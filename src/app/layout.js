import { Toaster } from 'react-hot-toast'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Pet Adoption Platform',
  description: 'Find your perfect pet companion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <Navbar/>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}