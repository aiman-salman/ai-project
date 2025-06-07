import React from 'react';
import { StatCard } from '../ui/StatCard';
import { Bike, MapPin, Users, History } from 'lucide-react';
import { RecentActivity } from './RecentActivity';
import { StationStatusChart } from './StationStatusChart';
import { useStationContext } from '../../context/StationContext';
import { useUsersStats } from '../../hooks/useUsersStats';

export const DashboardPage: React.FC = () => {

  const { stations } = useStationContext();
  const { activeUsers, totalRides } = useUsersStats(); 

  const totalStations = stations.length;
  const activeStations = stations.filter(s => s.status === 'active').length;
  const totalBikes = stations.reduce((sum, s) => sum + s.totalDocks, 0);
  const availableBikes = stations.reduce((sum, s) => sum + s.availableBikes, 0);

  return (
    <div className="space-y-6">
      
      {/* System Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Stations"
          value={`${activeStations}/${totalStations}`}
          icon={<MapPin className="h-5 w-5 text-blue-500" />}
          change={2}
          trend="up"
          bgColor="bg-sky-300"
        />
        <StatCard
          title="Available Bikes"
          value={`${availableBikes}/${totalBikes}`}
          icon={<Bike className="h-5 w-5 text-cyan-500" />}
          change={-5}
          trend="down"
          bgColor="bg-cyan-200"
        />
        <StatCard
          title="Active Users"
          value={activeUsers.toLocaleString()}
          icon={<Users className="h-5 w-5 text-green-500" />}
          change={120}
          trend="up"
          bgColor="bg-green-100"
        />
        <StatCard
          title="Total Rides"
          value={totalRides.toLocaleString()}
          icon={<History className="h-5 w-5 text-purple-500" />}
          change={8.3}
          trend="up"
          isPercentage={true}
          bgColor="bg-purple-200"
        />
      </div>

      {/* Station Status Chart */}
      <div className="bg-[#1c1c1c] border-2 border-gray-500 rounded-md shadow overflow-hidden">
        <div className="px-4 py-3 border-b-2 border-gray-500">
          <h2 className="text-lg font-medium text-gray-300">Station Status</h2>
        </div>
        <div className="p-4 h-[24rem] max-w-full overflow-x-auto">
          <StationStatusChart />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1c1c1c] border-2 border-gray-500 rounded-lg shadow">
        <div className="px-4 py-3 border-b-2 border-gray-500">
          <h2 className="text-lg font-medium text-gray-300">Recent Activity</h2>
        </div>
        <div className="p-4">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};
