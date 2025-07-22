import { useEffect, useState, useMemo } from "react";
import { useStationStatus } from "./useStationStatus"; // Hook que actualiza status cada minuto

export function useStationsWithStatus() {
  const [stations, setStations] = useState<Station[]>([]);
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
          const { num_bikes_available, num_docks_available } = status;
          if (num_bikes_available >= 3) {
            status.availability_bikes = "green";
          } else if (num_bikes_available > 0) {
            status.availability_bikes = "yellow";
          } else {
            status.availability_bikes = "red";
          }

          if (num_docks_available >= 3) {
            status.availability_docks = "green";
          } else if (num_docks_available > 0) {
            status.availability_docks = "yellow";
          } else {
            status.availability_docks = "red";
          }
        }
      return {
        ...station,
        status: status || { availability_bikes: "not_known", availability_docks: "not_known" },

      };
    });
  }, [stations, stationsStatus]);

  return stationsWithStatus;
}
