import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'JOGAT Green Inc.',
  description:
    'JOGAT Green Inc. delivers waste management, recycling, biogas and waste-to-energy solutions, and environmental sustainability consulting.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=DM+Mono:wght@400;500&family=Figtree:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script id="enable-js" strategy="beforeInteractive">
          {'document.documentElement.classList.add("js");'}
        </Script>
        {children}
      </body>
    </html>
  );
}