
interface Station {
  _id: string;
  station_id: string;
  name: string;
  physical_configuration: string;
  lat: number;
  lon: number;
  altitude: number | null;
  address: string;
  post_code: string | null;
  capacity: number;
  is_charging_station: boolean;
  rental_methods: string[];
  groups: string[];
  obcn: string;
  short_name: string;
  nearby_distance: number;
  _ride_code_support: boolean;
  rental_uris: Map<string, string>;
}

interface StationStatus {
  station_id: string; // Reference to Station
  num_bikes_available: number;
  num_bikes_available_types: {
    mechanical: number;
    ebike: number;
  };
  num_bikes_disabled: number;
  num_docks_available: number;
  num_docks_disabled: number;
  last_reported: number; // Epoch time
  is_charging_station?: boolean;
  status: string;
  is_installed?: boolean;
  is_renting?: boolean;
  is_returning?: boolean;
  traffic?: string | null;
  created_at?: Date; // Optional, defaults to now
  availability_bikes?: 'green' | 'yellow' | 'red' | 'not_known';
  availability_docks?: 'green' | 'yellow' | 'red' | 'not_known';
}