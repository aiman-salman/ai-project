import React, { useState } from 'react';
import { mockUsers, getUserRides } from '../../mockData';
import { User } from '../../types';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { UserCard } from './UserCard';

export const UsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<User['status'] | 'all'>('all');
  
  const filteredUsers = mockUsers.filter(user => {
    // Filter by search query
    const matchesQuery = user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesQuery && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold text-gray-300">Users</h1>
        
        <button className="flex items-center justify-center px-4 py-2 bg-cyan-200 text-[#1c1c1c] rounded-full font-medium hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-[#1c1c1c] rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="block w-full rounded-full border-0 py-2 pl-10 pr-3 bg-[#1c1c1c] text-gray-300 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm"
            />
          </div>
          
          {/* Status filter */}
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
      
      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} rides={getUserRides(user.id)} />
        ))}
      </div>
      
      {filteredUsers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No users found matching your filters.</p>
          <button 
            onClick={() => {setSearchQuery(''); setStatusFilter('all');}}
            className="mt-2 text-cyan-500 hover:text-gray-500"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
};