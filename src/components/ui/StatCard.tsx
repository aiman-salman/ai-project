import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: number;
  trend: 'up' | 'down';
  isPercentage?: boolean;
  bgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  trend,
  isPercentage = false,
  bgColor = 'bg-white',
}) => {
  return (
    // <div className="bg-sky-300 rounded-lg shadow p-4 transition-all duration-200 hover:shadow-md">
    <div className={`${bgColor} rounded-lg shadow p-4 transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
        
        <div className={`flex items-center text-sm ${
          trend === 'up' ? 'text-green-700' : 'text-red-600'
        }`}>
          {trend === 'up' ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          <span>
            {change.toString().replace('-', '')}
            {isPercentage && '%'}
          </span>
        </div>
      </div>
      
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-1 text-2xl font-semibold text-[#1c1c1c]">{value}</p>
      </div>
    </div>
  );
};