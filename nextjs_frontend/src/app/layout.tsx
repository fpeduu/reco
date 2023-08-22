import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';
import visbyCF from '@/config/fonts';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reco',
  description: 'Uma plataforma de resolução de acordos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${visbyCF.className} ${inter.className}`}>
        <Header/>
        <main className="flex min-h-screen flex-col items-center justify-between">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
