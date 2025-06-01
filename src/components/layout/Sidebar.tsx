import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MapPin, Users, X } from 'lucide-react';
import bicyclego_icon from '../../assets/bicyclego_icon.svg'

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { name: 'Stations', path: '/stations', icon: <MapPin className="h-5 w-5" /> },
    { name: 'Users', path: '/users', icon: <Users className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full w-64 transform bg-[#1c1c1c] shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-4 border-r-2 border-b-2 border-gray-500">
            <div className="flex items-center space-x-2">
              <img src={bicyclego_icon} alt='Bicycle-Go-logo' className='h-8 w-8' />
              <span className="text-lg font-semibold tracking-tight text-gray-300">Bicycle-Go</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden rounded-md p-1 text-gray-300 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 px-3 py-4 space-y-1 border-r-2 border-gray-500">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-500 text-sky-300'
                      : 'text-gray-300'
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>

        </div>
      </div>
    </>
  );
};