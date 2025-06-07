import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase'; 
import { UserCard } from './UserCard';
import { Search, SlidersHorizontal } from 'lucide-react';

type rideHistory = {
  id: string;
  bicycleId: string;
  fromDock: string;
  fromStation: string;
  toDock?: string;
  toStation?: string;
  isActive: boolean;
  startTime?: Date | null;
  endTime?: Date | null;
};

type User = {
  id: string;
  name: string;
  email: string;
  profilePicture? : string;
  status: 'active' | 'inactive' | 'suspended';
  lastUpdated?: Date | null;
  rideHistory?: { [key: string]: rideHistory };
};

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Users'));
        const userList: User[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            name: data.name || '',
            email: data.email || '',
            profilePicture: data.profilePicture || '',
            status: data.status || 'active',
            lastUpdated: data.lastUpdated && typeof data.lastUpdated.toDate === 'function'
            ? data.lastUpdated.toDate()
            : null,
            rideHistory: data.rideHistory || {},
          };
        });
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className='space-y-6 text-white'>
    <div className="flex flex-col sm:flex-row justify-center text-center sm:items-start sm:justify-start gap-4">
      <h1 className="text-3xl font-semibold text-gray-300">Users</h1>
      </div>

    <div className="bg-[#1c1c1c] rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="block w-full rounded-full border-0 py-2 pl-10 pr-3 bg-[#1c1c1c] text-gray-300 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm"
            />
          </div>
          
          <div className="w-full bg-[#1c1c1c] md:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SlidersHorizontal className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as User['status'] | 'all')}
                className="block w-full bg-[#1c1c1c] rounded-md border-0 py-2 pl-10 pr-8 text-gray-300 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-200 sm:text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"> 
        {filteredUsers.map((user) => {
          const rides = Object.entries(user.rideHistory || {}).map(([id, ride]) => ({
            ...ride,
            id,
          }));
          console.log('rides:', rides);

          return <UserCard key={user.id} user={user} rides={rides} />;
        })}
      </div>
    </div>
  );
}