import cron from 'node-cron';
import stationStatusModel from '@/models/stationStatus.model';

export function startStationStatusCron(apiUrl: string) {
  cron.schedule('* * * * *', async () => {
    console.log('[CRON] Fetching station status...');
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`Failed fetch: ${res.statusText}`);

        const data = await res.json();
        const stationsStatus = data.data.stations;
        if (!Array.isArray(stationsStatus)) throw new Error('Invalid data format');
        if (stationsStatus.length === 0) {
            console.log('[CRON] No station statuses to save');
            return;
        }
        await createStationStatusSnapshotsService(stationsStatus);
        console.log('[CRON] Station statuses saved successfully');
        console.log(`[CRON] ${stationsStatus.length} statuses saved`);
    } catch (err) {
        console.error('[CRON] Error:', err);
    }
  });
}

async function createStationStatusSnapshotsService(stations: { station_id: string }[]) {
  try {
    const docs = stations.map(station => ({
      ...station,
      station_ref: station.station_id,
      created_at: new Date(),
    }));

    const result = await stationStatusModel.insertMany(docs, { ordered: false });
    console.log(`Se insertaron ${result.length} documentos de status`);
  } catch (error) {
    console.error('Error al insertar estaciones:', error);
  }
}
