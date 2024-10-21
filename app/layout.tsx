import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from 'next-intl';
import Header from "./_components/Header";
import {getLocale, getMessages} from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  console.log(locale, messages,"locale and messages");

  return (
    <ClerkProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
          <body className={`${inter.className} bg-white text-gray-900`}>
          <Header/>
            {children}
            <Toaster />
          </body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}