import { useEffect, useState } from "react";

/**
 * Custom hook that fetches station status data from the API every 60 seconds.
 * Returns the latest status array of all stations.
 */
export function useStationStatus() {
  const [stations, setStations] = useState<StationStatus[]>([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/data/stations-status`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStations(data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchStations(); // initial fetch

    const interval = setInterval(fetchStations, 60000); // fetch every 60 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return stations;
}
