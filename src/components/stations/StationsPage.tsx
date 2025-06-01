import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useStationContext } from '../../context/StationContext';
import { Station } from '../../types';
import { StationCard } from './StationCard';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const StationsPage: React.FC = () => {
  const { stations = [], refreshStations } = useStationContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Station['status'] | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false)


  const [newStation, setNewStation] = useState<Partial<Station>>({
    name: '',
    address: '',
    status: 'active',
    availableBikes: 0,
    availableDocks: 0,
    totalDocks: 0,
    lastUpdated: new Date().toString(),
  })

  
  const filteredStations = stations.filter(station => {
    const matchesQuery = station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || station.status === statusFilter;
    return matchesQuery && matchesStatus;
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewStation(prev => ({
      ...prev,
      [name]: name === 'availableBikes' || name === 'availableDocks' || name === 'totalDocks'
       ? Number(value) : value
    }))
  }


  // NEW STATION
  const handleAddStation = async () => {
    if(!newStation.name || !newStation.address || newStation.totalDocks === 0) {
      toast.error('Please fill in all required fields and ensure total docks > 0.');
      return
    }

    const stationToAdd: Station = {
      id: '', 
      name: newStation.name,
      address: newStation.address,
      status: newStation.status || 'active',
      availableBikes: newStation.availableBikes || 0,
      totalDocks: newStation.totalDocks || 0,
      availableDocks:
        (newStation.totalDocks || 0) - (newStation.availableBikes || 0),
      lastUpdated: new Date().toISOString(),
    }

    try{
      const stationsRef = collection(db, 'stations')
      await addDoc(stationsRef, { ...stationToAdd });
      
      setIsModalOpen(false)
      setNewStation({
        name: '',
        address: '',
        status: 'active',
        availableBikes: 0,
        availableDocks: 0,
        totalDocks: 0,
        lastUpdated: new Date().toISOString(),
      })
      toast.success('Station added successfully!');
    } catch (err) {
      console.log('Error adding station: ', err)
      toast.error('Failed to add station. Please try again.');
    }
  }
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-semibold text-gray-300">Stations</h1>
        
        <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center px-4 py-2 bg-sky-300 text-[#1c1c1c] rounded-full font-medium hover:bg-sky-400 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Station
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
              placeholder="Search stations..."
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
                onChange={(e) => setStatusFilter(e.target.value as Station['status'] | 'all')}
                className="block w-full bg-[#1c1c1c] rounded-md border-0 py-2 pl-10 pr-8 text-gray-300 ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-cyan-200 sm:text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Station Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}
      </div>


      {/* Modal */}
      {
        isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1c1c1c]/80 rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >X
            </button>
            <h2 className="text-xl font-semibold text-cyan-200 mb-4">+ Add New Station</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <label htmlFor="name" className="block mb-1">Station Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={newStation.name || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-full bg-[#121212] p-2 text-gray-300"
                />
              </div>
              <div>
                <label htmlFor="address" className="block mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={newStation.address || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-full bg-[#121212] p-2 text-gray-300"
                />
              </div>
              <div>
                <label htmlFor="status" className="block mb-1">Status</label>
                <select
                  name="status"
                  id="status"
                  value={newStation.status || 'active'}
                  onChange={handleInputChange}
                  className="w-full rounded-full bg-[#121212] p-2 text-gray-300"
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label htmlFor="availableBikes" className="block mb-1">Available Bikes</label>
                <input
                  type="number"
                  name="availableBikes"
                  id="availableBikes"
                  value={newStation.availableBikes || 0}
                  onChange={handleInputChange}
                  min={0}
                  className="w-full rounded-full bg-[#121212] p-2 text-gray-300"
                />
              </div>
              <div>
                <label htmlFor="totalDocks" className="block mb-1">Total Docks</label>
                <input
                  type="number"
                  name="totalDocks"
                  id="totalDocks"
                  value={newStation.totalDocks || 0}
                  onChange={handleInputChange}
                  min={0}
                  className="w-full rounded-full bg-[#121212] p-2 text-gray-300"
                />
              </div>
            </div>
            <button
              onClick={handleAddStation}
              className="mt-6 w-full bg-cyan-200 text-[#1c1c1c] py-2 rounded-full font-medium hover:bg-cyan-300 transition-colors"
            >
              Add Station
            </button>
          </div>
        </div>
      )}

      
      {filteredStations.length === 0 && (
        <div className="text-center py-12 rounded-lg shadow">
          <p className="text-gray-500">No stations found matching your filters.</p>
          <button 
            onClick={() => {setSearchQuery(''); setStatusFilter('all');}}
            className="mt-2 text-cyan-500 hover:text-gray-500"
          >
            Reset filters
          </button>
        </div>
      )}

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};