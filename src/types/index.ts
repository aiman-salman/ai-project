// Type definitions for the Bicycle Rental System

export interface User {
  id: string;
  displayName: string;
  email: string;
  profilePicture: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Ride {
  id: string;
  userId: string;
  startStationId: string;
  endStationId: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  cost: number;
}

export interface Station {
  id: string;
  name: string;
  // location: {
  //   lat: number;
  //   lng: number;
  // };
  address: string;
  totalDocks: number;
  availableBikes: number;
  availableDocks: number;
  status: 'active' | 'maintenance' | 'inactive';
  lastUpdated: string;
}

export interface SystemSummary {
  totalStations: number;
  activeStations: number;
  totalBikes: number;
  availableBikes: number;
  totalUsers: number;
  activeUsers: number;
  ridesLastWeek: number;
  ridesLastMonth: number;
}