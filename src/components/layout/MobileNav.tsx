import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MapPin, Users } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Stations', path: '/stations', icon: <MapPin className="h-5 w-5" /> },
    { name: 'Users', path: '/users', icon: <Users className="h-5 w-5" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-[#1c1c1c] border-t border-gray-500 lg:hidden">
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 text-xs font-medium ${
                isActive ? 'text-cyan-200' : 'text-gray-300 hover:text-gray-900'
              }`
            }
          >
            <span className="mb-1">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};