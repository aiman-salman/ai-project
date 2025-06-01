import React, { createContext, useEffect, useState, useContext } from 'react';
import { Station } from '../types' 
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface StationContextType {
    stations: Station[];
    loading: boolean;
    refreshStations: () => void;
}

const StationContext = createContext<StationContextType | undefined>(undefined); 
export const StationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, setLoading] = useState(true);
  
    const fetchStations = async () => {
      setLoading(true);
      const stationsRef = collection(db, 'stations');
      const q = query(stationsRef);
      const snapshot = await getDocs(q);
      const fetchedStations: Station[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Station[];
      setStations(fetchedStations);
      setLoading(false);
    };
  
    useEffect(() => {
      // Optional: real-time updates
      const unsubscribe = onSnapshot(collection(db, 'stations'), (snapshot) => {
        const updated = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Station[];
        setStations(updated);
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <StationContext.Provider value={{ stations, loading, refreshStations: fetchStations }}>
        {children}
      </StationContext.Provider>
    );
  };
  
  export const useStationContext = () => {
    const context = useContext(StationContext);
    if (!context) {
      throw new Error('useStationContext must be used within a StationProvider');
    }
    return context;
  };
