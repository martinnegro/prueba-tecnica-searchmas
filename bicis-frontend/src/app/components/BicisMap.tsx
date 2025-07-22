'use client';
import { MapContainer, Popup, TileLayer, useMap, Marker } from 'react-leaflet';
import L, { LatLngBounds, latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useStationsWithStatus } from '../hooks/useStationWithStatus';

export default function BicisMap({ selectedStatus }: PropsWithChildren<{  selectedStatus: 'bikes' | 'docks' }>) {
  const [bounds, _setBounds] = useState(latLngBounds([-34.53539058133557, -58.53793881079533],[-34.70058185121826, -58.3472558236615]));
  const stationsWithStatus = useStationsWithStatus();

  return (
    <MapContainer
            zoomControl={false}
            scrollWheelZoom={true}
            style={{ height: '100vh', width: '100vw' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stationsWithStatus.map((station: Station) => (
                <Marker key={station._id} position={[station.lat, station.lon]}
                  icon={StatusStationMarker({
                    status: selectedStatus === 'bikes' ? station.status.availability_bikes : station.status.availability_docks
                })}
                >
                    <Popup>
                        <div>
                            <h3>{station.name}</h3>
                            <p>Bicicletas disponibles: {station.status.num_bikes_available ?? 0}</p>
                            <p>Espacios disponibles: {station.status.num_docks_available ?? 0}</p>
                            <p>Ubicación: {station.address}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
            <MapFitter bounds={bounds} />
        </MapContainer> 
  );
}

const MapFitter: React.FC<PropsWithChildren<{bounds: LatLngBounds}>> = ({bounds})  => {
    const map = useMap()
    useEffect(() => {
        map.fitBounds(bounds)
    },[bounds])

    return (<></>)
}

const StatusStationMarker = ({status}: {status: string}) => {
    return L.icon({
        iconUrl: `circles-status/${status}-circle.svg`,
        iconSize: [25, 25]
    });
}