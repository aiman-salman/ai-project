import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { getAuth, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';

interface TopBarProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [user, setUser] = useState<User | null>(null);

  // Track the logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <header className="sticky top-0 z-10 bg-[#1c1c1c] border-b-2 border-gray-500 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-300 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>

            {/* Dynamic Greeting */}
            <h1 className="text-lg font-semibold text-gray-300">
              👋 Hello {user?.email || 'Guest'}
            </h1>
          </div>

          {/* Right side nav items */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-6 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};