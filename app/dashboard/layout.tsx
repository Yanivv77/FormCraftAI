"use client"
import { SignIn, SignedIn } from '@clerk/clerk-react'
import SideNav from './_components/SideNav'
import Header from '../_components/Header'

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SignedIn>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <div className="flex flex-col md:flex-row flex-1">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <SideNav />
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SignedIn>
  );
}

export default DashboardLayout
