import React from 'react';
import { mockRides, getStationById, getUserById } from '../../mockData';
import { Clock, MapPin } from 'lucide-react';

export const RecentActivity: React.FC = () => {
  // Get the 5 most recent rides
  const recentRides = [...mockRides].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  ).slice(0, 5);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  return (
    <div className="overflow-hidden rounded-md m-2">
      <ul className="divide-y divide-gray-500">
        {recentRides.map((ride) => {
          const user = getUserById(ride.userId);
          const startStation = getStationById(ride.startStationId);
          const endStation = getStationById(ride.endStationId);
          
          return (
            <li key={ride.id} className="py-3">
              <div className="flex items-start space-x-4">
                <img 
                  src={user?.profilePicture || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                  alt={user?.displayName || 'User'} 
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-300 truncate">
                    {user?.displayName || 'Unknown User'}
                  </p>
                  <div className="flex items-center mt-1 text-sm text-gray-400">
                    <MapPin className="mr-1 h-4 w-4" />
                    <p className="truncate">
                      {startStation?.name || 'Unknown'} → {endStation?.name || 'Unknown'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end text-sm text-gray-400">
                  <div className="flex items-center whitespace-nowrap">
                    <Clock className="mr-1 h-4 w-4" />
                    {ride.duration} min
                  </div>
                  <span className="mt-1">{formatDate(ride.startTime)}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      
      <div className="mt-4 text-center">
        <button className="text-sm font-medium text-sky-300">
          View all activity
        </button>
      </div>
    </div>
  );
};