"use client"
import { SignIn, SignedIn } from '@clerk/clerk-react'
import SideNav from './_components/SideNav'
import Header from '../_components/Header'

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SignedIn>
      <Header />
      <div className="flex flex-col min-h-screen">
      
        <div className='md:w-64'>
            <SideNav/>
        </div>
        <div className='md:ml-64 '>
      
        {children}
       
        </div>
       
    </div>
    </SignedIn>
  )
}

export default DashboardLayout