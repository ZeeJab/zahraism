import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lady Zahra - SVP of Engineering',
  description: 'Professional profile of Lady Zahra, SVP of Engineering at BDG Media and ManhattanJS Organizer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}