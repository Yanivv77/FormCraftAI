"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs"; // Removed unused SignIn import
import { Toaster } from "@/components/ui/sonner";
import { I18nextProvider } from 'react-i18next';
import i18n from "@lib/i18n"; 
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (i18n.language === 'he') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [i18n.language]);

  return (
    <ClerkProvider>
    <I18nextProvider i18n={i18n}>
      <html lang={i18n.language}>
        <body className={inter.className}>
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </I18nextProvider>
  </ClerkProvider>
  );
}

export default RootLayout;