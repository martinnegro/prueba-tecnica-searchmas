import getStationsService from "./getStationsFromDb.service";
import Papa from "papaparse";

export default async function exportCsvService() {
    try {
        const stations = await getStationsService();

        // Transform the stations data to ensure rental_uris is a string
        const stationsForCsv = stations.map(station => ({
            ...station,
            rental_uris: station.rental_uris ? JSON.stringify(station.rental_uris) : {}.toString(),
        }))

        const csvData = Papa.unparse(stationsForCsv);
        
        return csvData;
    } catch (error) {
        console.error('Error generating CSV:', error);
    }
}