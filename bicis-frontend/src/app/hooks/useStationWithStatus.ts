import { useEffect, useState, useMemo } from "react";
import { useStationStatus } from "./useStationStatus"; // Hook que actualiza status cada minuto

export function useStationsWithStatus() {
  const [stations, setStations] = useState<any[]>([]);
  const stationsStatus = useStationStatus(); // Estado de cada estación (dinámico)

  // Fetch de estaciones base (una sola vez)
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data`)
      .then((response) => response.json())
      .then((data) => setStations(data))
      .catch((error) =>
        console.error("Error fetching stations base data:", error)
      );
  }, []);

  // Merge entre estaciones y su status
  const stationsWithStatus = useMemo(() => {
    const statusMap = new Map(
      stationsStatus.map((status) => [status.station_id, status])
    );

    return stations.map((station) => {
      const status = statusMap.get(station._id?.toString());
        // para determinar el status debe comparar capacity de station con num_bikes_available
        // num_bikes_available debe ser al menos el 30% de capacity para que sea "green"
        // si es menor al 30% de capacity, pero mayor a 0, es "yellow"
        // si es 0, es "red"
        if (status) {
          const { num_bikes_available } = status;
          const { capacity } = station;
          if (num_bikes_available >= capacity * 0.2) {
            status.status_string = "green";
          } else if (num_bikes_available > 0) {
            status.status_string = "yellow";
          } else {
            status.status_string = "red";
          }
        }
      return {
        ...station,
        status: status || { status_string: "not_known" },
        
      };
    });
  }, [stations, stationsStatus]);

  return stationsWithStatus;
}
