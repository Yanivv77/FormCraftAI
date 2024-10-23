import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import {
  LibraryBig,
  LineChart,
  MessageSquare,
  Shield,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {
  useEffect,
  useState,
  useCallback,
  useRef
} from 'react';

interface MenuItem {
  id: number;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  path: string;
}

const SideNav: React.FC = () => {
    const menuList=[
        {
            id:1,
            name:'My Forms',
            icon:LibraryBig,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Responses',
            icon:MessageSquare,
            path:'/dashboard/responses'
        },
        {
            id:3,
            name:'Analytics',
            icon:LineChart,
            path:'/dashboard/analytics'
        },
        {
            id:4,
            name:'Upgrade',
            icon:Shield,
            path:'/dashboard/upgrade'
        }
    ]

  const { user } = useUser();
  const path = usePathname();
  const [formList, setFormList] = useState<any[]>([]);
  const [percFileCreated, setPercFileCreated] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Fetch Form List
  const getFormList = useCallback(async () => {
    if (!user) return;

    try {
      const result: any[] = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(JsonForms.id));

      setFormList(result);
      const perc = (result.length / 3) * 100;
      setPercFileCreated(perc);
    } catch (error) {
      console.error('Error fetching form list:', error);
      // Handle error appropriately (e.g., show notification)
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getFormList();
    }
  }, [user, getFormList]);

  // Toggle Sidebar
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // Close Sidebar
  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  // Close Sidebar on Route Change (Mobile)
  useEffect(() => {
    closeSidebar();
  }, [path, closeSidebar]);

  // Handle Esc Key to Close Sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen, closeSidebar]);

  // Trap Focus within Sidebar when Open
  useEffect(() => {
    const focusableElements = sidebarRef.current?.querySelectorAll<
      HTMLElement
    >(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements
      ? focusableElements[focusableElements.length - 1]
      : null;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (!focusableElements || focusableElements.length === 0) return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'; // Prevent body scrolling
      firstElement?.focus();
      document.addEventListener('keydown', handleTabKey);
    } else {
      document.body.style.overflow = 'auto'; // Re-enable body scrolling
      document.removeEventListener('keydown', handleTabKey);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Mobile Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
        <Button variant="ghost" onClick={toggleSidebar} aria-label="Toggle Menu">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          ></div>
        )}
      <aside
          ref={sidebarRef}
          className={`
            fixed top-0 left-0 h-full w-64  bg-white shadow-md transform 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            transition-transform duration-300 ease-in-out
            z-50
            md:translate-x-0 md:static md:shadow-none
            flex flex-col justify-between
          `}
          aria-label="Sidebar Navigation"
          aria-hidden={!isSidebarOpen && 'true'}
        >
        {/* Overlay for Mobile */}
        

        
          <nav className="p-5 flex flex-col h-full shadow-md border">
            <div>
              {menuList.map((menu) => (
                <Link
                  href={menu.path}
                  key={menu.id}
                  className={`flex items-center gap-3 p-4 mb-3 
                    hover:bg-cyan-600 hover:text-white rounded-lg
                    cursor-pointer text-gray-500
                    ${path === menu.path ? 'bg-primary text-white' : ''}
                  `}
                  onClick={closeSidebar} // Close sidebar on link click (mobile)
                >
                  <menu.icon aria-hidden="true" />
                  <span>{menu.name}</span>
                </Link>
              ))}
            </div>

            {/* Fixed to Bottom Section */}
            <div className="w-full mt-auto p-5">
              <Button className="w-full mb-4" aria-label="Create Form">
                Create Form
              </Button>
              <div className="my-7">
                <Progress value={percFileCreated} />
                <h2 className="text-sm mt-2 text-gray-600 text-center">
                  <strong>{formList.length}</strong> out of <strong>3</strong> Files Created
                </h2>
                <h2 className="text-sm mt-3 text-gray-600 text-center">
                  Upgrade your plan for unlimited AI form build
                </h2>
              </div>
            </div>
          </nav>
        </aside>
      
    </>
  );
};

export default SideNav;
