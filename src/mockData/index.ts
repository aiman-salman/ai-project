import { Station, SystemSummary, User, Ride } from '../types';

export const mockStations: Station[] = [
  {
    id: '1',
    name: 'Central Park',
    location: { lat: 40.7812, lng: -73.9665 },
    address: '5th Ave & E 59th St, New York, NY',
    totalDocks: 24,
    availableBikes: 14,
    availableDocks: 10,
    status: 'active',
    lastUpdated: '2025-06-12T14:32:00Z',
  },
  {
    id: '2',
    name: 'Union Square',
    location: { lat: 40.7359, lng: -73.9911 },
    address: 'Union Square W, New York, NY',
    totalDocks: 32,
    availableBikes: 6,
    availableDocks: 26,
    status: 'active',
    lastUpdated: '2025-06-12T14:35:00Z',
  },
  {
    id: '3',
    name: 'Brooklyn Heights',
    location: { lat: 40.6958, lng: -73.9936 },
    address: 'Montague St & Clinton St, Brooklyn, NY',
    totalDocks: 18,
    availableBikes: 2,
    availableDocks: 16,
    status: 'active',
    lastUpdated: '2025-06-12T14:30:00Z',
  },
  {
    id: '4',
    name: 'Battery Park',
    location: { lat: 40.7033, lng: -74.0170 },
    address: 'State St & Battery Pl, New York, NY',
    totalDocks: 28,
    availableBikes: 20,
    availableDocks: 8,
    status: 'active',
    lastUpdated: '2025-06-12T14:28:00Z',
  },
  {
    id: '5',
    name: 'Times Square',
    location: { lat: 40.7580, lng: -73.9855 },
    address: 'Broadway & 7th Ave, New York, NY',
    totalDocks: 36,
    availableBikes: 0,
    availableDocks: 36,
    status: 'maintenance',
    lastUpdated: '2025-06-12T14:15:00Z',
  },
  {
    id: '6',
    name: 'Grand Central',
    location: { lat: 40.7527, lng: -73.9772 },
    address: '42nd St & Park Ave, New York, NY',
    totalDocks: 30,
    availableBikes: 25,
    availableDocks: 5,
    status: 'active',
    lastUpdated: '2025-06-12T14:40:00Z',
  },
  {
    id: '7',
    name: 'Columbia University',
    location: { lat: 40.8075, lng: -73.9626 },
    address: '116th St & Broadway, New York, NY',
    totalDocks: 20,
    availableBikes: 8,
    availableDocks: 12,
    status: 'active',
    lastUpdated: '2025-06-12T14:22:00Z',
  },
  {
    id: '8',
    name: 'High Line',
    location: { lat: 40.7480, lng: -74.0048 },
    address: 'Gansevoort St & Washington St, New York, NY',
    totalDocks: 22,
    availableBikes: 12,
    availableDocks: 10,
    status: 'inactive',
    lastUpdated: '2025-06-12T14:10:00Z',
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    displayName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2024-02-15',
    status: 'active',
  },
  {
    id: '2',
    displayName: 'Samantha Lee',
    email: 'samantha.lee@example.com',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2024-01-05',
    status: 'active',
  },
  {
    id: '3',
    displayName: 'Michael Chen',
    email: 'michael.chen@example.com',
    profilePicture: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2024-03-22',
    status: 'active',
  },
  {
    id: '4',
    displayName: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    profilePicture: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2024-04-10',
    status: 'inactive',
  },
  {
    id: '5',
    displayName: 'David Martinez',
    email: 'david.martinez@example.com',
    profilePicture: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2024-01-30',
    status: 'suspended',
  }
];

export const mockRides: Ride[] = [
  {
    id: '1',
    userId: '1',
    startStationId: '1',
    endStationId: '2',
    startTime: '2025-06-10T09:15:00Z',
    endTime: '2025-06-10T09:45:00Z',
    duration: 30,
    cost: 3.50,
  },
  {
    id: '2',
    userId: '2',
    startStationId: '3',
    endStationId: '4',
    startTime: '2025-06-10T10:30:00Z',
    endTime: '2025-06-10T11:15:00Z',
    duration: 45,
    cost: 4.75,
  },
  {
    id: '3',
    userId: '1',
    startStationId: '2',
    endStationId: '6',
    startTime: '2025-06-11T14:00:00Z',
    endTime: '2025-06-11T14:20:00Z',
    duration: 20,
    cost: 2.50,
  },
  {
    id: '4',
    userId: '3',
    startStationId: '7',
    endStationId: '1',
    startTime: '2025-06-11T17:45:00Z',
    endTime: '2025-06-11T18:30:00Z',
    duration: 45,
    cost: 4.75,
  },
  {
    id: '5',
    userId: '4',
    startStationId: '6',
    endStationId: '8',
    startTime: '2025-06-12T08:20:00Z',
    endTime: '2025-06-12T08:50:00Z',
    duration: 30,
    cost: 3.50,
  },
];

export const mockSystemSummary: SystemSummary = {
  totalStations: 8,
  activeStations: 6,
  totalBikes: 210,
  availableBikes: 87,
  totalUsers: 3500,
  activeUsers: 2800,
  ridesLastWeek: 4850,
  ridesLastMonth: 19200,
};

export const getUserRides = (userId: string): Ride[] => {
  return mockRides.filter(ride => ride.userId === userId);
};

export const getStationById = (stationId: string): Station | undefined => {
  return mockStations.find(station => station.id === stationId);
};

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};