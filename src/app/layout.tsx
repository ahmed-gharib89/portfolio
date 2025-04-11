import type { Metadata } from 'next'
import './globals.css'
import '@/styles/custom-scrollbar.css'
import GoogleAnalytics from '@/components/shared/GoogleAnalytics'
import StructuredData from '@/components/shared/StructuredData'
import { analyticsConfig, siteConfig } from '@/config'
import { Montserrat, Open_Sans, Fira_Code } from 'next/font/google'

// Define the fonts
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans'
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-firacode'
})

// Using CSS variables for our self-hosted fonts
const fontVariables = {
  className: 'self-hosted-fonts'
}

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: '/assets/images/dark.png',
    apple: '/assets/images/dark.png',
    shortcut: '/assets/images/dark.png'
  },
  alternates: {
    // Using proper format for canonical URL
    canonical: siteConfig.url
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
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
        <StructuredData />
      </head>
      <GoogleAnalytics measurementId={analyticsConfig.googleAnalyticsId} />
      <body className={`${montserrat.variable} ${openSans.variable} ${firaCode.variable} font-opensans antialiased`}>{children}</body>
    </html>
  )
}
