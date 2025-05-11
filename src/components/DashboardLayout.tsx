
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell, ClipboardList, Folder, Calendar } from 'lucide-react';
import RoleSwitcher from './RoleSwitcher';
import { CriticalNotificationDropdown } from './alerts/CriticalNotificationDropdown';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  role: 'doctor' | 'nurse';
}

const DashboardLayout = ({ children, activeTab, role }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const doctorNavItems = [
    { name: 'Patients', path: '/doctor-dashboard', icon: <User size={20} /> },
    { name: 'Track Board', path: '/doctor-dashboard/track-board', icon: <Calendar size={20} /> },
    { name: 'Orders', path: '/doctor-dashboard/orders', icon: <ClipboardList size={20} /> },
    { name: 'Results', path: '/doctor-dashboard/results', icon: <Folder size={20} /> },
    { name: 'Notes', path: '/doctor-dashboard/notes', icon: <ClipboardList size={20} /> }
  ];

  const nurseNavItems = [
    { name: 'Patients', path: '/nurse-dashboard', icon: <User size={20} /> },
    { name: 'Track Board', path: '/nurse-dashboard/track-board', icon: <Calendar size={20} /> },
    { name: 'Tasks', path: '/nurse-dashboard/tasks', icon: <ClipboardList size={20} /> },
    { name: 'Vitals', path: '/nurse-dashboard/vitals', icon: <Folder size={20} /> }
  ];

  const navItems = role === 'doctor' ? doctorNavItems : nurseNavItems;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          <div className={`font-bold text-lg ${!isSidebarOpen && 'hidden'}`}>ED Dashboard</div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-sidebar-foreground hover:text-sidebar-primary">
            {isSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 rounded-md
                    ${activeTab === item.name.toLowerCase() 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'hover:bg-sidebar-accent/30'}
                    transition-colors
                  `}
                >
                  <div className="mr-3">{item.icon}</div>
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info */}
        <div className={`p-4 border-t border-sidebar-border ${!isSidebarOpen && 'text-center'}`}>
          {isSidebarOpen ? (
            <>
              <div className="font-medium">{user?.name}</div>
              <div className="text-sm opacity-70 capitalize mb-2">{user?.role}</div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80">
                Logout
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-sidebar-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-border h-16 flex items-center justify-between px-4">
          <div className="font-semibold text-lg">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </div>
          <div className="flex items-center gap-4">
            <RoleSwitcher />
            {role === 'doctor' ? (
              <CriticalNotificationDropdown />
            ) : (
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Bell size={20} />
              </Button>
            )}
            <div>
              <div className="font-medium">{user?.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-secondary/30">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
