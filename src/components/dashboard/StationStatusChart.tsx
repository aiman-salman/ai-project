import React from 'react';
import { useStationContext } from '../../context/StationContext';
import { Station } from '../../types';


  export const StationStatusChart: React.FC = () => {

  const { stations } = useStationContext();

  const totalBikes = stations.reduce((sum, station) => sum + station.availableBikes, 0);
  const totalDocks = stations.reduce((sum, station) => sum + station.totalDocks, 0);
  const availableDocks = stations.reduce((sum, station) => sum + station.availableDocks, 0);
  
  // Calculate status counts
  const statusCounts = {
    active: stations.filter(s => s.status === 'active').length,
    maintenance: stations.filter(s => s.status === 'maintenance').length,
    inactive: stations.filter(s => s.status === 'inactive').length,
  };
  
  // Calculate bike utilization percentage
  const bikeUtilizationPercentage = Math.round((totalBikes / (totalBikes + availableDocks)) * 100);
  
  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#1c1c1c]">
      {/* Bike Utilization */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-md text-gray-300">Bike Utilization</h3>
          <span className="text-sm font-semibold text-gray-300">{bikeUtilizationPercentage}%</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${bikeUtilizationPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      {/* Station Status */}
      <div className="mb-8">
        <h3 className="font-medium text-sm text-gray-300 mb-2">Station Status</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-sky-300 p-3 rounded-lg">
            <div className="text-[#1c1c1c] font-semibold text-lg">{statusCounts.active}</div>
            <div className="text-md text-[#1c1c1c]">Active</div>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <div className="text-[#1c1c1c] font-semibold text-lg">{statusCounts.maintenance}</div>
            <div className="text-md text-[#1c1c1c]">Maintenance</div>
          </div>
          <div className="bg-red-100 p-3 rounded-lg">
            <div className="text-[#1c1c1c] font-semibold text-lg">{statusCounts.inactive}</div>
            <div className="text-md text-[#1c1c1c]">Inactive</div>
          </div>
        </div>
      </div>
      
      {/* Bike Distribution */}
      <div className="pb-6 overflow-y-auto">
        <h3 className="font-medium text-md text-gray-300 mb-2">Bike Distribution</h3>
        <div className="space-y-4">
          {stations.map(station => (
            <div key={station.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-gray-300">{station.name}</span>
                <span className="text-gray-300">{station.availableBikes}/{station.totalDocks}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(station.availableBikes / station.totalDocks) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};