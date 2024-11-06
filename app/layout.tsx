import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from 'next-intl';
import Header from "./_components/Header";
import {getLocale, getMessages} from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FormCraftAI",
  description: "Create your forms in seconds with AI form builder",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
          <body className={`${inter.className} bg-white text-gray-900`}>
          
            {children}
            <Toaster />
          </body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}