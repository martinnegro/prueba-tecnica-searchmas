import { useEffect, useState } from "react";

export function useStationStatus() {
    const [stations, setStations] = useState<any[]>([]);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data/stations-status`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStations(data);
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        };

        fetchStations();
    }, []);

    return stations;
}