import React from 'react';
import { Station } from '../../types';
import { MapPin, Settings, AlertTriangle } from 'lucide-react';

interface StationCardProps {
  station: Station;
}

export const StationCard: React.FC<StationCardProps> = ({ station }) => {
  // Calculate bike availability as a percentage
  const availabilityPercentage = Math.round((station.availableBikes / station.totalDocks) * 100);
  
  // Determine status indicator color
  let statusColor = 'bg-green-500';
  let statusText = 'Active';
  
  if (station.status === 'maintenance') {
    statusColor = 'bg-yellow-500';
    statusText = 'Maintenance';
  } else if (station.status === 'inactive') {
    statusColor = 'bg-red-500';
    statusText = 'Inactive';
  }
  
  // Format the last updated time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  return (
    <div className="bg-[#1c1c1c] border-2 border-gray-500 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Station header with status indicator */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-300">{station.name}</h3>
            <div className="flex items-center text-sm text-gray-300 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{station.address}</span>
            </div>
          </div>
          <div className="flex items-center ">
            <span className={`w-3 h-3 rounded-full ${statusColor} mr-2`}></span>
            <span className="text-xs font-medium text-gray-400">{statusText}</span>
          </div>
        </div>
        
        {/* Station stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-cyan-200 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-500">Available Bikes</p>
            <p className="text-xl font-semibold text-[#1c1c1c] mt-1">
              {station.availableBikes} <span className="text-sm text-gray-500">/ {station.totalDocks}</span>
            </p>
          </div>
          <div className="bg-gray-300 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-500">Available Docks</p>
            <p className="text-xl font-semibold text-[#1c1c1c] mt-1">
              {station.availableDocks} <span className="text-sm text-gray-500">/ {station.totalDocks}</span>
            </p>
          </div>
        </div>
        
        {/* Availability Progress Bar */}
        <div className="mt-4">
          <div className="flex text-gray-300 items-center justify-between text-xs mb-1">
            <span className="font-medium">Bike Availability</span>
            <span>{availabilityPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                availabilityPercentage > 66 ? 'bg-green-500' : 
                availabilityPercentage > 33 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${availabilityPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Card footer */}
        <div className="mt-4 pt-3 border-t flex items-center justify-between">
          <div className="text-xs text-gray-400">
            Updated at {formatTime(station.lastUpdated)}
          </div>
          <div className="flex space-x-2">
            {station.status !== 'active' && (
              <button className="p-1 text-yellow-600 hover:text-yellow-700 rounded-full hover:bg-yellow-50">
                <AlertTriangle className="h-4 w-4" />
              </button>
            )}
            {/* <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-50">
              <Settings className="h-4 w-4" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};