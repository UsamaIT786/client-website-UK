import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ModalProvider } from '../context/ModalContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import ChatWidget from '../components/ChatWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.immigrationlaw.org.uk'),
  title: 'UK Immigration Legal Support | ImmigrationLaw.org.uk',
  description: 'Expert UK immigration guidance. We match you with SRA-regulated solicitors for visas, ILR, appeals and citizenship. Book a free confidential assessment today.',
  alternates: {
    canonical: './',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="trustpilot"
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="lazyOnload"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="YOUR-COOKIEBOT-ID-HERE"
          data-blockingmode="auto"
          strategy="beforeInteractive"
          suppressHydrationWarning
        />
        <ModalProvider>
          <div className="relative min-h-screen overflow-x-hidden">
            <Preloader />
            <Navbar />
            {children}
            <Footer />
            <ChatWidget />
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}
