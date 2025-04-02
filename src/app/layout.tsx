import type { Metadata } from 'next'
import { Montserrat, Open_Sans, Fira_Code } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin']
})

const openSans = Open_Sans({
  variable: '--font-opensans',
  subsets: ['latin']
})

const firaCode = Fira_Code({
  variable: '--font-firacode',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Ahmed Gharib | Data Engineer & Analytics Professional',
  description: 'Portfolio website of Ahmed Gharib, an experienced Data Engineer with expertise in Microsoft Azure, AWS, and Google Cloud platforms.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${montserrat.variable} ${openSans.variable} ${firaCode.variable} font-opensans antialiased`}>{children}</body>
    </html>
  )
}
