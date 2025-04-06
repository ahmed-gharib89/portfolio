import type { Metadata } from 'next'
import { Montserrat, Open_Sans, Fira_Code } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

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
  description: 'Portfolio website of Ahmed Gharib, an experienced Data Engineer with expertise in Microsoft Azure, AWS, and Google Cloud platforms.',
  icons: {
    icon: '/assets/images/dark.png',
    apple: '/assets/images/dark.png',
    shortcut: '/assets/images/dark.png'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme script to prevent flash of incorrect theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Error accessing localStorage for theme:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <GoogleAnalytics measurementId="G-0JS4YKCBHY" />
      <body className={`${montserrat.variable} ${openSans.variable} ${firaCode.variable} font-opensans antialiased`}>{children}</body>
    </html>
  )
}
