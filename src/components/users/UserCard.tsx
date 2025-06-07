import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type rideHistory = {
  id: string;
  bicycleId: string;
  fromDock: string;
  fromStation: string;
  isActive: boolean;
  startTime?: Date | string | null;
  endTime?: Date | string | null;
  toDock?: string;
  toStation?: string;
};

interface UserCardProps {
  user: {
    id: string;
    name?: string;
    email: string;
    profilePicture?: string;
    status: 'active' | 'inactive' | 'suspended';
  };
  rides: rideHistory[];
}

export const UserCard: React.FC<UserCardProps> = ({ user, rides }) => {
  const [showRides, setShowRides] = useState(false);

  let statusColor = "bg-green-500";
  let statusText = "Active";

  if (user.status === "inactive") {
    statusColor = "bg-gray-500";
    statusText = "Inactive";
  } else if (user.status === "suspended") {
    statusColor = "bg-red-500";
    statusText = "Suspended";
  }

  const getThisMonthRides = (rides: rideHistory[]) => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    return rides.filter((ride) => {
      if (!ride.startTime) return false;
      const start = new Date(ride.startTime);
      return start.getMonth() === month && start.getFullYear() === year;
    });
  };

  const thisMonthRides = getThisMonthRides(rides);

  const formatTime = (value: any) => {
    try {
      const date =
        typeof value?.toDate === "function"
          ? value.toDate()
          : new Date(value);
      if (isNaN(date.getTime())) return "Invalid Time";
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    } catch (err) {
      return "Invalid Time";
    }
  };

  return (
    <div key={user.id} className="relative border-2 border-gray-500 rounded-lg p-4 mb-1 shadow">
      <div className="flex items-center space-x-4 mb-2">
        <img
          src={user.profilePicture || ""}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div className="mb-2">
          
          <div className="absolute top-6 right-4 flex items-center">
            <span className={`w-3 h-3 rounded-full ${statusColor} mr-2`}></span>
            <span className="text-xs font-medium text-gray-400">{statusText}</span>
          </div>
          
          <h2 className="text-lg text-gray-300 font-semibold">
            {user.name || ""}
          </h2>
         
          <a
            href={`mailto:${user.email}`}
            className="text-sm text-gray-400 hover:text-sky-300"
          >
            {user.email}
          </a>
          <p className="text-xs text-gray-400 mt-1">
            Updated: {new Date().toLocaleDateString("en-CA")}
          </p>
          
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="bg-purple-200 rounded-lg p-3">
          <p className="text-sm font-medium text-gray-500">Total Rides</p>
          <p className="text-xl font-semibold text-[#1c1c1c]">{rides.length}</p>
        </div>
        <div className="bg-gray-300 rounded-lg p-2">
          <p className="text-sm font-medium text-gray-500">This Month</p>
          <p className="text-xl font-semibold text-[#1c1c1c]">{thisMonthRides.length}</p>
        </div>
      </div>

      <div className="mt-3">
        <button
          onClick={() => setShowRides(!showRides)}
          className="w-full flex items-center justify-center py-2 text-sm font-medium text-[#1c1c1c] bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          {showRides ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Hide ride history
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              View ride history
            </>
          )}
        </button>
      </div>

      {showRides && (
        <div>
          {rides.length > 0 ? (
            rides.map((ride) => (
              <div
                key={ride.id}
                className="text-sm text-gray-300 mb-2 border border-gray-500 rounded-lg p-2 mt-3"
              >
                <p>
                  <b>Bicycle ID:</b> {ride.bicycleId}
                </p>
                <p>
                  <b>From:</b> {ride.fromStation} ( {ride.fromDock})
                </p>
                <p>
                  <b>To:</b> {ride.toStation} ( {ride.toDock})
                </p>
                <p>
                  <b>Start Time:</b> {formatTime(ride.startTime)}
                </p>
                <p>
                  <b>End Time:</b> {ride.endTime ? formatTime(ride.endTime) : "Ongoing"}
                </p>
                <p>
                  <b>Active:</b> {ride.isActive ? "Yes" : "No"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 ml-2">
              No ride history available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
