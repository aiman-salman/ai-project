import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export function useUsersStats() {
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalRides, setTotalRides] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const snapshot = await getDocs(collection(db, "Users"));

      let activeCount = 0;
      let rideCount = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const rideHistory = data.rideHistory || {};

        const isUserActive = Object.values(rideHistory).some((ride: any) => ride.isActive);

        if (isUserActive) {
          activeCount++;
        }

        Object.values(rideHistory).forEach((ride: any) => {
            if (ride.startTime) {
              rideCount++; 
            }
          });
        });

      setActiveUsers(activeCount);
      setTotalRides(rideCount);
    };

    fetchStats();
  }, []);

  return { activeUsers, totalRides };
}
