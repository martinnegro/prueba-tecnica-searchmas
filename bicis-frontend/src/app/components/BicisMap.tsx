'use client';
import { MapContainer, Popup, TileLayer, useMap, Marker } from 'react-leaflet';
import L, { LatLngBounds, latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function BicisMap() {
  const [bounds, _setBounds] = useState(latLngBounds([-34.5, -58.689658],[-34.712663, -58.359213]));
  const [stations, setStations] = useState([]); 

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data`)
      .then(response => response.json())
      .then(data => setStations(data))
      .catch(error => console.error('Error fetching stations:', error));
  }, []);



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
            {stations.map((station: any) => (
                <Marker key={station._id} position={[station.lat, station.lon]}
                  icon={StatusStationMarker({status: 'active'})}
                >
                    <Popup>
                        <div>
                            <h3>{station.name}</h3>
                            <p>{station.description}</p>
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
        iconUrl: 'bike-svgrepo-com.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}