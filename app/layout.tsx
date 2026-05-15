import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '../context/ModalContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import ChatWidget from '../components/ChatWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Immigration Law | UK Immigration Solutions',
  description: 'Setting the global standard for UK Immigration Solutions. We combine old legal tradition with modern efficient solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ModalProvider>
          <div className="relative min-h-screen overflow-x-hidden">
            <Preloader />
            <Navbar />
            {children}
            <Footer />
            {/* <ChatWidget /> */}
          </div>
        </ModalProvider>
      </body>
    </html>
  );
}
