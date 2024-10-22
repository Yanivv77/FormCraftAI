"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import { Menu, X } from 'lucide-react';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from "next/link";

function Header() {
  const t = useTranslations('header'); 
  const {user,isSignedIn}=useUser();
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  return (
    !path.includes("aiform") && (
      <header dir="ltr" className="top-0 w-full p-3 px-5 border-b shadow-sm">
        
        <div className="flex justify-between items-center">
          {/* Logo on the Left */}
          <div className="flex items-center">
            <Image src={"/logo.png"} width={60} height={60} alt="logo" />
            <Logo />
          </div>

          {/* Desktop Navigation: Button and Language Switcher on the Right */}
          <div className="hidden md:flex items-center gap-5">
          <LanguageSwitcher />

          {isSignedIn?
            <div className='flex items-center gap-5'>
              <Link href={'/dashboard'}>
              <Button variant="outline">{t("dashboard")}</Button>  
              </Link>
            <UserButton/>
            </div>:
            <SignInButton>
              <Button>{t("getStarted")}</Button>
            </SignInButton>}
          </div>
          

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleMobileMenu} className="focus:outline-none">
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col">
            {isSignedIn?
            <div className='flex items-center gap-5'>
              <Link href={'/dashboard'}>
              <Button variant="outline">Dashboard</Button>  
              </Link>
                <div className="align-self-center"> <UserButton/></div>
                
            </div>:
            <SignInButton>
              <Button className="w-full mb-2">{t("getStarted")}</Button>
            </SignInButton>}
            <div className="mt-2"> <LanguageSwitcher /></div>
            
            {/* Add more mobile navigation links here if needed */}
          </div>
        )}
      </header>
    )
  );
}

export default Header;
