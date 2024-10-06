"use client";
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher'; 

function Header() {
  const { t } = useTranslation();
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return !path.includes('aiform') && (
    <div className='p-3 px-5 border-b shadow-sm'>
      <div className='flex items-center justify-between'>
        <Image src={'/logo.svg'} width={180} height={50} alt='logo' />

        {/* <div className='flex items-center gap-5'>
          <Link href={'/dashboard'}>
            <Button variant="outline">{t('header.dashboard')}</Button>
          </Link>
        </div> 
         */}

        <div className='flex items-center gap-5'>
        <Button>{t('header.getStarted')}</Button>
       
          <LanguageSwitcher /> {/* Placed LanguageSwitcher here for far-right alignment */}
         </div>
      </div>
    </div>
  );
}

export default Header;