import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";

export function RecentActivity() {
  const [users, setUsers] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "Users");
        const snapshot = await getDocs(usersRef);
        const usersData: any[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const rideHistory = data.rideHistory;

          if (rideHistory && typeof rideHistory === "object") {
            const rides = Object.values(rideHistory)
              .filter((ride: any) => ride.startTime)
              .map((ride: any) => ({
                ...ride,
                startTime: typeof ride.startTime === "object" && ride.startTime.toDate
                  ? ride.startTime.toDate().toISOString()
                  : ride.startTime,
                endTime: typeof ride.endTime === "object" && ride.endTime?.toDate
                  ? ride.endTime.toDate().toISOString()
                  : ride.endTime,
              }));

            if (rides.length > 0) {
              const latestRide = rides.sort(
                (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
              )[0];

              usersData.push({
                id: doc.id,
                name: data.name || "Unnamed",
                profilePicture: data.profilePicture || "/default-user.jpg",
                latestRide,
                lastUpdated: latestRide.startTime,
              });
            }
          }
        });

        usersData.sort(
          (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatDuration = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const minutes = Math.round((endTime - startTime) / 60000);
    return isNaN(minutes) ? "Unknown" : `${minutes} min`;
  };

  const visibleUsers = showAll ? users : users.slice(0, 5);

  return (
    <div className="overflow-hidden rounded-md m-2">
      <ul className="divide-y divide-gray-500">
        {visibleUsers.map((user) => (
          <li key={user.id} className="py-3">
            <div className="flex items-start space-x-4">
              <img
                src={user.profilePicture}
                alt="User"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-300 truncate">
                  {user.name}
                </p>
                <div className="flex items-center mt-1 text-sm text-gray-400">
                  <MapPin className="mr-1 h-4 w-4" />
                  <p className="truncate">
                    {user.latestRide?.fromStation || "Unknown"} → {user.latestRide?.toStation || "Unknown"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end text-sm text-gray-400">
                <div className="flex items-center whitespace-nowrap">
                  <Clock className="mr-1 h-4 w-4" />
                  {user.latestRide?.startTime && user.latestRide?.endTime
                    ? formatDuration(user.latestRide.startTime, user.latestRide.endTime)
                    : "Ongoing"}
                </div>
                <span className="mt-1">
                  {user.latestRide?.startTime ? formatDate(user.latestRide.startTime) : ""}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-center">
        <button
          className="text-sm font-medium text-sky-300"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less activity" : "View all activity"}
        </button>
      </div>
    </div>
  );
}

