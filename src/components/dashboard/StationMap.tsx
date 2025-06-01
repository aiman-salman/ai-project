import React from 'react';
import { Station } from '../../types';

interface StationMapProps {
  stations: Station[];
}

export const StationMap: React.FC<StationMapProps> = ({ stations }) => {
  // In a real application, this would use a mapping library like Leaflet or Google Maps
  // For this demo, we'll create a simplified representation

  return (
    <div className="relative w-full h-full rounded-md overflow-hidden bg-blue-50">
      {/* Map placeholder */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1')] bg-cover bg-center opacity-50"></div>
      
      {/* Station markers */}
      <div className="absolute inset-0 flex items-center justify-center">
        {stations.map((station) => {
          // Convert geo coordinates to relative positions within the container
          // This is a simplified approach for demonstration
          const x = (station.location.lng + 74.02) * 1000 % 90 + 5; // Normalize to 5-95% width
          const y = (station.location.lat - 40.68) * 1000 % 90 + 5; // Normalize to 5-95% height
          
          // Determine marker color based on station status
          let bgColor = "bg-green-500";
          if (station.status === 'maintenance') bgColor = "bg-yellow-500";
          if (station.status === 'inactive') bgColor = "bg-red-500";
          
          return (
            <div
              key={station.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${x}%`, top: `${y}%` }}
              title={station.name}
            >
              {/* Station marker */}
              <div className={`h-4 w-4 rounded-full ${bgColor} ring-4 ring-white shadow-md`}></div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 hidden group-hover:block bg-white p-2 rounded shadow-lg text-xs w-48 z-10">
                <p className="font-bold text-sm">{station.name}</p>
                <p className="text-gray-500">{station.address}</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <span className="text-gray-500">Bikes:</span>
                    <span className="font-medium ml-1">{station.availableBikes}/{station.totalDocks}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Docks:</span>
                    <span className="font-medium ml-1">{station.availableDocks}/{station.totalDocks}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Map controls - simplified */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2">
        <button className="bg-white p-1 rounded-md shadow hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button className="bg-white p-1 rounded-md shadow hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};