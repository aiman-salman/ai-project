import React, { useState } from 'react';
import { User, Ride } from '../../types';
import { getStationById } from '../../mockData';
import { Mail, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface UserCardProps {
  user: User;
  rides: Ride[];
}

export const UserCard: React.FC<UserCardProps> = ({ user, rides }) => {
  const [showRideHistory, setShowRideHistory] = useState(false);
  
  // Determine status indicator color
  let statusColor = 'bg-green-500';
  let statusText = 'Active';
  
  if (user.status === 'inactive') {
    statusColor = 'bg-gray-500';
    statusText = 'Inactive';
  } else if (user.status === 'suspended') {
    statusColor = 'bg-red-500';
    statusText = 'Suspended';
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Format ride time
  const formatRideTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  return (
    <div className="bg-[#1c1c1c] border-2 border-gray-500 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* User header */}
        <div className="flex items-start gap-3">
          <img
            src={user.profilePicture}
            alt={user.displayName}
            className="h-14 w-14 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-300">{user.displayName}</h3>
              <div className="flex items-center ml-2">
                <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
                <span className="text-xs font-medium text-gray-500 ml-1">{statusText}</span>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Mail className="h-3 w-3 mr-1" />
              <a href={`mailto:${user.email}`} className="hover:text-sky-300">{user.email}</a>
            </div>
            <p className="text-xs text-gray-500 mt-1">Joined {formatDate(user.joinDate)}</p>
          </div>
        </div>
        
        {/* Ride stats */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-purple-200 rounded p-2">
            <p className="text-xs font-medium text-gray-500">Total Rides</p>
            <p className="text-lg font-semibold text-gray-900">{rides.length}</p>
          </div>
          <div className="bg-gray-300 rounded p-2">
            <p className="text-xs font-medium text-gray-500">This Month</p>
            <p className="text-lg font-semibold text-gray-900">
              {rides.filter(ride => {
                const rideDate = new Date(ride.startTime);
                const now = new Date();
                return rideDate.getMonth() === now.getMonth() &&
                  rideDate.getFullYear() === now.getFullYear();
              }).length}
            </p>
          </div>
        </div>
        
        {/* Ride history toggle */}
        {rides.length > 0 && (
          <button
            onClick={() => setShowRideHistory(!showRideHistory)}
            className="mt-4 w-full flex items-center justify-center py-2 text-sm font-medium text-[#1c1c1c] bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            {showRideHistory ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Hide ride history
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                View ride history
              </>
            )}
          </button>
        )}
        
        {/* Ride history */}
        {showRideHistory && (
          <div className="mt-4 border-t pt-3 space-y-3">
            <h4 className="text-sm font-medium text-gray-300">Recent Rides</h4>
            <ul className="space-y-3">
              {rides.slice(0, 3).map((ride) => {
                const startStation = getStationById(ride.startStationId);
                const endStation = getStationById(ride.endStationId);
                
                return (
                  <li key={ride.id} className="text-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-3 w-3 mr-1 text-gray-300" />
                        <span className="font-medium">{startStation?.name || 'Unknown'}</span>
                        <span className="mx-1">→</span>
                        <span className="font-medium">{endStation?.name || 'Unknown'}</span>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <div className="flex items-center whitespace-nowrap">
                          <Clock className="mr-1 h-3 w-3" />
                          {ride.duration} min
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatRideTime(ride.startTime)}
                    </div>
                  </li>
                );
              })}
            </ul>
            
            {rides.length > 3 && (
              <button className="text-xs font-medium text-blue-600 hover:text-blue-500">
                View all {rides.length} rides
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};