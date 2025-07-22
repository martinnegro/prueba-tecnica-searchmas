import stationModel from '@/models/station.model';
require('dotenv').config();

export default async function updateStationsDataFromApiService() {
  try {
    const response = await fetch(process.env.API_URL! + process.env.STATIONS_INFO_PATH! + '?' + new URLSearchParams({
      client_id: process.env.CLIENT_ID!,
      client_secret: process.env.CLIENT_SECRET!,
    }),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

    if (!response.ok) {
      throw new Error('Error fetching external data');
    }
    
    const data = await response.json();

    const stations = data.data.stations;    
    if (!stations || !Array.isArray(stations)) {
      throw new Error('Invalid data format received from external API');
    }
    await updateStationsDataService(stations);
    console.log('Estaciones actualizadas correctamente');    

  } catch (error) {
    console.error('Error en updateStationsDataFromApiService:', error);
    
  }
}

async function updateStationsDataService(stations: {station_id: string}[]) {
  try {
    const bulkOps = stations.map(station => ({
        updateOne: {
        filter: { _id: station.station_id },  // criterio para encontrar estación
        update: { $set: station },                  // campos para insertar/actualizar
        upsert: true                                // si no existe, lo crea
        }
     }));
     const result = await stationModel.bulkWrite(bulkOps);
  } catch (error) {
    console.error('Error al actualizar las estaciones:', error);
  }
}