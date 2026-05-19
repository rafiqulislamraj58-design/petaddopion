import { Toaster } from 'react-hot-toast'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

export const metadata = {
  title: 'Pet Adoption Platform',
  description: 'Find your perfect pet companion',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  )
}