import type { Metadata } from 'next';
import './globals.css';
import SiteChrome from './site-chrome';

export const metadata: Metadata = {
  title: 'JOGAT Green Inc. | Environmental services and business advisory',
  description:
    'JOGAT Green Inc. delivers waste management, recycling, biogas and sustainability consulting. Through JOGAT Consulting, we provide accounting, tax, financial advisory and professional training.',
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
          href="https://fonts.googleapis.com/css2?family=Marcellus&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body><SiteChrome>{children}</SiteChrome></body>
    </html>
  );
}